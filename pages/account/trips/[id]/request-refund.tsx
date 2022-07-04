import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
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

  useEffect(() => {
    const doSomething = async () => {
      if (router.query) {
        let token = router.query?.token as string;
        if (token) {
          try {
            let response = await refundOrCompensate({ variables: { token } });
            console.log("response", response);
            // Make request here
          } catch (error) {
            console.log("error :>> ", error);
          }
        }
      }
    };
    doSomething();
  }, [router]);

  return (
    <>
      <CustomHead title="Account - Request Refund" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? <Loading /> : <div className="p-2 my-4"></div>}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default RequestRefund;
