import jwtDecode from "jwt-decode";
import { CustomJwtPayload } from "./interfaces";

export const getUserId = (token: string): string | null | undefined => {
  if (token) {
    let decoded = jwtDecode<CustomJwtPayload>(token);
    if (decoded) {
      if (decoded.userId) {
        return decoded.userId;
      } else {
        return null;
      }
    }
  }
  return null;
};
