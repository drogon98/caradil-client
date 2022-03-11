import React, { FC } from "react";
import { AuthWrapper } from "../../../components/AuthWrapper";
import { CustomHead } from "../../../components/CustomHead";
import AccountLayout from "../../../components/layouts/AccountLayout";

interface UpgradeAccountProps {}

const UpgradeAccount: FC<UpgradeAccountProps> = (props) => {
  return (
    <>
      <CustomHead title="Account - Upgrade" />
      <AuthWrapper>
        <AccountLayout>
          <div className="p-2 my-4">
            <div className="col-md-8 col-lg-7 mx-auto">
              <h3>Upgrade Account</h3>
            </div>
          </div>
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default UpgradeAccount;
