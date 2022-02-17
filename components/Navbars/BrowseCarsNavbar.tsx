import Link from "next/link";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useEditCarPublishedMutation } from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../hooks/useRole";
import { AutoComplete } from "../Location/AutoComplete";
import { LogoutOverlay } from "../LogoutOverlay";
import { UserNavIcon } from "./UserNavIcon";

interface BrowseCarsNavbarProps {
  //   isHome?: boolean;
  animated?: boolean;
}

const BrowseCarsNavbar = ({ animated }: BrowseCarsNavbarProps): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [isAuth, setIsAuth] = useState<boolean>();
  const loggingOut = useAppSelector((state) => state.logout.loggingOut);
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const handleLocationChange = () => {};

  // console.log("carId :>> ", carId);

  return (
    <div
      className={"mainNavbar bgWhite shadow"}
      // className="mainNavbar bgWhite shadow"
    >
      <div className="customBrowseCarContainer d-flex align-items-center py-2 m-auto">
        <div className="brand">
          <Link href="/">
            <a>
              <h1 className="m0 brand-head">Caradil</h1>
            </a>
          </Link>
        </div>
        <div className="mainNavLinks d-flex">
          <div className="mainNavLinksLeft d-flex align-items-center">
            <form className="form-group d-flex p-0 m-0 browse-cars-nav-form">
              <div className="input-group p-0 m-0 d-flex w-100">
                <div className="h-100 browse-nav-where-input">
                  {/* <input
                    type="text"
                    className="form-control w-100 h-100"
                    placeholder="Where?"
                    aria-describedby="basic-addon2"
                  /> */}
                  <AutoComplete
                    placeholder="Where?"
                    handler={handleLocationChange}
                    inputRef={inputRef}
                    name="location"
                    value={""}
                    required={true}
                  />
                </div>
                <div className="h-100 browse-nav-when-input">
                  <input
                    type="text"
                    className="form-control h-100"
                    placeholder="When?"
                    aria-describedby="basic-addon2"
                  />
                </div>
                <div className="input-group-append h-100 browse-nav-search-input">
                  <button
                    className="btn bgOrange text-light h-100"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 32 32"
                      className="browse-cars-search-icon"
                    >
                      <g
                        fill="none"
                        stroke="currentcolor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <circle cx="14" cy="14" r="12" />
                        <path d="m23 23l7 7" />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <>
                  <button
                    className="btn browse-cars-nav-filter-btn"
                    onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      handleShow();
                    }}
                    title="More Filters"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 21 21"
                      className="browse-cars-filter-icon"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.5 4a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1zm12 2h-11m-2 0h-3m4 8a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm12 2h-11m-2 0h-3m12-7a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm-1 2h-11m16 0h-3"
                      />
                    </svg>
                  </button>
                  <Offcanvas show={show} onHide={handleClose} backdrop="false">
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>
                        <h3>More Filters</h3>
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body></Offcanvas.Body>
                  </Offcanvas>
                </>
              </div>
            </form>
          </div>

          <div className="browse-cars-nav-auth d-flex align-items-center">
            <div className="mainNavLinksRight d-flex align-items-center justify-content-end">
              <div className="browse-cars-nav-list-car">
                <Link
                  href={
                    role === 2 ? "/account/listings/add-car" : "/list-your-car"
                  }
                >
                  <a className="d-flex align-items-center list-car-navbar h-100">
                    <span>
                      <small>List Your Car</small>
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

      {loggingOut && <LogoutOverlay />}
    </div>
  );
};

export default BrowseCarsNavbar;
