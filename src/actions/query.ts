"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ColumnInformation, TableInformation } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Pool, QueryResultRow } from "pg";

// const connectionString = process.env.DATABASE_URI;

type QueryResult<T> = {
  success: boolean;
  value: T;
};

// export async function query<T extends QueryResultRow>(
//   query: string,
//   values?: any[],
// ) {
//   const pool = new Pool({
//     connectionString,
//   });

//   const res = await pool.query<T>(query, values);
//   await pool.end();
//   return res;
// }

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

export async function getAllTables(): Promise<QueryResult<TableInformation[]>> {
  try {
    const session = await auth();
    const q =
      "SELECT * FROM information_schema.tables WHERE table_schema='public';";
    const pool = new Pool({
      connectionString: session?.user?.connectionString || "",
    });
    const res = await pool.query<TableInformation>(q);
    await pool.end();
    return {
      success: true,
      value: res.rows,
    };
  } catch (e) {
    return {
      success: false,
      value: [],
    };
  }
}

// export async function getColumnInformation(tableName: string | undefined) {
//   try {
//     const res = await query<ColumnInformation>(
//       `
//       SELECT
//           col.column_name,
//           col.column_default,
//           col.is_nullable,
//           col.is_identity,
//           col.identity_generation,
//           cons.constraint_type,
//           typ.typname,
//           typ.typcategory
//       FROM
//           information_schema.columns AS col
//       LEFT JOIN
//           information_schema.key_column_usage AS kcu ON col.table_name = kcu.table_name AND col.column_name = kcu.column_name
//       LEFT JOIN
//           pg_catalog.pg_type AS typ ON col.udt_name = typ.typname
//       LEFT JOIN
//           information_schema.table_constraints AS cons ON kcu.constraint_name = cons.constraint_name
//       WHERE
//           col.table_name = $1;
//       `,
//       [tableName],
//     );

//     return res.rows;
//   } catch (e) {
//     return null;
//   }
// }

// export async function getTableRows(tableName?: string | null) {
//   try {
//     const pool = new Pool({
//       connectionString,
//     });

//     const res = await pool.query<Record<string, string>>(
//       `SELECT * FROM "${tableName}";`,
//     );
//     await pool.end();
//     const { fields, rows } = res;

//     return {
//       fields: fields.map((f) => ({ ...f })),
//       rows,
//     };
//   } catch (e) {
//     return null;
//   }
// }

// export async function addRow(tableName: string, data: Record<string, any>) {
//   try {
//     const keys = Object.keys(data);
//     const values = Object.values(data);

//     const q = `
//       INSERT INTO "${tableName}" (${keys.map((v) => `"${v}"`).join(", ")})
//       VALUES (${keys.map((_, i) => `$${i + 1}`).join(", ")})
//     `;

//     await query(q, values);
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
//   revalidatePath("/collection");
// }

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

// export async function deleteRow(params: {
//   tableName: string;
//   where: Record<string, any>;
// }) {
//   const { tableName, where } = params;
//   try {
//     const whereKeys = Object.keys(where);
//     const whereValues = Object.values(where);

//     const q = `
//       DELETE FROM "${tableName}"
//       WHERE ${whereKeys.map((k, i) => `${k} = $${i + 1}`).join(" AND ")}
//     `;
//     await query(q, whereValues);
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
//   revalidatePath("/collection");
// }
