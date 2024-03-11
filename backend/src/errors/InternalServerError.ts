class InternalServerErrorError extends Error {
    statusCode: number;
    constructor(message: string) {
      super(message);
      this.name = 'InternalServerErrorError';
      this.statusCode = 409;
    }
}
  
export default InternalServerErrorError;
  