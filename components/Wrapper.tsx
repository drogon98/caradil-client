import React, { FC, useEffect } from "react";
import {
  OnNotificationDocument,
  useGetNotificationsLazyQuery,
} from "../graphql_types/generated/graphql";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateNotifications } from "../redux/notificationSlice";
import { useRole } from "./hooks/useRole";
import { useUserId } from "./hooks/useUserId";

interface WrapperProps {}

export const Wrapper: FC<WrapperProps> = (props) => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const userId = useUserId(token);
  const dispatch = useAppDispatch();
  const [
    getNotifications,
    {
      data: notificationsData,
      loading: loadingNotifcations,
      subscribeToMore: notificationsSubscribeToMore,
    },
  ] = useGetNotificationsLazyQuery();

  useEffect(() => {
    if (token && role && userId) {
      getNotifications({ variables: { type: "unread" } });
    }
  }, [token, role, userId]);

  // useEffect(() => {
  //   let notifsSub: { (): void; (): void } | null = null;
  //   if (notificationsSubscribeToMore) {
  //     notifsSub = notificationsSubscribeToMore({
  //       document: OnNotificationDocument,
  //       // variables: { chatMetaId: props.chatMetaId },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
  //         const newNotification: any = { ...subscriptionData.data };

  //         console.log("newNotification :>> ", newNotification);
  //         return {
  //           getNotifications: [...prev.getNotifications, newNotification],
  //         };
  //       },
  //     });
  //   }

  //   return () => {
  //     if (notifsSub) {
  //       notifsSub();
  //     }
  //   };
  // }, [notificationsSubscribeToMore]);

  useEffect(() => {
    if (notificationsData) {
      let tempNotifs = notificationsData.getNotifications;
      dispatch(updateNotifications([...tempNotifs]));
    }
  }, [notificationsData]);

  return <>{props.children}</>;
};
