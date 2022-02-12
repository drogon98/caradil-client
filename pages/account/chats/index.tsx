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

  // console.log("metaId", metaId);

  const { data, loading } = useGetUserChatMetasQuery({
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    let _afterData = async () => {
      if (data?.getUserChatMetas && !loading) {
        setChatProfiles(data?.getUserChatMetas);
        if (!metaId) {
          let _id = data.getUserChatMetas[0].id!;
          setActiveChatId(_id);

          await router.push(
            {
              pathname: `/account/chats`,
              query: {
                meta_id: _id,
              },
            },
            `/account/chats/?meta_id=${_id}`,
            { shallow: true }
          );
        } else {
          setActiveChatId(metaId);
        }
        setMainLoading(false);
      }
    };
    _afterData();
  }, [data, loading, metaId]);

  useEffect(() => {
    if (metaId) {
      setActiveChatId(metaId);
    }
  }, [metaId]);

  useEffect(() => {
    if (chatProfiles && chatProfiles.length > 0) {
      if (metaId) {
        setActiveChatId(metaId);
      } else {
        setActiveChatId(chatProfiles[0].id!);
      }
    }
  }, [chatProfiles, metaId]);

  useEffect(() => {
    if (metaId && chatProfiles) {
      let tempProf;

      if (metaId) {
        tempProf = chatProfiles.filter((cP) => cP.id === metaId);
      } else if (activeChatId) {
        tempProf = chatProfiles.filter((cP) => cP.id === activeChatId);
      }

      if (tempProf) {
        setReceiverId(tempProf[0]?.receiver?.id!);
        setReceiverProfile(tempProf[0]?.receiver!);
        setSenderProfile(tempProf[0].sender!);
      }
    }
  }, [metaId, activeChatId, chatProfiles]);

  // useEffect(() => {
  //   if (activeChatId && chatProfiles) {
  //     let tempProf = chatProfiles.filter((cP) => cP.id === activeChatId);
  //     if (tempProf) {
  //       // console.log("tempProf :>> ", tempProf);
  //       setReceiverProfile(tempProf[0]?.receiver!);
  //       setReceiverId(tempProf[0]?.receiver?.id!);
  //     }
  //   }
  // }, [activeChatId, chatProfiles]);

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
