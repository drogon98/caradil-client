import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChatMeta, Maybe } from "../../../graphql_types/generated/graphql";

interface ChatUserProfileBoxProps {
  isLg?: boolean;
  data: ChatMeta;
  setActiveChatId?: Dispatch<SetStateAction<number | undefined>>;
}

export const ChatUserProfileBox = (props: ChatUserProfileBoxProps) => {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    if (props.data) {
      if (props.data.receiver?.business_name) {
        setName(props.data.receiver?.business_name);
        return;
      } else if (props.data.receiver?.first_name) {
        if (props.data.receiver?.last_name) {
          setName(
            `${props.data.receiver?.first_name} ${props.data.receiver?.last_name
              .charAt(0)
              .toUpperCase()}`
          );
        }
      } else {
        setName(props.data.receiver?.email!);
      }
    }
  }, [props.data]);

  // console.log("router :>> ", router);

  const handleClick = async (e: any, id: Maybe<number> | undefined) => {
    if (!props.isLg) {
      return;
    }

    props.setActiveChatId!(id as number);
    await router.push(
      {
        pathname: `/account/chats`,
        query: {
          meta_id: id,
        },
      },
      `/account/chats/?meta_id=${id}`,
      { shallow: true }
    );
  };

  return (
    <div
      className="row py-2 px-2 m-0 cursor-pointer"
      onClick={(e) => handleClick(e, props.data.id)}
    >
      <div className="col-3 p-0 d-flex justify-content-center">
        <img
          src={
            props.data.receiver?.avatar?.secure_url
              ? props.data.receiver?.avatar?.secure_url
              : "/images/mackenzi.png"
          }
          style={{ objectFit: "cover", height: "55px", width: "55px" }}
          className="rounded-circle"
        />
      </div>
      <div className="col-9">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="m-0">{name}</h6>
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
