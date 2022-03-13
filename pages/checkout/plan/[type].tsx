import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AuthWrapper } from "../../../components/AuthWrapper";
import { CustomHead } from "../../../components/CustomHead";
import Layout from "../../../components/layouts/Layout";
import { Loading } from "../../../components/Loading";
import { useUpgradeRenewPlanMutation } from "../../../graphql_types/generated/graphql";

interface BookingProps {}

function ProcessingPlanPayment(props: BookingProps) {
  const [mainLoading, setMainLoading] = useState(true);
  //   const [createTrip, { loading }] = useCreateTripMutation();
  const router = useRouter();
  const [error, setError] = useState("");
  const [upgradeRenewPlan, { data, loading }] = useUpgradeRenewPlanMutation();

  useEffect(() => {
    const _upgradeRenewTrip = async () => {
      try {
        const paymentStatus = router.query.status as string;
        if (paymentStatus === "aei7p7yrx4ae34") {
          const response = await upgradeRenewPlan({
            variables: {
              input: {
                title: router.query.p1 as string,
                plan_action_type: router.query.p2 as string,
                period: router.query.p3 as string,
                transaction_status: router.query.status as string,
                transaction_channel: router.query.channel as string,
                transaction_amount: router.query.mc as string,
                transaction_invoice_no: router.query.ivm as string,
                transaction_order_id: router.query.id as string,
                transaction_code: router.query.txncd as string,
              },
            },
          });

          if (response.data?.upgradeRenewPlan.success) {
            router.replace({
              pathname: "/account",
            });
          } else {
            throw new Error("");
          }
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    _upgradeRenewTrip();
  }, [router.query]);

  console.log(`router`, router);

  return (
    <>
      <CustomHead title="Account - Bookings" />
      <AuthWrapper>
        <Layout>{mainLoading && <Loading />}</Layout>
      </AuthWrapper>
    </>
  );
}

export default ProcessingPlanPayment;
