import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import { useRole } from "../../components/hooks/useRole";
import AccountLayout from "../../components/layouts/AccountLayout";
import { Loading } from "../../components/Loading";
import { useAppSelector } from "../../redux/hooks";
// import { Link, Route } from "react-router-dom";

interface IProps {}

const Account: FC<IProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  // const { data, loading } = useGetAuthUserQuery({
  //   fetchPolicy: "no-cache",
  // });
  // const [user, setUser] = useState<User>();
  const [hasCompleteProfile, setHasCompleteProfile] = useState(true);
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [isToCar, setIsToCar] = useState<boolean>();
  const router = useRouter();
  // const [
  //   resendEmailVerifyLink,
  //   { data: resendVerifyLinkData, loading: resendingVerifyLink },
  // ] = useResendEmailVerifyLinkLazyQuery();
  // const [showSuccessToast, setShowSuccessToast] = useState(false);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (router.query && router.query.to_car) {
      if (role === 2) {
        setIsToCar(true);
      }
    }
  }, [router.query, role]);

  // useEffect(() => {
  //   if (data?.getUser.user) {
  //     setUser(data.getUser?.user);
  //   }
  // }, [data]);

  useEffect(() => {
    try {
      // if (!loading) {
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
      // }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [user]);

  // useEffect(() => {
  //   if (resendVerifyLinkData) {
  //     if (resendVerifyLinkData?.resendVerifyEmailLink) {
  //       setShowSuccessToast(true);
  //     } else {
  //       console.log("Error :>> ");
  //     }
  //   }
  // }, [resendVerifyLinkData]);

  // const handleRequestVerifyLinkClick = async () => {
  //   try {
  //     resendEmailVerifyLink();
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };

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
            <div className="p-2 my-4">
              {/* {user && !user?.email_verified && (
                <div className="bg-danger text-light text-center mb-3">
                  <small className="m-0">
                    {" "}
                    Please verify your email. A link was sent to your inbox to
                    verify the email. Didn't receive it? Request another link
                    <button
                      className="btn mt-0 pt-0 pl-0 ml-0 text-light"
                      style={{
                        fontSize: "inherit",
                        textDecoration: "underline",
                      }}
                      onClick={handleRequestVerifyLinkClick}
                    >
                      here
                    </button>
                  </small>
                </div>
              )} */}

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
