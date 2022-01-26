import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import {
  Chat,
  ChatInput,
  OnNewChatDocument,
  useCreateChatMutation,
  useGetChatsLazyQuery,
} from "../../../graphql_types/generated/graphql";
import FlexibleLoader from "../../Loading/FlexibleLoader";
import { ChatBox } from "./ChatBox";

interface ChatsProps {
  chatMetaId?: number;
  senderId?: number;
  receiverId?: number;
}

export const Messages = (props: ChatsProps) => {
  const [message, setMessage] = useState("");
  const [createChat, { loading: creatingChat }] = useCreateChatMutation();
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>();
  const [getChats, { data, loading: loadingChats, subscribeToMore }] =
    useGetChatsLazyQuery();

  useEffect(() => {
    const _getChats = async () => {
      try {
        const isMdPage = router.pathname.includes("/chats/md");
        if (isMdPage) {
          // Small screens page
        } else {
          getChats({
            variables: { chatMetaId: props.chatMetaId! },
          });
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    _getChats();
  }, [router.query]);

  useEffect(() => {
    let unsubscribeNewChat: { (): void; (): void };
    if (subscribeToMore) {
      unsubscribeNewChat = subscribeToMore({
        document: OnNewChatDocument,
        // variables: { chatMetaId: props.chatMetaId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newChat: any = { ...subscriptionData.data };
          return {
            getChats: [...prev.getChats, newChat.newChat as Chat],
          };
        },
      });
    }

    return () => {
      if (unsubscribeNewChat) {
        unsubscribeNewChat();
      }
    };
  }, [subscribeToMore]);

  useEffect(() => {
    if (data && data.getChats && !loadingChats) {
      setChats([...data.getChats]);
    }
  }, [data, loadingChats]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload: ChatInput = {
        chat_meta_id: props.chatMetaId!,
        message,
        receiver_id: props.receiverId!,
      };
      const response = await createChat({ variables: { input: payload } });
      if (response.data?.createChat) {
        setMessage("");
      } else {
        console.log("error :>> ");
      }
    } catch (error) {}
  };

  // console.log("chats :>> ", chats);

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
          {loadingChats ? (
            <FlexibleLoader />
          ) : (
            chats?.map((chat) => <ChatBox key={chat.id} data={chat} />)
          )}
        </div>

        <form
          className="form-group chat-input-wrapper p-0"
          onSubmit={handleSubmit}
        >
          <div className="chat-textarea-send-wrapper h-100">
            <textarea
              required
              className="form-control h-100"
              placeholder="Type message here..."
              onChange={handleChange}
            />
            <div className="bg-successw-100 d-flex justify-content-center align-items-center">
              <button className="btn" type="submit" disabled={creatingChat}>
                <RiSendPlane2Fill size={"40px"} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
