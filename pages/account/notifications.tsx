import React, { FC, useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import AccountLayout from "../../components/layouts/AccountLayout";
import { Loading } from "../../components/Loading";
import {
  Notification,
  useGetNotificationsQuery,
} from "../../graphql_types/generated/graphql";

interface IProps {}

const Notifications: FC<IProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>();

  const { data, loading } = useGetNotificationsQuery();

  useEffect(() => {
    if (data?.getNotifications && !loading) {
      setMainLoading(false);
      setNotifications(data?.getNotifications);
    }
  }, [data, loading]);

  return (
    <>
      <CustomHead title="Account - Notifications" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : notifications?.length === 0 ? (
            <div className="p-2 h-100 w-100 d-flex align-items-center justify-content-center flex-column">
              <h6>You have no notifications yet!</h6>
            </div>
          ) : (
            <div className="p-2">
              <h3>Your Notifications</h3>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Notifications;
