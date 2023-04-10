import jwt = require('jsonwebtoken');
import 'dotenv/config';

const secret = process.env.JWT_SECRET || "secret"

export class JwtService {
  static sign(payload: { id: number, email: string, roomId: number }): string {
    return jwt.sign(payload, secret);
  }
}
