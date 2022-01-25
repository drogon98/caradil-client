import React from "react";

interface ChatBoxProps {
  data: any;
}

export const ChatBox = (props: ChatBoxProps) => {
  return (
    <>
      {props.data.sender ? (
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
