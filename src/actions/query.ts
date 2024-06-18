"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ColumnInformation, TableInformation } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { FieldDef, Pool } from "pg";
import { getUserSetting } from "./auth";

type QueryResult<T> = {
  success: boolean;
  value: T;
};

async function createPool() {
  const userSetting = await getUserSetting();
  const pool = new Pool({
    connectionString: userSetting?.connectionUri || "",
  });
  return pool;
}

export async function connectWithURI(uri: string) {
  try {
    const session = await auth();
    const pool = new Pool({
      connectionString: uri,
    });
    const params = "SELECT NOW()";
    await pool.query(params);
    await pool.end();
    await prisma.setting.upsert({
      create: {
        connectionUri: uri,
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
      },
      update: {
        connectionUri: uri,
      },
      where: {
        userId: session?.user?.id,
      },
    });
    revalidatePath("/setting");
    return {
      success: true,
      value: "Successfully connected to the database.",
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      value:
        "Failed to connect to the database. Please check the connection string.",
    };
  }
}

export async function getAllTables() {
  try {
    const q =
      "SELECT * FROM information_schema.tables WHERE table_schema='public';";
    const pool = await createPool();
    const res = await pool.query<TableInformation>(q);
    await pool.end();
    return res.rows;
  } catch (e) {
    return null;
  }
}

export async function getTableColumnInformation(tableName: string) {
  try {
    const q = `
      SELECT
          col.column_name,
          col.column_default,
          col.is_nullable,
          col.is_identity,
          col.identity_generation,
          cons.constraint_type,
          typ.typname,
          typ.typcategory
      FROM
          information_schema.columns AS col
      LEFT JOIN
          pg_type AS typ ON col.udt_name = typ.typname
      LEFT JOIN
          information_schema.key_column_usage AS kcu ON col.table_name = kcu.table_name AND col.column_name = kcu.column_name
      LEFT JOIN
          information_schema.table_constraints AS cons ON kcu.constraint_name = cons.constraint_name
      WHERE
          col.table_name = $1
      ORDER BY
          col.ordinal_position;
      `;
    const pool = await createPool();
    const result = await pool.query<ColumnInformation>(q, [tableName]);
    await pool.end();
    return result.rows;
  } catch (e) {
    throw new Error("Failed to get column information.");
  }
}

export type GetTableDataReturn = {
  fields: Array<FieldDef>;
  rows: Record<string, string>[];
};
export async function getTableData(
  tableName: string,
): Promise<GetTableDataReturn> {
  try {
    const q = `SELECT * FROM "${tableName}";`;
    const pool = await createPool();
    const result = await pool.query<Record<string, string>>(q);
    await pool.end();

    return {
      fields: result.fields.map((f) => ({ ...f })),
      rows: result.rows,
    };
  } catch (e) {
    throw new Error("Failed to get table data.");
  }
}

export async function addRow(
  tableName: TableInformation["table_name"],
  data: Record<string, any>,
): Promise<QueryResult<string>> {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const q = `
      INSERT INTO "${tableName}" (${keys.map((v) => `"${v}"`).join(", ")})
      VALUES (${keys.map((_, i) => `$${i + 1}`).join(", ")})
    `;
    const pool = await createPool();
    await pool.query(q, values);
    await pool.end();
    revalidatePath(`/table/${tableName}`);
    return {
      success: true,
      value: "Row added successfully.",
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      value: "Failed to add row.",
    };
  }
}

export async function deleteRow(
  tableName: TableInformation["table_name"],
  values: Record<string, any>[],
) {
  try {
    const pool = await createPool();

    values.forEach(async (v) => {
      const keys = Object.keys(v);
      const value = Object.values(v);
      const q = `
        DELETE FROM "${tableName}"
        WHERE ${keys.map((k, i) => `"${k}" = $${i + 1}`).join(" AND ")}
      `;
      await pool.query(q, value);
    });
    await pool.end();
    revalidatePath(`/table/${tableName}`);
  } catch (e) {
    throw new Error("Failed to delete row.");
  }
}

// export async function updateRow(params: {
//   tableName: string;
//   where: Record<string, any>;
//   data: Record<string, any>;
// }) {
//   const { tableName, where, data } = params;
//   try {
//     const keys = Object.keys(data);
//     const values = Object.values(data);
//     const whereKeys = Object.keys(where);
//     const whereValues = Object.values(where);

//     const q = `
//       UPDATE "${tableName}"
//       SET ${keys.map((k, i) => `"${k}" = $${i + 1}`).join(", ")}
//       WHERE ${whereKeys.map((k, i) => `"${k}" = $${i + keys.length + 1}`).join(" AND ")}
//     `;
//     const v = [...values, ...whereValues];
//     await query(q, v);
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
//   revalidatePath("/collection");
// }
