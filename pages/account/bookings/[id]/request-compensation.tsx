import React, { FC, useState } from "react";
import { AuthWrapper } from "../../../../components/AuthWrapper";
import { CustomHead } from "../../../../components/CustomHead";
import AccountLayout from "../../../../components/layouts/AccountLayout";
import { Loading } from "../../../../components/Loading";

interface RequestCompesationProps {}

const RequestCompesation: FC<RequestCompesationProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);

  return (
    <>
      <CustomHead title="Account - Request Compensation" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? <Loading /> : <div className="p-2 my-4"></div>}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default RequestCompesation;
