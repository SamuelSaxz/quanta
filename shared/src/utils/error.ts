import type { ContentfulStatusCode } from "hono/utils/http-status";

export type RequestError = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type ErrorCode =
  // Auth
  | "ACCOUNT_DISABLED"
  | "FORBIDDEN"
  | "INVALID_TOKEN"
  | "SESSION_EXPIRED"
  | "UNAUTHORIZED"
  // Resource
  | "NOT_FOUND"
  | "RESOURCE_EXISTS"
  | "RESOURCE_LOCKED"
  | "RESOURCE_DELETED"
  // Validation
  | "CONFLICT_CREDENTIALS"
  | "DATA_INTEGRITY_ERROR"
  | "INVALID_FORMAT"
  | "MISSING_FIELDS"
  | "VALIDATION_ERROR"
  // Request / Network
  | "BAD_REQUEST"
  | "PAYLOAD_TOO_LARGE"
  | "TIMEOUT"
  | "TOO_MANY_REQUESTS"
  // Server
  | "DATABASE_ERROR"
  | "INTERNAL_SERVER_ERROR"
  | "SERVICE_UNAVAILABLE"
  | "TRANSACTION_FAILED"
  // Misc
  | "DEPENDENCY_ERROR"
  | "FEATURE_DISABLED"
  | "UNKNOWN_ERROR";

export const ErrorStatusMap: Record<ErrorCode, ContentfulStatusCode> = {
  // Auth
  ACCOUNT_DISABLED: 403,
  FORBIDDEN: 403,
  INVALID_TOKEN: 401,
  SESSION_EXPIRED: 401,
  UNAUTHORIZED: 401,
  // Resource
  NOT_FOUND: 404,
  RESOURCE_EXISTS: 409,
  RESOURCE_LOCKED: 423,
  RESOURCE_DELETED: 410,
  // Validation
  CONFLICT_CREDENTIALS: 409,
  DATA_INTEGRITY_ERROR: 409,
  INVALID_FORMAT: 422,
  MISSING_FIELDS: 400,
  VALIDATION_ERROR: 422,
  // Request / Network
  BAD_REQUEST: 400,
  PAYLOAD_TOO_LARGE: 413,
  TIMEOUT: 408,
  TOO_MANY_REQUESTS: 429,
  // Server
  DATABASE_ERROR: 500,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  TRANSACTION_FAILED: 500,
  // Misc
  DEPENDENCY_ERROR: 502,
  FEATURE_DISABLED: 501,
  UNKNOWN_ERROR: 500,
};

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public status: number = ErrorStatusMap[code]
  ) {
    super(message);
    this.name = "AppError";
  }
}

const CodeErrorDatabase: Record<string, string> = {
  "23000": "integrity_constraint_violation",
  "23001": "restricted_function",
  "23502": "not_null_violation",
  "23503": "foreign_key_violation",
  "23505": "unique_violation",
  "23514": "check_violation",
  "23P01": "exclusion_violation",
};

export type ErrorCodeDatabase =
  // Class 23 — Integrity Constraint Violation
  | "23000"
  | "23001"
  | "23502"
  | "23503"
  | "23505"
  | "23514"
  | "23P01"
  // Class 40 — Transaction Rollback
  | "40000"
  | "40001"
  | "40002"
  | "40003"
  | "40P01"
  // Class 42 — Syntax / Access Rule Violation
  | "42000"
  | "42601"
  | "42501"
  | "42846"
  | "42803"
  | "42830"
  | "42602"
  | "42622"
  | "42939"
  | "42P01"
  | "42P02"
  | "42P03"
  | "42P04"
  | "42P05"
  | "42P06"
  | "42P07"
  | "42P08"
  | "42P09"
  | "42P10"
  | "42P11"
  | "42P12"
  | "42P13"
  | "42P14"
  | "42P15"
  | "42P16"
  | "42P17"
  | "42P18"
  | "42P19"
  | "42P20"
  | "42P21"
  | "42P22"
  // Class 53 — Insufficient Resources
  | "53000"
  | "53100"
  | "53200"
  | "53300"
  | "53400"
  // Class 57 — Operator Intervention
  | "57000"
  | "57014"
  | "57P01"
  | "57P02"
  | "57P03"
  | "57P04"
  // Class 58 — System Error
  | "58000"
  | "58030"
  | "58P01"
  | "58P02"
  // Class F0 — Configuration File Error
  | "F0000"
  | "F0001"
  // Class HV — Foreign Data Wrapper Error
  | "HV000"
  | "HV001"
  | "HV002"
  | "HV004"
  | "HV005"
  | "HV006"
  | "HV007"
  | "HV008"
  | "HV009"
  | "HV00A"
  | "HV00B"
  | "HV00C"
  | "HV00D"
  | "HV00J"
  | "HV00K"
  | "HV00L"
  | "HV00M"
  | "HV00N"
  | "HV00P"
  | "HV00Q"
  | "HV00R"
  | "HV010"
  | "HV014"
  | "HV021"
  // Class P0 — PL/pgSQL Error
  | "P0000"
  | "P0001"
  | "P0002"
  | "P0003"
  | "P0004"
  // Class XX — Internal Error
  | "XX000"
  | "XX001"
  | "XX002";

