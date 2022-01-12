import React from "react";
import Link from "next/link";
import { useAppSelector } from "../../redux/hooks";
import { Icon } from "@iconify/react";

interface AdminNavbarProps {}

const AdminNavbar = (props: AdminNavbarProps): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  return (
    <div className={"adminNavbar bgWhite shadow"}>
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
          </div>
          <div className="mainNavLinksRight d-flex align-items-center justify-content-end">
            <div className="pr-5">
              <Link href="/list-your-car">
                <a>+ List your car</a>
              </Link>
            </div>
            <div className="marginLeft30px">
              {token ? (
                <>
                  <div className="account-tooltip m-0 p-0">
                    <Icon
                      icon="ei:user"
                      className="account-icon color-orange"
                    />
                    Helloo
                    <div className="account-tooltip-content shadow">
                      <div>
                        <Link href="/account">Account</Link>
                      </div>
                      <div>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            // dispatch(logout());
                          }}
                        >
                          Logout
                        </p>
                      </div>
                    </div>
                  </div>
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

export default AdminNavbar;
