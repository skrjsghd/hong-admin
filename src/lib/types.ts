export type TableInformation = {
  table_catalog: string;
  table_schema: string;
  table_name: string;
  table_type: string;
  self_referencing_column_name: string;
  reference_generation: string;
  user_defined_type_catalog: string;
  user_defined_type_schema: string;
  user_defined_type_name: string;
  is_insertable_into: "YES" | "NO";
  is_typed: "YES" | "NO";
  commit_action: string;
};

export type ColumnInformation = {
  table_catalog: string;
  table_schema: string;
  table_name: string;
  column_name: string;
  ordinal_position: number;
  column_default: string | null;
  is_nullable: "YES" | "NO";
  data_type: string; //type list
  character_maximum_length: number | null;
  character_octet_length: number | null;
  numeric_precision: number | null;
  numeric_precision_radix: number | null;
  numeric_scale: number | null;
  datetime_precision: string | null;
  interval_type: string | null;
  interval_precision: string | null;
  character_set_catalog: string | null;
  character_set_schema: string | null;
  character_set_name: string | null;
  collation_catalog: string | null;
  collation_schema: string | null;
  collation_name: string | null;
  domain_catalog: string | null;
  domain_schema: string | null;
  domain_name: string | null;
  udt_catalog: string;
  udt_schema: string;
  udt_name: string;
  scope_catalog: null;
  scope_schema: null;
  scope_name: null;
  maximum_cardinality: string | null;
  dtd_identifier: string;
  is_self_referencing: "YES" | "NO";
  is_identity: "YES" | "NO";
  identity_generation: string | null;
  identity_start: string | null;
  identity_increment: string | null;
  identity_maximum: string | null;
  identity_minimum: string | null;
  identity_cycle: "YES" | "NO";
  is_generated: string;
  generation_expression: string | null;
  is_updatable: "YES" | "NO";
};

// {
//   "BOOL": 16,
//   "BYTEA": 17,
//   "CHAR": 18,
//   "INT8": 20,
//   "INT2": 21,
//   "INT4": 23,
//   "REGPROC": 24,
//   "TEXT": 25,
//   "OID": 26,
//   "TID": 27,
//   "XID": 28,
//   "CID": 29,
//   "JSON": 114,
//   "XML": 142,
//   "PG_NODE_TREE": 194,
//   "SMGR": 210,
//   "PATH": 602,
//   "POLYGON": 604,
//   "CIDR": 650,
//   "FLOAT4": 700,
//   "FLOAT8": 701,
//   "ABSTIME": 702,
//   "RELTIME": 703,
//   "TINTERVAL": 704,
//   "CIRCLE": 718,
//   "MACADDR8": 774,
//   "MONEY": 790,
//   "MACADDR": 829,
//   "INET": 869,
//   "ACLITEM": 1033,
//   "BPCHAR": 1042,
//   "VARCHAR": 1043,
//   "DATE": 1082,
//   "TIME": 1083,
//   "TIMESTAMP": 1114,
//   "TIMESTAMPTZ": 1184,
//   "INTERVAL": 1186,
//   "TIMETZ": 1266,
//   "BIT": 1560,
//   "VARBIT": 1562,
//   "NUMERIC": 1700,
//   "REFCURSOR": 1790,
//   "REGPROCEDURE": 2202,
//   "REGOPER": 2203,
//   "REGOPERATOR": 2204,
//   "REGCLASS": 2205,
//   "REGTYPE": 2206,
//   "UUID": 2950,
//   "TXID_SNAPSHOT": 2970,
//   "PG_LSN": 3220,
//   "PG_NDISTINCT": 3361,
//   "PG_DEPENDENCIES": 3402,
//   "TSVECTOR": 3614,
//   "TSQUERY": 3615,
//   "GTSVECTOR": 3642,
//   "REGCONFIG": 3734,
//   "REGDICTIONARY": 3769,
//   "JSONB": 3802,
//   "REGNAMESPACE": 4089,
//   "REGROLE": 4096
// }
