import Head from "next/head";
import React, { FC } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { ComingSoon } from "../../components/ComingSoon";
import { useRole } from "../../components/hooks/useRole";
import AccountLayout from "../../components/layouts/AccountLayout";
import { useAppSelector } from "../../redux/hooks";

interface IProps {}

/**
 * @author
 * @function @Chats
 **/

const Chats: FC<IProps> = (props) => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthWrapper>
        <AccountLayout>
          {/* <h3>Your chats</h3> */}

          <ComingSoon
            title={`This module will enable real-time communication between you and ${
              role === 1 ? "host" : "clients"
            }  during a trip.`}
          />
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Chats;
