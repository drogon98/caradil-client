import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import AccountLayout from "../../components/Layouts/AccountLayout";
import { Loading } from "../../components/Loading";
import {
  Notification,
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
} from "../../graphql_types/generated/graphql";

interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>();
  const [hasUnreads, setHasUnreads] = useState(false);
  const [markAllRead, { loading: markingRead }] =
    useMarkAllNotificationsReadMutation();
  const { data, loading } = useGetNotificationsQuery({
    variables: { type: "all" },
  });

  useEffect(() => {
    if (data?.getNotifications && !loading) {
      setMainLoading(false);
      setNotifications(data?.getNotifications);
    }
  }, [data, loading]);

  useEffect(() => {
    if (notifications) {
      let hasUnread = notifications.some((nT) => !nT.read);
      if (hasUnread) {
        setHasUnreads(true);
      } else {
        setHasUnreads(false);
      }
    }
  }, [notifications]);

  const handleMarkAllReadClick = async (
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      let response = await markAllRead();
      if (response.data?.markAllRead) {
        let tempNotifications = notifications?.map((nT) => {
          let tempNt = { ...nT, read: true };
          return tempNt;
        });
        setNotifications([...(tempNotifications ?? [])]);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <>
      <CustomHead title="Account - Notifications" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : notifications?.length === 0 ? (
            <div className="notifications-main-wrapper w-100 d-flex align-items-center justify-content-center flex-column">
              <h6>You have no notifications yet!</h6>
            </div>
          ) : (
            <div className="p-2 my-4">
              <div className="col-md-8 col-lg-7 mx-auto">
                <div className="d-flex justify-content-between mb-3">
                  <h2>Notifications</h2>
                  <div>
                    {hasUnreads && (
                      <button className="btn" onClick={handleMarkAllReadClick}>
                        Mark all as read
                      </button>
                    )}
                  </div>
                </div>

                {notifications?.map((notification) => (
                  <div className="notification-box shadow mb-4 px-2">
                    <div className="notification-content-wrapper py-3 h-100">
                      <p className="m-0">{notification.message}</p>
                      <p className="mt-3">
                        <small>
                          {new Date(
                            notification.created_at
                          ).toLocaleDateString()}
                        </small>
                      </p>
                    </div>
                    <div className="notification-read-unread-bubble-wrapper h-100 py-3 d-flex justify-content-center">
                      <span
                        className={
                          notification.read
                            ? `notification-read-bubble`
                            : `notification-unread-bubble`
                        }
                      ></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Notifications;
