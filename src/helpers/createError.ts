import { CustomError } from './CustomError'

export function createError(
  message: string,
  statusCode: number = 500,
): CustomError {
  return new CustomError(message, statusCode)
}
