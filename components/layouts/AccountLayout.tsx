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
  // const [showSideMenu, setShowSideMenu] = useState<boolean>();

  useEffect(() => {
    if (role === 2) {
      setIsHost(true);
    }
  }, [role]);

  // console.log("showSideMenu :>> ", showSideMenu);

  return (
    <div id="accountLayoutWrapper">
      <div id="accountContentWrapper">
        <header>
          <AccountNavbar />
        </header>
        <main>
          <div className="account-wrapper">
            <div className="account-sidebar pt-4">
              <AccountSideBarMenu isHost={isHost} />
            </div>
            <div className="account-content">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
