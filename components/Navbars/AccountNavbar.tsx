import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../Hooks/useRole";
import { AccountSideBarMenu } from "../Layouts/AccountSideBarMenu";
import { NotificationsNavIcon } from "./NotificationsNavIcon";
import { UserNavIcon } from "./UserNavIcon";

interface AccountNavbarProps {}

const AccountNavbar = (props: AccountNavbarProps): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const router = useRouter();
  const [isHost, setIsHost] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState<boolean>();
  // const hamburgerBtnRef = useRef<any>(null);
  // const menuRef = useRef<HTMLDivElement>(null);
  // const user = useAppSelector((state) => state.user.user);
  // const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (role === 2) {
      setIsHost(true);
    }
  }, [role]);

  // const [redirectPath, setRedirectPath] = useState("/");

  // useEffect(() => {
  //   try {
  //     if (role === 1) {
  //       if (user?.phone && user?.first_name && user?.last_name) {
  //         setShowBanner(false);
  //       } else {
  //         setShowBanner(true);
  //       }
  //     } else if (role === 2) {
  //       if (user?.phone && user?.first_name && user?.last_name) {
  //         setShowBanner(false);
  //       } else {
  //         setShowBanner(true);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // }, [user]);

  const handleOpeHamburgerClick = () => {
    // setHamburgerOpen(!hamburgerOpen);
    setShowSideMenu((prevState) => {
      if (prevState === undefined) {
        return true;
      }
      return prevState == true ? false : prevState === false ? true : undefined;
    });
  };

  const handleCloseHamburgerClick = () => {
    // setHamburgerOpen(!hamburgerOpen);
    setShowSideMenu((prevState) => {
      if (prevState === undefined) {
        return true;
      }
      return prevState == true ? false : prevState === false ? true : undefined;
    });
  };

  // useEffect(() => {
  //   if (router.pathname) {
  //     if (router.pathname.split("/").length > 2) {
  //       setRedirectPath("/account");
  //     } else {
  //       setRedirectPath("/");
  //     }
  //   }
  // }, [router.pathname]);

  return (
    <div className={`accountNavbar shadow`}>
      <div className="w100 h-100 d-flex p-2 align-items-center">
        <div className="brand">
          <Link href="/">
            <a>
              <h1 className="m0">Caradil</h1>
            </a>
          </Link>
        </div>
        <div className="mainNavLinks d-flex">
          <div className="mainNavLinksRight d-flex align-items-center justify-content-end">
            <NotificationsNavIcon />
            <div className="marginLeft30px">
              <div className="account-user-icon">
                <UserNavIcon isAccount />
              </div>

              {/* <Link href="/login">
                // <a className="btn bgOrange">Sign In</a>
                //{" "}
              </Link> */}
              <div className="account-hamburger-icon">
                <div>
                  <HamburgerMenu
                    isOpen={false}
                    menuClicked={handleOpeHamburgerClick}
                    width={25}
                    height={20}
                    strokeWidth={1}
                    rotate={0}
                    color="black"
                    borderRadius={0}
                    animationDuration={0.5}
                  />
                </div>
                {/* <span className="notifications-dot"></span> */}

                <div
                  className={`sm-side-menu shadow pt-2 ${
                    showSideMenu === true
                      ? "sm-side-menu-show"
                      : showSideMenu === false && "sm-side-menu-hide"
                  }`}
                >
                  <div>
                    <div className="d-flex justify-content-end p-2">
                      {" "}
                      <HamburgerMenu
                        isOpen={true}
                        menuClicked={handleCloseHamburgerClick}
                        width={25}
                        height={20}
                        strokeWidth={1}
                        rotate={0}
                        color="white"
                        borderRadius={0}
                        animationDuration={0.5}
                      />
                    </div>
                  </div>
                  <AccountSideBarMenu isHost={isHost} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountNavbar;
