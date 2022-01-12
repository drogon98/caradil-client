import React, { useEffect, useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../hooks/useRole";
import AccountNavbar from "../Navbars/AccountNavbar";
import { AccountSideBarMenu } from "./AccountSideBarMenu";

const AccountLayout: React.FC = ({ children }): JSX.Element => {
  // const ctx = useContext(AuthContext);
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [isHost, setIsHost] = useState(false);
  // const [hamburgerOpen, setHamburgerOpen] = useState(true);
  const [showSideMenu, setShowSideMenu] = useState<boolean>();

  useEffect(() => {
    if (role === 2) {
      setIsHost(true);
    }
  }, [role]);

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

  // console.log("showSideMenu :>> ", showSideMenu);

  return (
    <div id="accountLayoutWrapper">
      <div id="accountContentWrapper">
        <header>
          <AccountNavbar />
        </header>
        <main>
          <div className="account-wrapper">
            <div className="p-2 py-3 sm-hamburger shadow">
              <HamburgerMenu
                isOpen={false}
                menuClicked={handleOpeHamburgerClick}
                width={15}
                height={10}
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
                    width={18}
                    height={15}
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
            {/*  */}
            <div className="account-sidebar pt-4">
              <AccountSideBarMenu isHost={isHost} />
            </div>
            <div className="account-content">{children}</div>
          </div>
        </main>
        {/* )} */}
      </div>
      {/* <footer id="footerWrapper">
        <MainFooter />
      </footer> */}
    </div>
  );
};

export default AccountLayout;
