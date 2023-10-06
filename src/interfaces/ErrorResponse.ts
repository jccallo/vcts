export interface ErrorResponse<T = any> {
  error: T;
  code: number;
}

export interface ValidationError {
  [key: string]: string[]
}



