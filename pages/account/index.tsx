import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
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
    fetchPolicy: "no-cache",
  });
  const [user, setUser] = useState<User>();
  const [hasCompleteProfile, setHasCompleteProfile] = useState(true);
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [isToCar, setIsToCar] = useState<boolean>();
  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.to_car) {
      if (role === 2) {
        setIsToCar(true);
      }
    }
  }, [router.query, role]);

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
            // user?.user_name &&
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
            // user?.user_name &&
            user?.first_name &&
            user?.last_name
            // &&
            // user?.business_name
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
      <CustomHead title="Account" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="p-2">
              <h1>Hi {user?.first_name ? user.first_name : "there"},</h1>
              {hasCompleteProfile ? (
                <></>
              ) : (
                <>
                  <small>Let's get you started.</small>
                  <div>
                    <Link
                      href={{
                        pathname: "/account/personal-details",
                        query: { initial: true },
                      }}
                    >
                      <a>
                        <small className="colorOrange">
                          Complete Your Profile
                        </small>
                      </a>
                    </Link>
                  </div>
                </>
              )}
              {isToCar && (
                <>
                  <small>List your first car.</small>
                  <div>
                    <Link
                      href={{
                        pathname: "/account/listings",
                      }}
                    >
                      <a>
                        <small className="colorOrange">Go to list car</small>
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
