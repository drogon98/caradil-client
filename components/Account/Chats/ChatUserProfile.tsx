import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { ChatMeta } from "../../../graphql_types/generated/graphql";
import { useWindowDimensions } from "../../Hooks/useWindowDimensions";
import { ChatUserProfileBox } from "./ChatUserProfileBox";

interface ChatUserProfileProps {
  data: ChatMeta;
  setActiveChatId: Dispatch<SetStateAction<number | undefined>>;
}

export const ChatUserProfile = (props: ChatUserProfileProps) => {
  const { width } = useWindowDimensions();

  return (
    <div>
      {width < 800 ? (
        <div className="container p-0">
          <ChatUserProfileBox data={props.data} />
        </div>
      ) : (
        <ChatUserProfileBox
          isLg
          data={props.data}
          setActiveChatId={props.setActiveChatId}
        />
      )}
    </div>
  );
};
