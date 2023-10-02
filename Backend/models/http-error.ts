interface HTTPError {
  code: number;
}

class HTTPError extends Error {
  constructor(message: string, errorCode: number) {
    super(message); // Add a message property
    this.code = errorCode; // Add code property
  }
}

export default HTTPError;
