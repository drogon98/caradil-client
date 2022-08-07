import { useRouter } from "next/router";
import React, { ReactChild, useEffect, useState } from "react";
import {
  OnUserUpdateDocument,
  useGetAuthUserQuery,
} from "../../graphql_types/generated/graphql";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUser } from "../../redux/userSlice";
import { BannerWrapper } from "../Account/BannerWrapper";
import { useRole } from "../hooks/useRole";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { Loading } from "../Loading";
import AccountNavbar from "../Navbars/AccountNavbar";
import ChatNavbarMd from "../Navbars/ChatMdNavbar";
import ChatNavbar from "../Navbars/ChatNavbar";
import { AccountSideBarMenu } from "./AccountSideBarMenu";

interface AccountProps {
  children: ReactChild;
}

const AccountLayout = (props: AccountProps): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [isHost, setIsHost] = useState(false);
  const router = useRouter();
  const [isChatsPage, setIsChatsPage] = useState(false);
  const [isChatsMdPage, setIsChatsMdPage] = useState(false);
  const { width } = useWindowDimensions();
  const { data, loading, subscribeToMore } = useGetAuthUserQuery({
    fetchPolicy: "network-only",
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.getUser.user) {
      dispatch(setUser(data.getUser?.user));
    }
  }, [data]);

  // useEffect(() => {
  //   let unsubUserUpdate: { (): void; (): void };
  //   if (subscribeToMore) {
  //     unsubUserUpdate = subscribeToMore({
  //       document: OnUserUpdateDocument,
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
  //         const updatedUser: any = { ...subscriptionData.data };
  //         // console.log("updatedUser :>> ", updatedUser);
  //         return {
  //           getUser: {
  //             user: {
  //               ...prev.getUser.user,
  //               ...updatedUser,
  //             },
  //           },
  //         };
  //       },
  //     });
  //   }

  //   return () => {
  //     if (unsubUserUpdate) {
  //       unsubUserUpdate();
  //     }
  //   };
  // }, [subscribeToMore]);

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

  // console.log("loading", loading);

  return (
    <div id="accountLayoutWrapper">
      <div id="accountContentWrapper">
        <header>
          {/* <div className="account-nav-wrapper"> */}
          {isChatsMdPage && width <= 800 ? (
            <ChatNavbarMd />
          ) : isChatsPage && width <= 800 ? (
            <ChatNavbar />
          ) : (
            <AccountNavbar />
          )}
          {/* </div> */}
        </header>
        <main>
          <div className="account-wrapper">
            <div className="account-sidebar">
              <AccountSideBarMenu isHost={isHost} />
            </div>
            <div className="account-content">
              {loading ? (
                <Loading />
              ) : (
                <BannerWrapper>{props.children}</BannerWrapper>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
