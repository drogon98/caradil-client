import jwtDecode from "jwt-decode";
import { CustomJwtPayload } from "./interfaces";

export const getRole = (token: string): number | null => {
  if (token) {
    let decoded = jwtDecode<CustomJwtPayload>(token);
    if (decoded) {
      if (decoded.role) {
        return decoded.role;
      } else {
        return null;
      }
    }
  }
  return null;
};
