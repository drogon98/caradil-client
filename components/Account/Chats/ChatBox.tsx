import React, { useEffect, useState } from "react";
import { Chat } from "../../../graphql_types/generated/graphql";
import { useAppSelector } from "../../../redux/hooks";
import { useUserId } from "../../hooks/useUserId";

interface ChatBoxProps {
  data: Chat;
}

export const ChatBox = (props: ChatBoxProps) => {
  const token = useAppSelector((state) => state.auth._id);
  const userId = useUserId(token);
  const [isSender, setIsSender] = useState<boolean>();

  useEffect(() => {
    if (props.data && userId) {
      setIsSender(props.data.sender_id === userId);
    }
  }, [props.data, userId]);

  return (
    <>
      {isSender ? (
        <div className="chat-box-sender my-5">
          <div className="chat-box">
            <div className="sender-chat-tooltip p-2">{props.data.message}</div>
            <img
              src="/images/mackenzi.png"
              style={{ objectFit: "cover", height: "40px", width: "40px" }}
              className="rounded-circle"
            />
          </div>
        </div>
      ) : (
        <div className="chat-box-receiver my-5">
          <div className="chat-box">
            <img
              src="/images/mackenzi.png"
              style={{ objectFit: "cover", height: "40px", width: "40px" }}
              className="rounded-circle"
            />
            <div className="receiver-chat-tooltip p-2">
              <p>{props.data.message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
