import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactChild, ReactNode, useEffect, useState } from "react";
import { useResendEmailVerifyLinkLazyQuery } from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../hooks/useRole";
import { Loading } from "../Loading";
import { ToastWrapper } from "../Toast/ToastWrapper";

export interface BannerWrapperProps {
  children: ReactChild;
}

export function BannerWrapper(props: BannerWrapperProps) {
  const [bannerBg, setBannerBg] = useState("success");
  const [isCancellable, setIsCancellable] = useState(false);
  const token = useAppSelector((state) => state.auth._id);
  const router = useRouter();
  const role = useRole(token);
  const user = useAppSelector((state) => state.user.user);
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const [profileNotComplete, setProfileNotComplete] = useState(false);
  const [bannerMessage, setBannerMessage] = useState<ReactNode>();
  const [loading, setLoading] = useState(true);
  const [
    resendEmailVerifyLink,
    { data: resendVerifyLinkData, loading: resendingVerifyLink },
  ] = useResendEmailVerifyLinkLazyQuery({ fetchPolicy: "no-cache" });
  const [showToast, setShowToast] = useState(false);
  const [toastBg, setToastBg] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [isChatPage, setIsChatPage] = useState(false);
  const [isProfilePage, setIsProfilePage] = useState(false);

  useEffect(() => {
    if (router.pathname.includes("/chats")) {
      setIsChatPage(true);
    } else {
      setIsChatPage(false);
    }

    if (router.pathname.includes("/account/profile")) {
      setIsProfilePage(true);
    } else {
      setIsProfilePage(false);
    }
  }, [router]);

  useEffect(() => {
    try {
      if (user) {
        if (!user.email_verified) {
          setEmailNotVerified(true);
        } else {
          setEmailNotVerified(false);
        }
        if (role === 1) {
          if (user?.phone && user?.first_name && user?.last_name) {
            setProfileNotComplete(false);
          } else {
            setProfileNotComplete(true);
          }
        } else if (role === 2) {
          if (user?.phone && user?.first_name && user?.last_name) {
            setProfileNotComplete(false);
          } else {
            setProfileNotComplete(true);
          }
        }
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [user]);

  useEffect(() => {
    if (resendVerifyLinkData) {
      if (resendVerifyLinkData?.resendVerifyEmailLink) {
        setToastMessage("Verify link successfully sent to your inbox!");
        setToastBg("success");
        setShowToast(true);
      } else {
        setToastMessage("Could not send email. Try again later!");
        setToastBg("danger");
        setShowToast(true);
      }
    }
  }, [resendVerifyLinkData]);

  const handleRequestVerifyLinkClick = () => {
    // console.log("Helloo");
    // try {
    resendEmailVerifyLink();
    // } catch (error) {
    //   console.log("error :>> ", error);
    // }
  };

  useEffect(() => {
    if (emailNotVerified) {
      setBannerMessage(
        <>
          <span>
            Please verify your email. A link was sent to your inbox to verify
            the email. Didn't receive it? Request another link &nbsp;
            <span
              className="ext-light cursor-pointer"
              style={{
                fontSize: "inherit",
                textDecoration: "underline",
              }}
              onClick={handleRequestVerifyLinkClick}
            >
              here
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {resendingVerifyLink && (
              <div className="d-inline justify-content-center">
                <div
                  className={`spinner-border spinner-white}`}
                  role="status"
                  style={{ height: "11px", width: "11px" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </span>
        </>
      );
      setLoading(false);
      return;
    }

    if (profileNotComplete && !isProfilePage) {
      setBannerMessage(
        <>
          <span>
            It seems you have not completed your profile yet. Please complete
            your profile &nbsp;
            <Link
              href={{ pathname: "/account/profile", query: { initial: true } }}
            >
              <a
                className="text-light cursor-pointer"
                style={{
                  fontSize: "inherit",
                  textDecoration: "underline",
                }}
              >
                here
              </a>
            </Link>
          </span>
        </>
      );
      setLoading(false);
      return;
    }
    setLoading(false);
  }, [
    emailNotVerified,
    profileNotComplete,
    resendVerifyLinkData,
    isProfilePage,
  ]);

  return (
    <div>
      {showToast && (
        <ToastWrapper
          setShow={setShowToast}
          show={showToast}
          message={toastMessage}
          position="bottom-end"
          bg={toastBg}
        />
      )}
      {!loading && user && (
        <>
          {(emailNotVerified || profileNotComplete) && bannerMessage && (
            <div
              className={`bg-${bannerBg} py-2 px-2 d-flex align-items-center justify-content-between account-banner ${
                isChatPage && `account-banner-fixed`
              }`}
              role="alert"
            >
              <div className="d-flex align-items-center">
                <p
                  style={{ fontSize: "12px" }}
                  className="text-light m-0 d-flex align-items-center"
                >
                  {bannerMessage}
                </p>
              </div>

              <div>
                {isCancellable && (
                  <button className="btn m-0 p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {loading ? <Loading /> : props.children}
    </div>
  );
}
