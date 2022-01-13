import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../hooks/useRole";
import { UserNavIcon } from "./UserNavIcon";

interface MainNavbarProps {
  isHome?: boolean;
  animated?: boolean;
}

const MainNavbar = ({ isHome, animated }: MainNavbarProps): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [isAuth, setIsAuth] = useState<boolean>();

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  // console.log("token :>> ", token);
  return (
    <div
      className={
        isHome && animated
          ? "mainNavbar bgWhite shadow"
          : isHome
          ? "heroNav"
          : "mainNavbar bgWhite shadow"
      }
      // className="mainNavbar bgWhite shadow"
    >
      <div className="customContainer d-flex py-2">
        <div className="brand">
          <Link href="/">
            <a>
              <h1 className="m0">Caradil</h1>
            </a>
          </Link>
        </div>
        <div className="mainNavLinks d-flex">
          <div className="mainNavLinksLeft d-flex align-items-center justify-content-around">
            <div>
              <Link href="/browse-cars">
                <a>
                  <small>Browse Cars</small>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/faqs">
                <a>
                  <small>FAQs</small>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/contact-us">
                <a>
                  <small>Contact Us</small>
                </a>
              </Link>
            </div>
          </div>
          <div className="mainNavLinksRight d-flex align-items-center justify-content-end">
            <div>
              <Link
                href={
                  role === 2 ? "/account/listings/add-car" : "/list-your-car"
                }
              >
                <a className="d-flex align-items-center h-100">
                  <span>
                    {/* <Icon icon="akar-icons:circle-plus" />{" "} */}
                    <BiPlusCircle size={"18px"} />
                  </span>
                  <span>
                    <small>List Car</small>
                  </span>
                </a>
              </Link>
            </div>
            <div className="marginLeft30px">
              {isAuth ? (
                <>
                  <UserNavIcon />
                </>
              ) : (
                <div className="d-flex align-items-center">
                  <div
                    style={{ width: "60px" }}
                    className="d-flex justify-content-center"
                  >
                    <Link href="/login">
                      <a>
                        <small>Sign In</small>
                      </a>
                    </Link>
                  </div>
                  <div className="d-flex sign-up-link">
                    |
                    <div
                      className="d-flex justify-content-center"
                      style={{ width: "60px" }}
                    >
                      {" "}
                      <Link href="/register">
                        <a>
                          <small>Sign Up</small>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
