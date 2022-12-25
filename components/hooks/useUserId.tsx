import { useEffect, useState } from "react";
import { getUserId } from "../../utils/userId";

export const useUserId = (token: string): string | undefined | null => {
  const [userId, setUserId] = useState<string | undefined | null>();

  useEffect(() => {
    if (token) {
      setUserId(getUserId(token!));
    }
  }, [token]);

  return userId;
};
