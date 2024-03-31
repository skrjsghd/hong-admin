import { Pool } from "pg";

export const db = new Pool({
  host: "localhost",
  port: 5432,
  database: "hong_admin",
  user: "hong",
  password: "1234",
});
