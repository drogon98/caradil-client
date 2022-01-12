import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  role: number;
  userId: number;
}
