declare namespace Express {
  export interface Request {
    auth?: {
      _id: string;
      username: string;
      iat: number;
      exp: number;
    }
  }
}
