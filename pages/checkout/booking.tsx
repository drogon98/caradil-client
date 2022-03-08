import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/Layouts/Layout";
import { Loading } from "../../components/Loading";
import { useCreateTripMutation } from "../../graphql_types/generated/graphql";

interface BookingProps {}

function Booking(props: BookingProps) {
  const [mainLoading, setMainLoading] = useState(true);
  const [createTrip, { loading }] = useCreateTripMutation();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const _createTrip = async () => {
      if (router.query.id) {
        try {
          const paymentStatus = router.query.status as string;
          if (paymentStatus === "aei7p7yrx4ae34") {
            // Only when book trip payment is a success
            const rawString1 = router.query.p2 as string;
            const rawString1Sections = rawString1.split(" ");
            let start_time: string;
            let delivery_distance: string;
            if (rawString1Sections.length > 1) {
              start_time = rawString1Sections[0];
              delivery_distance = rawString1Sections[1];
            } else {
              start_time = rawString1Sections[0];
              delivery_distance = "";
            }
            let delivery_location = localStorage.getItem("delivery_location");
            const rawString = router.query.p4 as string;
            const [end_time, car_id] = rawString.split(" ");

            let car_id_temp = parseInt(car_id, 10);
            const response = await createTrip({
              variables: {
                input: {
                  start_date: parseInt(router.query.p1 as string, 10),
                  end_date: parseInt(router.query.p3 as string, 10),
                  start_time: start_time,
                  end_time,
                  delivery_distance,
                  delivery_location: delivery_location!,
                  car_id: car_id_temp,
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
