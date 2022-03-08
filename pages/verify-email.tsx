import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LoginWithModal from "../components/Auth/LoginWithModal";
import { CustomHead } from "../components/CustomHead";
import { useUserId } from "../components/Hooks/useUserId";
import Layout from "../components/Layouts/Layout";
import { Loading } from "../components/Loading";
import { ToastWrapper } from "../components/Toast/ToastWrapper";
import {
  useEmailVerifyMutation,
  useResendEmailVerifyLinkLazyQuery,
} from "../graphql_types/generated/graphql";
import { useAppSelector } from "../redux/hooks";

export interface ResetPasswordProps {}

function VerifyEmail(props: ResetPasswordProps) {
  const [mainLoading, setMainLoading] = useState(true);
  const router = useRouter();
  const token = useAppSelector((state) => state.auth._id);
  const userId = useUserId(token);
  const [verifyEmail, { loading }] = useEmailVerifyMutation();
  const [error, setError] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [resendEmailVerifyLink, { data, loading: resendingVerifyLink }] =
    useResendEmailVerifyLinkLazyQuery();

  //   console.log("data :>> ", data);

  useEffect(() => {
    const _verifyEmail = async () => {
      if (router.query && router.query.token) {
        let verifyToken = router.query.token;
        try {
          const response = await verifyEmail({
            variables: { token: verifyToken as string },
          });
          // console.log("response :>> ", response);
          if (response.data?.verifyEmail.userId) {
            setToastMessage("Email verified successfully!");
            setShowSuccessToast(true);
            if (response.data.verifyEmail.role === 3) {
              await router.replace("/root");
            } else {
              if (userId === response.data?.verifyEmail.userId) {
                await router.replace("/account");
              } else {
                await router.replace("/login");
              }
            }
          } else {
            setError(true);
          }
          setMainLoading(false);
        } catch (error) {
          console.log("error :>> ", error);
        }
      }
    };
    _verifyEmail();
  }, [router]);

  useEffect(() => {
    if (data) {
      if (data?.resendVerifyEmailLink) {
        setToastMessage("Verify link has been sent to your inbox!");
        setShowSuccessToast(true);
      } else {
        console.log("Error :>> ");
      }
    }
  }, [data]);

  const handleRequestVerifyLinkClick = async () => {
    try {
      resendEmailVerifyLink();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <CustomHead title="Verify Email" />
      <Layout>
        {error && (
          <div className="my-5 p-2">
            <div className="col-md-8 mx-auto bg-dark text-light text-center">
              <small className="m-0">
                {" "}
                We are having issues verifying your account. Request another
                verify link
                {token && userId ? (
                  <button
                    className="btn mt-0 pt-0 pl-0 ml-0 text-light"
                    style={{ fontSize: "inherit", textDecoration: "underline" }}
                    onClick={handleRequestVerifyLinkClick}
                  >
                    here
                  </button>
                ) : (
                  <LoginWithModal>
                    <button
                      className="btn mt-0 pt-0 pl-0 ml-0 text-light"
                      style={{
                        fontSize: "inherit",
                        textDecoration: "underline",
                      }}
                    >
                      here
                    </button>
                  </LoginWithModal>
                )}
              </small>
            </div>
          </div>
        )}

        {showSuccessToast && (
          <ToastWrapper
            setShow={setShowSuccessToast}
            show={showSuccessToast}
            message={toastMessage}
            position="bottom-end"
            bg="success"
          />
        )}
        {mainLoading && <Loading />}
      </Layout>
    </div>
  );
}

export default VerifyEmail;
