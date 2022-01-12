import { useEffect, useState } from "react";
import { getRole } from "../../utils/role";

/**
 * @author @CodeYourEmpire
 * @function @useRole
 **/

export const useRole = (token: string): number | null => {
  const [role, setRole] = useState<number | null>(1);

  useEffect(() => {
    setRole(getRole(token));
  }, [token]);

  return role;
};
