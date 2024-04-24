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

export type InformationSchemaColumns = {
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

export type ColumnInformation = {
  column_name: string;
  column_default: string | null;
  is_nullable: "YES" | "NO";
  constraint_type: string | null;
  is_identity: "YES" | "NO";
  identity_generation: string | null;
  typname: string;
  typcategory:
    | "A" // Array
    | "B" // Boolean
    | "C" // Composite
    | "D" // Date/Time
    | "E" // Enum
    | "G" // Geometric
    | "I" // Network Address
    | "N" // Numeric
    | "P" // Pseudo
    | "R" // Range
    | "S" // String
    | "T" // Timespan
    | "U" // User-defined
    | "V" // Bit String
    | "X" // Unknown
    | "Z";
};
