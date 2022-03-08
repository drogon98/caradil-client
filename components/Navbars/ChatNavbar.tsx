import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import { FiSearch } from "react-icons/fi";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../Hooks/useRole";
import { AccountSideBarMenu } from "../Layouts/AccountSideBarMenu";

interface ChatNavbarProps {}

const ChatNavbar = (props: ChatNavbarProps): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const router = useRouter();
  const [isHost, setIsHost] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState<boolean>();

  useEffect(() => {
    if (role === 2) {
      setIsHost(true);
    }
  }, [role]);

  const [redirectPath, setRedirectPath] = useState("/");

  const [isAuth, setIsAuth] = useState<boolean>();

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

  return (
    <div className={`accountNavbar bgWhite shadow`}>
      <div className="w100 h-100 d-flex p-2 px-3 align-items-center justify-content-between">
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
                  color="black"
                  borderRadius={0}
                  animationDuration={0.5}
                />
              </div>
            </div>
            <AccountSideBarMenu isHost={isHost} />
          </div>
        </div>
        <h4>Messages</h4>
        <FiSearch size={"25px"} />
      </div>
    </div>
  );
};

export default ChatNavbar;
