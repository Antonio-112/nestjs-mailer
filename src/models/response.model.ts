export class ApiResponse<T = object> {
  statusCode: number;
  message: string;
  data?: T;
}
