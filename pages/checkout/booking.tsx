import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/layouts/Layout";
import { Loading } from "../../components/Loading";
import { useCreateTripMutation } from "../../graphql_types/generated/graphql";

interface BookingProps {}

function Booking(props: BookingProps) {
  const [mainLoading, setMainLoading] = useState(true);
  const [createTrip, { loading }] = useCreateTripMutation();
  const router = useRouter();
  const [error, setError] = useState("");

  console.log("router.query", router.query);

  useEffect(() => {
    const _createTrip = async () => {
      if (router.query.id) {
        try {
          const paymentStatus = router.query.status as string;
          if (paymentStatus === "aei7p7yrx4ae34") {
            // Only when book trip payment is a success
            const rawString3 = router.query.p3 as string;
            const rawString3Sections = rawString3.split(" ");
            let start_time: string;
            let delivery_distance: string;
            if (rawString3Sections.length > 1) {
              start_time = rawString3Sections[0];
              delivery_distance = rawString3Sections[1];
            } else {
              start_time = rawString3Sections[0];
              delivery_distance = "";
            }
            let delivery_location = localStorage.getItem("delivery_location");
            // const rawString = router.query.p4 as string;
            // console.log("rawString", rawString);
            // const [end_time, car_id] = rawString.split(" ");

            // console.log("car_id", car_id);

            let car_id = localStorage.getItem("bc_id") ?? "";

            console.log("car_id", car_id);

            const response = await createTrip({
              variables: {
                input: {
                  start_date: parseInt(router.query.p1 as string, 10),
                  end_date: parseInt(router.query.p2 as string, 10),
                  start_time: start_time,
                  end_time: router.query.p4 as string,
                  delivery_distance,
                  delivery_location: delivery_location!,
                  car_id,
                  transaction_status: router.query.status as string,
                  transaction_channel: router.query.channel as string,
                  transaction_amount: router.query.mc as string,
                  transaction_invoice_no: router.query.ivm as string,
                  transaction_order_id: router.query.id as string,
                  transaction_code: router.query.txncd as string,
                },
              },
            });

            if (response.data?.createTrip.success) {
              // setMainLoading(false);
              localStorage.removeItem("delivery_location");
              localStorage.removeItem("bc_id");
              router.replace({
                pathname: "/checkout/success",
                query: {
                  trip_id: response.data?.createTrip.tripId!,
                },
              });
            } else {
              throw new Error("");
            }
          }
        } catch (error) {
          setError("Something wrong");
        }
      }
    };
    _createTrip();
  }, [router.query]);

  // console.log(`router`, router);
  return (
    <>
      <CustomHead title="Account - Bookings" />
      <AuthWrapper>
        <Layout>{mainLoading && <Loading />}</Layout>
      </AuthWrapper>
    </>
  );
}

export default Booking;
