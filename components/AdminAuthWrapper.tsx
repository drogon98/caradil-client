import { useRouter } from "next/router";
import React, { FC, ReactChild, useEffect } from "react";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { useRole } from "./Hooks/useRole";

interface AdminAuthWrapperProps {
  children: ReactChild;
}

export const AdminAuthWrapper = (props: AdminAuthWrapperProps) => {
  // Admin
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);

  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>();

  useEffect(() => {
    if (token && role && role === 3) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token, role]);

  useEffect(() => {
    const redirect = async () => {
      if (!token) {
        await router.push({
          pathname: "/root/login",
          //   query: {
          //     next: router.pathname,
          //     nextQuery: JSON.stringify(router.query),
          //   },
        });
      }
    };

    redirect();
  }, [token]);

  return isAuth ? <>{props.children}</> : null;
};
