import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";

interface AuthWrapperProps {}

//  const res = await fetch(`${baseUrl}validate-user`, {
//   // method: 'POST', // *GET, POST, PUT, DELETE, etc.
//   // mode: 'cors', // no-cors, *cors, same-origin
//   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: "include", // include, *same-origin, omit
//   headers: {
//     authorization: `Bearer ${token}`,
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   // redirect: 'follow', // manual, *follow, error
//   // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   // body: JSON.stringify(data) // body data type must match "Content-Type" header
// });

export const AuthWrapper: FC = (props) => {
  const token = useAppSelector((state) => state.auth._id);

  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>();

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

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

  return isAuth ? <>{props.children}</> : null;
};
