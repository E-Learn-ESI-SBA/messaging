

export class Response<T>  {
  private data: T;
  private status: number;
  private message: string;
  constructor(data: T, status: number, message: string) {
    this.data = data;
    this.status = status;
    this.message = message;
  }
  public toJSON() {
    return {
      data: this.data,
      status: this.status,
      message: this.message,
    };
  }
}
