import Head from "next/head";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { useRole } from "../../components/hooks/useRole";
import AccountLayout from "../../components/layouts/AccountLayout";
import { Loading } from "../../components/Loading";
import {
  useGetAuthUserQuery,
  User,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
// import { Link, Route } from "react-router-dom";

interface IProps {}

/**
 * @author
 * @function @Account
 **/

const Account: FC<IProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  const { data, loading } = useGetAuthUserQuery({
    fetchPolicy: "network-only",
  });
  const [user, setUser] = useState<User>();
  const [hasCompleteProfile, setHasCompleteProfile] = useState(true);
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);

  useEffect(() => {
    if (data?.getUser.user) {
      setUser(data.getUser?.user);
    }
  }, [data]);

  useEffect(() => {
    try {
      if (!loading) {
        if (role === 1) {
          if (
            user?.phone &&
            user?.user_name &&
            user?.first_name &&
            user?.last_name
          ) {
            setHasCompleteProfile(true);
          } else {
            setHasCompleteProfile(false);
          }
        } else if (role === 2) {
          if (
            user?.phone &&
            user?.user_name &&
            user?.first_name &&
            user?.last_name &&
            user?.business_name
          ) {
            setHasCompleteProfile(true);
          } else {
            setHasCompleteProfile(false);
          }
        }

        setMainLoading(false);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [user, loading]);

  // console.log("user :>> ", user);
  // console.log("hasCompleteProfile :>> ", hasCompleteProfile);

  // console.log("data :>> ", data);
  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="p-2">
              <h1>Hi there,</h1>
              {hasCompleteProfile ? (
                <></>
              ) : (
                <>
                  <small>Let's get you started.</small>
                  <div>
                    <Link href="/account/personal-details">
                      <a>
                        <small className="colorOrange">
                          Complete Your Profile
                        </small>
                      </a>
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Account;
