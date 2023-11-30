import { AxiosError } from "axios";

export interface ErrorResponse<T = any> {
  error: T;
  code: number;
}

export interface ValidationError {
  [key: string]: string[]
}

export interface Error {
  message: string
  validations?: ValidationError
  code?: number;
  original?: AxiosError
}



