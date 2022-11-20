import { Request } from 'express';

export type JwtPayload = { sub: string };

export interface CustomRequest extends Request {
  headers: Record<string, string | string[]>;
  user?: JwtPayload;
}
