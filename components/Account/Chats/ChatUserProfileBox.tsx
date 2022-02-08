import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChatMeta, Maybe } from "../../../graphql_types/generated/graphql";
import moment from "moment";

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
      await router.push(
        {
          pathname: `/account/chats/md`,
          query: {
            meta_id: id,
            rc_id: props.data.receiver?.id,
          },
        },
        `/account/chats/md?meta_id=${id}&rc_id=${props.data.receiver?.id}`
      );
    } else {
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
    }
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
        {props.data.no_chat ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <p className="m-0">{name}</p>
              <span>
                <small>
                  {moment(props.data.latest_chat?.created_at).calendar({
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd",
                    lastDay: "[Yesterday]",
                    lastWeek: "[Last] dddd",
                    sameElse: "DD/MM/YYYY",
                  })}
                </small>
              </span>
            </div>
            <p className="chat-profile-text">{props.data.no_chat}</p>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between w-100 align-items-center mb-2">
              <div className="d-flex justify-content-between w-75 align-items-center chat-profile-name-chats-count">
                <p className="m-0 w-75 chat-profile-name">{name}</p>
                <div className="w-25 chat-count-wrapper">
                  {props.data.unread_chats_count ? (
                    <div className="bg-success chat-count-badge">
                      {props.data.unread_chats_count}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="chat-profile-time w-25">
                <small>
                  {moment(props.data.latest_chat?.created_at).calendar({
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd",
                    lastDay: "[Yesterday]",
                    lastWeek: "[Last] dddd",
                    sameElse: "DD/MM/YYYY",
                  })}
                </small>
              </div>
            </div>

            <p
              className={`chat-profile-text ${
                props.data.unread_chats_count && `chat-profile-unread-text`
              }`}
            >
              <small>{props.data.latest_chat?.message}</small>
            </p>
          </>
        )}
        {/* <div className="p-2"></div> */}
      </div>
      <div className="mt-2" style={{ borderBottom: "1px solid #eaecee" }} />
    </div>
  );
};
