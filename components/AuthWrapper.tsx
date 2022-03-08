import { useRouter } from "next/router";
import React, { ReactChild, useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { useRole } from "./Hooks/useRole";
import { LogoutOverlay } from "./LogoutOverlay";

interface AuthWrapperProps {
  children: ReactChild;
}

export const AuthWrapper = (props: AuthWrapperProps) => {
  // Applies to guest and host
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const loggingOut = useAppSelector((state) => state.logout.loggingOut);
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>();

  useEffect(() => {
    if (token && role && role !== 3) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token, role]);

  useEffect(() => {
    const redirect = async () => {
      if (!token) {
        await router.push({
          pathname: "/login",
          query: {
            next: router.pathname,
            nextQuery: JSON.stringify(router.query),
          },
        });
      }
    };

    redirect();
  }, [token]);

  return isAuth ? (
    <>
      {loggingOut && <LogoutOverlay />}
      {props.children}
    </>
  ) : null;
};
