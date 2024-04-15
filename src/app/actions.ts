"use server";

import { ColumnInformation, TableInformation } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Pool, QueryResult, QueryResultRow } from "pg";

const connectionString = process.env.DATABASE_URL;

export async function query<T extends QueryResultRow>(
  query: string,
  values?: any[],
) {
  const pool = new Pool({
    connectionString,
  });

  const res = await pool.query<T>(query, values);
  await pool.end();
  return res;
}

export async function connectToDB() {
  try {
    const params = "SELECT NOW()";
    await query(params);
  } catch (e) {
    return {
      error:
        "Failed to connect to the database. Please check the connection string.",
    };
  }
  redirect("/collection");
}

export async function getTableInformation() {
  try {
    const res = await query<TableInformation>(
      "SELECT * FROM information_schema.tables WHERE table_schema='public';",
    );
    return res.rows;
  } catch (e) {
    return {
      error: "Failed to get table information.",
    };
  }
}

export async function getColumnInformation(tableName: string | undefined) {
  try {
    const res = await query<ColumnInformation>(
      `
      SELECT 
          col.column_name,
          col.column_default,
          col.is_nullable,
          cons.constraint_type,
          typ.typname,
          typ.typcategory
      FROM 
          information_schema.columns AS col
      LEFT JOIN 
          information_schema.key_column_usage AS kcu ON col.table_name = kcu.table_name AND col.column_name = kcu.column_name
      LEFT JOIN 
          pg_catalog.pg_type AS typ ON col.udt_name = typ.typname
      LEFT JOIN 
          information_schema.table_constraints AS cons ON kcu.constraint_name = cons.constraint_name
      WHERE 
          col.table_name = $1;
      `,
      [tableName],
    );

    return res.rows;
  } catch (e) {
    return null;
  }
}

export async function getTableDetail(tableName?: string | null) {
  try {
    const pool = new Pool({
      connectionString,
    });

    const res = await pool.query<Record<string, string>>(
      `SELECT * FROM "${tableName}";`,
    );
    await pool.end();
    const { fields, rows } = res;

    return {
      fields: fields.map((f) => ({ ...f })),
      rows,
    };
  } catch (e) {
    return null;
  }
}

export async function addRow(tableName: string, data: Record<string, any>) {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const q = `
      INSERT INTO "${tableName}" (${keys.join(", ")})
      VALUES (${keys.map((_, i) => `$${i + 1}`).join(", ")})
    `;

    await query(q, values);
  } catch (e) {
    console.log(e);
    return null;
  }
  revalidatePath("/collection");
}

export async function updateRow(params: {
  tableName: string;
  where: Record<string, any>;
  data: Record<string, any>;
}) {
  const { tableName, where, data } = params;
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const whereKeys = Object.keys(where);
    const whereValues = Object.values(where);

    const q = `
      UPDATE "${tableName}"
      SET ${keys.map((k, i) => `${k} = $${i + 1}`).join(", ")}
      WHERE ${whereKeys.map((k, i) => `${k} = $${i + keys.length + 1}`).join(" AND ")}
    `;
    const v = [...values, ...whereValues];
    await query(q, v);
  } catch (e) {
    console.log(e);
    return null;
  }
  revalidatePath("/collection");
}
