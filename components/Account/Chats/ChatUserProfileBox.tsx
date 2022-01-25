import React from "react";

interface ChatUserProfileBoxProps {}

export const ChatUserProfileBox = (props: ChatUserProfileBoxProps) => {
  return (
    <div className="row py-2 px-2 m-0 cursor-pointer">
      <div className="col-3 p-0 d-flex justify-content-center">
        <img
          src="/images/mackenzi.png"
          style={{ objectFit: "cover", height: "55px", width: "55px" }}
          className="rounded-circle"
        />
      </div>
      <div className="col-9">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="m-0">John Doe</h6>
          <span>
            <small>12:05 pm</small>
          </span>
        </div>
        <p>The quick brown fox jumped over the lazy dog.</p>
      </div>
      <div className="mt-2" style={{ borderBottom: "1px solid #eaecee" }} />
    </div>
  );
};
