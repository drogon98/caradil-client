import React from "react";
import { Chat, User } from "../../../graphql_types/generated/graphql";
import { useAppSelector } from "../../../redux/hooks";
import { useUserId } from "../../hooks/useUserId";

interface ChatBoxProps {
  data: Chat;
  receiverProfile: User;
  senderProfile: User;
}

export const ChatBox = (props: ChatBoxProps) => {
  const token = useAppSelector((state) => state.auth._id);
  const userId = useUserId(token);

  const getChatTime = (date: string) => {
    let tempDate = new Date(date);

    let tempRawTime = tempDate.toLocaleTimeString();

    let tempRawTimeSections = tempRawTime.split(" ");

    let tempRawTimeSectionsIdxZero = tempRawTimeSections[0].split(":");

    if (tempRawTimeSections[1]) {
      return `${tempRawTimeSectionsIdxZero[0]}:${tempRawTimeSectionsIdxZero[1]} ${tempRawTimeSections[1]}`;
    } else {
      return `${tempRawTimeSectionsIdxZero[0]}${tempRawTimeSectionsIdxZero[1]} hrs`;
    }
  };

  // console.log("props.data :>> ", props.data);

  return (
    <>
      {props.data.sender_id !== userId ? (
        <div className="chat-box-sender my-5">
          <div className="chat-box">
            <div className="sender-chat-tooltip p-2">
              <p>{props.data.message}</p>
              <div className="d-flex w-100 justify-content-end mt-2">
                <small className="chat-time">
                  {getChatTime(props.data.created_at)}
                </small>
              </div>
            </div>
            <img
              src={
                props.receiverProfile?.avatar?.secure_url
                  ? props.receiverProfile?.avatar.secure_url
                  : "/images/mackenzi.png"
              }
              style={{ objectFit: "cover", height: "40px", width: "40px" }}
              className="rounded-circle"
            />
          </div>
        </div>
      ) : (
        <div className="chat-box-receiver my-5">
          <div className="chat-box">
            <img
              src={
                props.senderProfile?.avatar?.secure_url
                  ? props.senderProfile?.avatar.secure_url
                  : "/images/mackenzi.png"
              }
              style={{ objectFit: "cover", height: "40px", width: "40px" }}
              className="rounded-circle"
            />
            <div className="receiver-chat-tooltip p-2">
              <p>{props.data.message}</p>
              <div className="d-flex w-100 justify-content-end mt-2">
                <small className="chat-time">
                  {getChatTime(props.data.created_at)}
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
