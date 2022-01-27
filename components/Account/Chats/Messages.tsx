import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
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
  // senderId?: number;
  receiverId?: number;
  activeChatId: number;
}

export const Messages = (props: ChatsProps) => {
  const [message, setMessage] = useState("");
  const [createChat, { loading: creatingChat }] = useCreateChatMutation();
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [getChats, { data, loading: loadingChats, subscribeToMore }] =
    useGetChatsLazyQuery();
  const msgBtmRef = useRef<HTMLDivElement>(null);
  const [hasNewChat, setHasNewChat] = useState(false);
  const [chatMetaId, setChatMetaId] = useState<number>();
  const [receiverId, setReceiverId] = useState<number>();
  // const [senderId, setSenderId] = useState<number>();

  useEffect(() => {
    const _getChats = async () => {
      try {
        const isMdPage = router.pathname.includes("/chats/md");
        if (isMdPage) {
          // Small screens page
          const tempChatMetaId = parseInt(router.query.meta_id as string, 10);
          const tempReceiverId = parseInt(router.query.rc_id as string, 10);

          setChatMetaId(tempChatMetaId);
          setReceiverId(tempReceiverId);

          if (tempChatMetaId) {
            getChats({
              variables: { chatMetaId: tempChatMetaId! },
            });
          }
        } else {
          setChatMetaId(props.chatMetaId);
          setReceiverId(props.receiverId);
          // setSenderId(props.senderId);
          getChats({
            variables: { chatMetaId: props.chatMetaId! },
          });
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    _getChats();
  }, [router.query, props, props.activeChatId]);

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
      // Check if the last chat has changed in incoming array. If so,scroll top
      let incomingChats = data.getChats;
      let lastChatIdxInIncomingChats = incomingChats.length - 1;
      if (chats && chats.length > 0) {
        let lastChatIdxInCurrentChats = chats?.length - 1;
        if (
          incomingChats[lastChatIdxInIncomingChats]?.id !==
          chats[lastChatIdxInCurrentChats].id
        ) {
          setHasNewChat(true);
        } else {
          setHasNewChat(false);
        }
      } else {
        setHasNewChat(false);
      }
      setChats([...data.getChats]);
    }
  }, [data, loadingChats]);

  useEffect(() => {
    if (msgBtmRef && msgBtmRef.current && chats && !hasNewChat) {
      msgBtmRef.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }, [msgBtmRef, chats, hasNewChat]);

  useEffect(() => {
    if (hasNewChat && msgBtmRef) {
      if (msgBtmRef.current) {
        msgBtmRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }

      setHasNewChat(false);
    }
  }, [chats, msgBtmRef]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload: ChatInput = {
        chat_meta_id: chatMetaId!,
        message,
        receiver_id: receiverId!,
      };
      const response = await createChat({ variables: { input: payload } });
      if (response.data?.createChat) {
        setMessage("");
      } else {
        console.log("error :>> ");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="chat-top p-0 d-flex justify-content-center">
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
            <>
              {chats?.map((chat) => (
                <ChatBox key={chat.id} data={chat} />
              ))}
              <div ref={msgBtmRef} />
            </>
          )}
        </div>

        <form
          className="form-group chat-input-wrapper p-0"
          onSubmit={handleSubmit}
        >
          <div className="chat-textarea-send-wrapper h-100">
            <textarea
              required
              className="form-control h-100 chat-textarea"
              placeholder="Type message here..."
              onChange={handleChange}
              value={message}
            />
            <div className="bg-successw-100 d-flex justify-content-center align-items-center">
              <button className="btn" type="submit" disabled={creatingChat}>
                <RiSendPlane2Fill size={"25px"} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
