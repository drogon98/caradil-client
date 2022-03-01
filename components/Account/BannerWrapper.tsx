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
  ] = useResendEmailVerifyLinkLazyQuery();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isChatPage, setIsChatPage] = useState(false);

  useEffect(() => {
    if (router.pathname.includes("/chats")) {
      setIsChatPage(true);
    } else {
      setIsChatPage(false);
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
        setShowSuccessToast(true);
      } else {
        console.log("Error :>> ");
      }
    }
  }, [resendVerifyLinkData]);

  const handleRequestVerifyLinkClick = async () => {
    try {
      resendEmailVerifyLink();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    if (emailNotVerified) {
      setBannerMessage(
        <>
          <span>
            Please verify your email. A link was sent to your inbox to verify
            the email. Didn't receive it? Request another link
          </span>
          &nbsp;
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
        </>
      );
      setLoading(false);
      return;
    }

    if (profileNotComplete) {
      setBannerMessage(
        <>
          <span>
            It seems you have not completed your profile yet. Please complete
            your profile
          </span>
          &nbsp;
          <Link href="/account/profile">
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
        </>
      );
      setLoading(false);
      return;
    }
    setLoading(false);
  }, [emailNotVerified, profileNotComplete]);

  return (
    <div>
      {showSuccessToast && (
        <ToastWrapper
          setShow={setShowSuccessToast}
          show={showSuccessToast}
          message={toastMessage}
          position="bottom-end"
        />
      )}
      {!loading && user && (
        <>
          {(emailNotVerified || profileNotComplete) && (
            <div
              className={`bg-${bannerBg} py-2 px-2 d-flex align-items-center justify-content-between account-banner ${
                isChatPage && `account-banner-fixed`
              }`}
            >
              <div className="d-flex align-items-center">
                <p
                  style={{ fontSize: "12px" }}
                  className="text-light text-center m-0 d-flex align-items-center"
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
