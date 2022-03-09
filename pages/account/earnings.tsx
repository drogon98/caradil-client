import React, { FC, useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import AccountLayout from "../../components/layouts/AccountLayout";
import { Loading } from "../../components/Loading";
import {
  Earning,
  useGetEarningsQuery,
} from "../../graphql_types/generated/graphql";

interface EarningsProps {}

const Earnings: FC<EarningsProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  const [earnings, setEarnings] = useState<Earning[]>();

  const { data, loading } = useGetEarningsQuery();

  useEffect(() => {
    if (data?.getEarnings && !loading) {
      setMainLoading(false);
      setEarnings(data?.getEarnings);
    }
  }, [data, loading]);

  return (
    <>
      <CustomHead title="Account - Earnings" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : earnings?.length === 0 ? (
            <div className="earnings-main-wrapper w-100 d-flex align-items-center justify-content-center flex-column">
              <h6>You have no earnings yet!</h6>
            </div>
          ) : (
            <div className="p-2 my-4">
              <div className="col-md-8 col-lg-7 mx-auto">
                <h3>Your Earnings</h3>

                <div></div>
              </div>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Earnings;
