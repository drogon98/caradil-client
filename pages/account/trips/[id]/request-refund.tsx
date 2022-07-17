import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { AuthWrapper } from "../../../../components/AuthWrapper";
import { CustomHead } from "../../../../components/CustomHead";
import AccountLayout from "../../../../components/layouts/AccountLayout";
import { Loading } from "../../../../components/Loading";
import { useRefundOrCompensateMutation } from "../../../../graphql_types/generated/graphql";

interface RequestRefundProps {}

const RequestRefund: FC<RequestRefundProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  const router = useRouter();
  const [refundOrCompensate, { loading }] = useRefundOrCompensateMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState<
    "primary" | "success" | "danger"
  >();
  const [alertMessage, setAlertMessage] = useState("");
  const [token, setToken] = useState("");

  useLayoutEffect(() => {
    if (router.asPath.includes("?token")) {
      const routePartWithToken = router.asPath.split("?")[1];
      const params = new URLSearchParams(routePartWithToken);
      let tempToken = params.get("token") ?? "";
      if (tempToken) {
        setToken(tempToken);
      }
    }
  }, [router]);

  useEffect(() => {
    const doSomething = async () => {
      if (token) {
        try {
          let response = await refundOrCompensate({ variables: { token } });

          if (response.data?.refundOrCompensate) {
            // Show the success
            setAlertVariant("success");
            setAlertMessage(
              "Refund request received successfully! We will send back your money shortly through the channel you used to make the payment."
            );
            setShowAlert(true);
          } else {
            // Show the error
            setAlertVariant("danger");
            setAlertMessage("Error sending refund request!");
            setShowAlert(true);
          }
        } catch (error) {
          console.log("error :>> ", error);
        } finally {
          setMainLoading(false);
        }
      }
    };
    doSomething();
  }, [token]);

  return (
    <>
      <CustomHead title="Account - Request Refund" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading || loading ? (
            <Loading />
          ) : (
            <div className="p-2 my-4">
              {showAlert ? (
                <div className="col-md-8 col-lg-6 mx-auto">
                  <Alert variant={alertVariant}>
                    <div>{alertMessage}</div>
                    {/* <Link href="/account">Go back to dashboard</Link> */}
                  </Alert>
                </div>
              ) : null}
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default RequestRefund;
