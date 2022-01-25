import Link from "next/link";
import React from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { ChatUserProfileBox } from "./ChatUserProfileBox";

interface ChatUserProfileProps {}

export const ChatUserProfile = (props: ChatUserProfileProps) => {
  // console.log("props.data :>> ", props.data);
  const { width } = useWindowDimensions();

  return (
    <div>
      {width < 800 ? (
        <Link href={`/account/chats/md`}>
          <a className="container">
            <ChatUserProfileBox />
          </a>
        </Link>
      ) : (
        <ChatUserProfileBox />
      )}
    </div>
  );
};
