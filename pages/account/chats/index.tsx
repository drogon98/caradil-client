import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ChatUserProfile } from "../../../components/Account/Chats/ChatUserProfile";
import { Messages } from "../../../components/Account/Chats/Messages";
import { AuthWrapper } from "../../../components/AuthWrapper";
import { CustomHead } from "../../../components/CustomHead";
import { useRole } from "../../../components/hooks/useRole";
import { useUserId } from "../../../components/hooks/useUserId";
import AccountLayout from "../../../components/layouts/AccountLayout";
import { Loading } from "../../../components/Loading";
import {
  ChatMeta,
  useGetUserChatMetasQuery,
  User,
} from "../../../graphql_types/generated/graphql";
import { useAppSelector } from "../../../redux/hooks";

interface ChatsProps {}

const Chats = (props: ChatsProps) => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const userId = useUserId(token);
  const [skip, setSkip] = useState(true);
  const [mainLoading, setMainLoading] = useState(true);
  const [metaId, setMetaId] = useState<number>();
  const [chatProfiles, setChatProfiles] = useState<ChatMeta[]>();
  const [receiverId, setReceiverId] = useState<number>();
  const [activeChatId, setActiveChatId] = useState<number>();
  const [receiverProfile, setReceiverProfile] = useState<User>();
  const [senderProfile, setSenderProfile] = useState<User>();

  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.meta_id) {
      try {
        let metaId = parseInt(router.query.meta_id as string);
        if (isNaN(metaId)) {
          throw new Error("Invalid Meta Id");
        }
        setMetaId(metaId);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [router.query]);

  const { data, loading } = useGetUserChatMetasQuery();

  useEffect(() => {
    if (data?.getUserChatMetas && !loading) {
      setChatProfiles(data?.getUserChatMetas);
      setMainLoading(false);
    }
  }, [data, loading]);

  useEffect(() => {
    if (chatProfiles && chatProfiles.length > 0) {
      setReceiverId(chatProfiles[0].receiver?.id!);
      setActiveChatId(chatProfiles[0].id!);
      setReceiverProfile(chatProfiles[0].receiver!);
      setSenderProfile(chatProfiles[0].sender!);
    }
  }, [chatProfiles]);

  return (
    <>
      <CustomHead title="Account - Chats" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="chats-main-wrapper">
              {chatProfiles?.length === 0 ? (
                <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                  {role === 2 ? (
                    <div className="h-100 w-100 d-flex align-items-center justify-content-center flex-column">
                      <h6>No Chats Yet.</h6>
                      <div>
                        <small>
                          Once you have trips and bookings,chats will be
                          activated.
                        </small>
                      </div>
                    </div>
                  ) : (
                    <div className="h-100 w-100 d-flex align-items-center justify-content-center flex-column">
                      <h6>No Chats Yet.</h6>
                      <div>
                        <small>
                          Once you have trips,chats will be activated.
                        </small>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="chats-wrapper">
                  <div className="chats-left">
                    <div className="chat-top p-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search chat user..."
                      />
                    </div>
                    <div className="chat-user-profiles">
                      <div className="chat-sm-top" />
                      {chatProfiles?.map((cProfile) => (
                        <ChatUserProfile
                          key={cProfile.id}
                          data={cProfile}
                          setActiveChatId={setActiveChatId}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="chat-messages-lg-wrapper">
                    <Messages
                      // senderId={userId!}
                      chatMetaId={metaId}
                      receiverId={receiverId}
                      activeChatId={activeChatId!}
                      senderProfile={senderProfile}
                      receiverProfile={receiverProfile}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Chats;