export const ErrorCodeDatabaseMap: Record<ErrorCodeDatabase, string> = {
  // Class 23 — Integrity Constraint Violation
  "23000": "INTEGRITY_CONSTRAINT_VIOLATION",
  "23001": "RESTRICT_VIOLATION",
  "23502": "NOT_NULL_VIOLATION",
  "23503": "FOREIGN_KEY_VIOLATION",
  "23505": "UNIQUE_VIOLATION",
  "23514": "CHECK_VIOLATION",
  "23P01": "EXCLUSION_VIOLATION",

  // Class 40 — Transaction Rollback
  "40000": "TRANSACTION_ROLLBACK",
  "40001": "SERIALIZATION_FAILURE",
  "40002": "TRANSACTION_INTEGRITY_CONSTRAINT_VIOLATION",
  "40003": "STATEMENT_COMPLETION_UNKNOWN",
  "40P01": "DEADLOCK_DETECTED",

  // Class 42 — Syntax / Access Rule Violation
  "42000": "SYNTAX_ERROR_OR_ACCESS_RULE_VIOLATION",
  "42601": "SYNTAX_ERROR",
  "42501": "INSUFFICIENT_PRIVILEGE",
  "42846": "CANNOT_COERCE",
  "42803": "GROUPING_ERROR",
  "42830": "INVALID_FOREIGN_KEY",
  "42602": "INVALID_NAME",
  "42622": "NAME_TOO_LONG",
  "42939": "RESERVED_NAME",
  "42P01": "UNDEFINED_TABLE",
  "42P02": "UNDEFINED_PARAMETER",
  "42P03": "DUPLICATE_CURSOR",
  "42P04": "DUPLICATE_DATABASE",
  "42P05": "DUPLICATE_PREPARED_STATEMENT",
  "42P06": "DUPLICATE_SCHEMA",
  "42P07": "DUPLICATE_TABLE",
  "42P08": "AMBIGUOUS_COLUMN",
  "42P09": "AMBIGUOUS_FUNCTION",
  "42P10": "AMBIGUOUS_PARAMETER",
  "42P11": "INVALID_COLUMN_REFERENCE",
  "42P12": "INVALID_DATABASE_DEFINITION",
  "42P13": "INVALID_FUNCTION_DEFINITION",
  "42P14": "INVALID_PSTATEMENT_DEFINITION",
  "42P15": "INVALID_SCHEMA_DEFINITION",
  "42P16": "INVALID_TABLE_DEFINITION",
  "42P17": "INVALID_OBJECT_DEFINITION",
  "42P18": "INDETERMINATE_DATATYPE",
  "42P19": "INVALID_RECURSION",
  "42P20": "WINDOWING_ERROR",
  "42P21": "COLLATION_MISMATCH",
  "42P22": "INDETERMINATE_COLLATION",

  // Class 53 — Insufficient Resources
  "53000": "INSUFFICIENT_RESOURCES",
  "53100": "DISK_FULL",
  "53200": "OUT_OF_MEMORY",
  "53300": "TOO_MANY_CONNECTIONS",
  "53400": "CONFIGURATION_LIMIT_EXCEEDED",

  // Class 57 — Operator Intervention
  "57000": "OPERATOR_INTERVENTION",
  "57014": "QUERY_CANCELED",
  "57P01": "ADMIN_SHUTDOWN",
  "57P02": "CRASH_SHUTDOWN",
  "57P03": "CANNOT_CONNECT_NOW",
  "57P04": "DATABASE_DROPPED",

  // Class 58 — System Error
  "58000": "SYSTEM_ERROR",
  "58030": "IO_ERROR",
  "58P01": "UNDEFINED_FILE",
  "58P02": "DUPLICATE_FILE",

  // Class F0 — Configuration File Error
  F0000: "CONFIG_FILE_ERROR",
  F0001: "LOCK_FILE_EXISTS",

  // Class HV — Foreign Data Wrapper Error
  HV000: "FDW_ERROR",
  HV001: "FDW_OUT_OF_MEMORY",
  HV002: "FDW_DYNAMIC_PARAMETER_VALUE_NEEDED",
  HV004: "FDW_INVALID_DATA_TYPE",
  HV005: "FDW_COLUMN_NAME_NOT_FOUND",
  HV006: "FDW_INVALID_DATA_TYPE_DESCRIPTORS",
  HV007: "FDW_INVALID_COLUMN_NAME",
  HV008: "FDW_INVALID_COLUMN_NUMBER",
  HV009: "FDW_INVALID_USE_OF_NULL_POINTER",
  HV00A: "FDW_INVALID_STRING_FORMAT",
  HV00B: "FDW_INVALID_HANDLE",
  HV00C: "FDW_INVALID_OPTION_INDEX",
  HV00D: "FDW_INVALID_OPTION_NAME",
  HV00J: "FDW_OPTION_NAME_NOT_FOUND",
  HV00K: "FDW_REPLY_HANDLE",
  HV00L: "FDW_UNABLE_TO_CREATE_EXECUTION",
  HV00M: "FDW_UNABLE_TO_CREATE_REPLY",
  HV00N: "FDW_UNABLE_TO_ESTABLISH_CONNECTION",
  HV00P: "FDW_NO_SCHEMAS",
  HV00Q: "FDW_SCHEMA_NOT_FOUND",
  HV00R: "FDW_TABLE_NOT_FOUND",
  HV010: "FDW_FUNCTION_SEQUENCE_ERROR",
  HV014: "FDW_TOO_MANY_HANDLES",
  HV021: "FDW_INCONSISTENT_DESCRIPTOR_INFORMATION",

  // Class P0 — PL/pgSQL Error
  P0000: "PLPGSQL_ERROR",
  P0001: "RAISE_EXCEPTION",
  P0002: "NO_DATA_FOUND",
  P0003: "TOO_MANY_ROWS",
  P0004: "ASSERT_FAILURE",

  // Class XX — Internal Error
  XX000: "INTERNAL_ERROR",
  XX001: "DATA_CORRUPTED",
  XX002: "INDEX_CORRUPTED",
};
