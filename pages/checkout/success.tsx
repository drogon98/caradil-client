import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/layouts/Layout";
import { Loading } from "../../components/Loading";
import { Trip, useGetTripQuery } from "../../graphql_types/generated/graphql";

const CheckoutSuccess: NextPage = () => {
  const [mainLoading, setMainLoading] = useState(true);
  const router = useRouter();
  const [skip, setSkip] = useState(true);
  const [tripId, setTripId] = useState<number>();
  const [trip, setTrip] = useState<Trip>();

  useEffect(() => {
    if (router.query.trip_id) {
      try {
        const tempId = parseInt(router.query.trip_id as string, 10);
        if (isNaN(tempId)) {
          throw new Error("Invalid trip id");
        }
        setTripId(tempId);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (tripId) {
      setSkip(false);
    }
  }, [tripId]);

  const { data, loading } = useGetTripQuery({
    variables: { tripId: tripId! },
    skip,
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (!loading && data?.getTrip.trip?.id) {
      setTrip(data?.getTrip.trip);
      setMainLoading(false);
    }
  }, [loading, data]);

  // console.log("trip :>> ", trip);
  // console.log("loading :>> ", loading);

  return (
    <>
      <CustomHead title="Checkout Success" />
      <AuthWrapper>
        <Layout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="customContainer mt-4 mb-5">
              <div className="row">
                <div className="col-md-7 mx-auto">
                  <h3>We've got it</h3>

                  <p>
                    Your reservation has been received. The host has received it
                    and will reach back to you with confirmation and more
                    details. You can track your reservation status{" "}
                    <Link href="/account/trips">
                      <a className="colorOrange">here</a>
                    </Link>
                    .
                  </p>

                  <h5 className="mt-4">Reservation Details</h5>
                  <div className="container p-0">
                    <div className="row m-0 p-0">
                      <div className="col-md-6">
                        <img
                          src={
                            trip?.car?.photos?.[0].secure_url
                              ? trip?.car?.photos?.[0].secure_url
                              : "/images/subaru.jpg"
                          }
                          className="success-car-image"
                        />
                      </div>
                      <div className="col-md-6">
                        <h5>{trip?.car?.name}</h5>
                        <p>Transmission:{trip?.car?.transmission}</p>
                        <p>Seats:{trip?.car?.seats}</p>
                        <p>Doors:{trip?.car?.doors}</p>
                        <p>
                          Daily Rate:Ksh.
                          {trip?.car?.daily_rate?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="container p-0">
                    <div className="row m-0">
                      <div className="col-6 p-0">
                        <p>Total:</p>
                      </div>
                      <div className="col-6 d-flex justify-content-end">
                        <p className="fw-bold">
                          Ksh.
                          {parseFloat(
                            trip?.transaction.amount!
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-6 p-0">
                        <p>Payment Channel:</p>
                      </div>
                      <div className="col-6 d-flex justify-content-end">
                        <p className="fw-bold">{trip?.transaction.channel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Layout>
      </AuthWrapper>
    </>
  );
};

export default CheckoutSuccess;
