"use server";

import { ColumnInformation, TableInformation } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Pool, QueryResult } from "pg";

const connectionString = process.env.DATABASE_URL;

export async function connectToDB() {
  try {
    const pool = new Pool({
      connectionString,
    });

    await pool.query("SELECT NOW()");
    await pool.end();
  } catch (e) {
    return {
      error:
        "Failed to connect to the database. Please check the connection string.",
    };
  }
  redirect("/collection");
}

export async function executeQuery(query: string) {
  try {
    const pool = new Pool({
      connectionString,
    });

    const res = await pool.query(query);
    await pool.end();
    return JSON.parse(JSON.stringify(res));
  } catch (e) {
    return {
      error: "Failed to execute the query. Please check the query syntax.",
    };
  }
}

export async function getTableInformation() {
  const pool = new Pool({
    connectionString,
  });

  const res = await pool.query<TableInformation>(
    "SELECT * FROM information_schema.tables WHERE table_schema='public';",
  );
  await pool.end();

  return res.rows;
}

export async function getColumnInformation(tableName: string | undefined) {
  try {
    const pool = new Pool({
      connectionString,
    });
    const res = await pool.query<ColumnInformation>(
      "SELECT * FROM information_schema.columns WHERE table_name = $1;",
      [tableName],
    );
    await pool.end();

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

export async function updateRow(
  tableName: string,
  data: {
    prev: Record<string, string>;
    current: Record<string, string>;
  },
) {
  try {
    const pool = new Pool({
      connectionString,
    });
    const keys = Object.keys(data.current);
    const values = Object.values(data.current);
    const prevKeys = Object.keys(data.prev);
    const prevValues = Object.values(data.prev);

    const query = `
      UPDATE "${tableName}"
      SET ${keys.map((k, i) => `${k} = $${i + 1}`).join(", ")}
      WHERE ${prevKeys.map((k, i) => `${k} = $${i + keys.length + 1}`).join(" AND ")}
    `;

    await pool.query(query, [...values, ...prevValues]);
    await pool.end();

    revalidatePath("/collection");

    return "success";
  } catch (e) {
    return null;
  }
}
