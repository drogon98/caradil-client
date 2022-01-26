import Link from "next/link";
import React from "react";
import { ChatMeta } from "../../../graphql_types/generated/graphql";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { ChatUserProfileBox } from "./ChatUserProfileBox";

interface ChatUserProfileProps {
  data: ChatMeta;
}

export const ChatUserProfile = (props: ChatUserProfileProps) => {
  const { width } = useWindowDimensions();

  return (
    <div>
      {width < 800 ? (
        <Link href={{ pathname: `/account/chats/md`, query: {} }}>
          <a className="container">
            <ChatUserProfileBox data={props.data} />
          </a>
        </Link>
      ) : (
        <ChatUserProfileBox isLg data={props.data} />
      )}
    </div>
  );
};
