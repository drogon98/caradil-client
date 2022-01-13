import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { UserNavIcon } from "./UserNavIcon";

interface AccountNavbarProps {}

const AccountNavbar = (props: AccountNavbarProps): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  const router = useRouter();

  const [redirectPath, setRedirectPath] = useState("/");

  const [isAuth, setIsAuth] = useState<boolean>();

  useEffect(() => {
    if (router.pathname) {
      if (router.pathname.split("/").length > 2) {
        setRedirectPath("/account");
      } else {
        setRedirectPath("/");
      }
    }
  }, [router.pathname]);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const { width, height } = useWindowDimensions();

  return (
    <div className={`accountNavbar bgWhite ${width > 600 && `shadow`}`}>
      <div className="w100 h-100 d-flex p-2 align-items-center">
        <div className="brand">
          <Link href={redirectPath}>
            <a>
              <h1 className="m0">Caradil</h1>
            </a>
          </Link>
        </div>
        <div className="mainNavLinks d-flex">
          <div className="mainNavLinksRight d-flex align-items-center justify-content-end">
            <div className="marginLeft30px">
              {isAuth ? (
                <>
                  <UserNavIcon />
                </>
              ) : (
                <Link href="/login">
                  <a className="btn bgOrange">Sign In</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountNavbar;
