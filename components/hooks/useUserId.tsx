import { useEffect, useState } from "react";
import { getUserId } from "../../utils/userId";

export const useUserId = (token: string): number | undefined | null => {
  const [userId, setUserId] = useState<number | undefined | null>();

  useEffect(() => {
    if (token) {
      setUserId(getUserId(token!));
    }
  }, [token]);

  return userId;
};
