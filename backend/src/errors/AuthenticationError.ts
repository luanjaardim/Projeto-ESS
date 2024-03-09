class AuthenticationError extends Error {
    statusCode: number;
    constructor(message: string) {
      super(message);
      this.name = 'AuthenticationError';
      this.statusCode = 409;
    }
}
  
export default AuthenticationError;
  