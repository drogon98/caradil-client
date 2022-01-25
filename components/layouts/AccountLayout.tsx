import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../hooks/useRole";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import AccountNavbar from "../Navbars/AccountNavbar";
import ChatNavbarMd from "../Navbars/ChatMdNavbar";
import ChatNavbar from "../Navbars/ChatNavbar";
import { AccountSideBarMenu } from "./AccountSideBarMenu";

const AccountLayout: React.FC = ({ children }): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [isHost, setIsHost] = useState(false);
  const router = useRouter();
  const [isChatsPage, setIsChatsPage] = useState(false);
  const [isChatsMdPage, setIsChatsMdPage] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (role === 2) {
      setIsHost(true);
    }
  }, [role]);

  useEffect(() => {
    try {
      if (router.pathname.includes("/chats")) {
        setIsChatsPage(true);
      }
      if (router.pathname.includes("/chats/md")) {
        setIsChatsMdPage(true);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [router]);

  return (
    <div id="accountLayoutWrapper">
      <div id="accountContentWrapper">
        <header>
          {isChatsMdPage && width <= 800 ? (
            <ChatNavbarMd />
          ) : isChatsPage && width <= 800 ? (
            <ChatNavbar />
          ) : (
            <AccountNavbar />
          )}
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
