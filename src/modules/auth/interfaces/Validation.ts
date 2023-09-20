export interface ValidationResponse {
  error: ValidationError | string;
  code: number;
}

export interface ValidationError {
  [key: string]: string[]
}

