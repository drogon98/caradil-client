import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { UserNavIcon } from "./UserNavIcon";

interface AccountNavbarProps {}

const AccountNavbar = (props: AccountNavbarProps): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isAuth, setIsAuth] = useState<boolean>();

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
          <Link
            href={router.pathname.split("/").length === 3 ? "/account" : "/"}
          >
            <a>
              <h1 className="m0">Caradil</h1>
            </a>
          </Link>
        </div>
        <div className="mainNavLinks d-flex">
          {/* <div className="mainNavLinksLeft d-flex align-items-center justify-content-around">
            <div>
              <Link href="/browse-cars">
                <a>Browse Cars</a>
              </Link>
            </div>
            <div>
              <Link href="/faqs">
                <a>FAQs</a>
              </Link>
            </div>
            <div>
              <Link href="/contact-us">
                <a>Contact Us</a>
              </Link>
            </div>
          </div> */}
          <div className="mainNavLinksRight d-flex align-items-center justify-content-end">
            {/* <div className="pr-5">
              <Link href="/list-your-car">
                <a>+ List your car</a>
              </Link>
            </div> */}
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
