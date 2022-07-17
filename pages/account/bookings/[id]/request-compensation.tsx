import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { AuthWrapper } from "../../../../components/AuthWrapper";
import { CustomHead } from "../../../../components/CustomHead";
import AccountLayout from "../../../../components/layouts/AccountLayout";
import { Loading } from "../../../../components/Loading";
import { useRefundOrCompensateMutation } from "../../../../graphql_types/generated/graphql";

interface RequestCompesationProps {}

const RequestCompesation: FC<RequestCompesationProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  const [refundOrCompensate, { loading }] = useRefundOrCompensateMutation();
  const router = useRouter();
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
              "Compensation request received successfully! Your will receive the money shortly through your payment channel."
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
      <CustomHead title="Account - Request Compensation" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading || loading ? (
            <Loading />
          ) : (
            <div className="p-2 my-4">
              {showAlert ? (
                <Alert variant={alertVariant}>
                  <div>{alertMessage}</div>
                  <Link href="/account">Go back to dashboard</Link>
                </Alert>
              ) : null}
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default RequestCompesation;
