import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";

interface ChatNavbarMdProps {}

const ChatNavbarMd = (props: ChatNavbarMdProps): JSX.Element => {
  const router = useRouter();
  const [profileData, setProfileData] =
    useState<{ avatar: string; name: string }>();

  useEffect(() => {
    try {
      let rawData = sessionStorage.getItem("rec_prof");
      setProfileData(JSON.parse(rawData!));
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, []);

  return (
    <div className={`accountNavbar bgWhite shadow`}>
      <div className="w-100 h-100 d-flex p-2 px-3 align-items-center justify-content-between">
        <div>
          <button
            className="btn m-0 p-0 pl-2"
            onClick={async () => {
              await router.push("/account/chats");
              sessionStorage.removeItem("rec_prof");
            }}
          >
            <BsArrowLeft size={"30px"} />
          </button>
        </div>
        <div className="d-flex align-items-center">
          {" "}
          <img
            src={
              profileData?.avatar ? profileData?.avatar : "/images/mackenzi.png"
            }
            style={{ objectFit: "cover", height: "40px", width: "40px" }}
            className="rounded-circle"
          />
          <h6 className="m-0">{profileData?.name}</h6>
        </div>
        <div />
      </div>
    </div>
  );
};

export default ChatNavbarMd;
