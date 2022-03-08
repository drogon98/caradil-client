import Head from "next/head";
import React from "react";
import { Messages } from "../../../components/Account/Chats/Messages";
import { AuthWrapper } from "../../../components/AuthWrapper";
import { CustomHead } from "../../../components/CustomHead";
import AccountLayout from "../../../components/Layouts/AccountLayout";

interface ChatsProps {}

const ChatMediumMessages = (props: ChatsProps) => {
  return (
    <>
      <CustomHead title="Account - Chats" />
      <AuthWrapper>
        <AccountLayout>
          <Messages />
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default ChatMediumMessages;
