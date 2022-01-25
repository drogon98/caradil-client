import React from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { ChatBox } from "./ChatBox";

interface ChatsProps {}

const chats = [
  {
    id: 1,
    sender: true,
    message: "The wuick brown fox jumped over the lazy dog",
  },
  {
    id: 2,
    sender: false,
    message:
      "The wuick brown fox jumped over the lazy dog The wuick brown fox jumped over the lazy dog The wuick brown fox jumped over the lazy dog The wuick brown fox jumped over the lazy dog The wuick brown fox jumped over the lazy dog",
  },
  { id: 3, sender: true, message: "Helloo World!" },
  { id: 4, sender: true, message: "The wuick brown fox jumped" },
  { id: 5, sender: false, message: "Helloo" },
  {
    id: 6,
    sender: false,
    message: "The wuick brown fox jumped over the lazy dog",
  },
  { id: 7, sender: true, message: "Helloo World!" },
  {
    id: 8,
    sender: true,
    message:
      "The wuick brown fox jumped over the lazy dog The wuick brown fox jumped over the lazy dog The wuick brown fox jumped over the lazy dog The wuick brown fox jumped over the lazy dog The wuick brown fox jumped over the lazy dog",
  },
  { id: 9, sender: true, message: "Helloo World!" },
];

export const Messages = (props: ChatsProps) => {
  return (
    <div>
      <div className="chat-top p-3 d-flex justify-content-center">
        <img
          src="/images/mackenzi.png"
          style={{ objectFit: "cover", height: "55px", width: "55px" }}
          className="rounded-circle"
        />
        <h6 className="m-0">John Doe</h6>
      </div>
      <div>
        <div className="chat-messages-wrapper p-2 pt-4">
          {chats.map((chat) => (
            <ChatBox key={chat.id} data={chat} />
          ))}
        </div>
        <form className="form-group chat-input-wrapper p-0">
          <div className="chat-textarea-send-wrapper h-100">
            <textarea
              required
              className="form-control h-100"
              placeholder="Type message here..."
            />
            <div className="bg-successw-100 d-flex justify-content-center align-items-center">
              <button className="btn" type="submit">
                <RiSendPlane2Fill size={"40px"} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
