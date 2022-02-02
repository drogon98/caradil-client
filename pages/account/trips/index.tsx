import Head from "next/head";
import React, { FC, useEffect, useState } from "react";
import { SmTripBox } from "../../../components/Account/Trips/SmTripBox";
import { TripBox } from "../../../components/Account/Trips/TripBox";
import { AuthWrapper } from "../../../components/AuthWrapper";
import { CustomHead } from "../../../components/CustomHead";
import AccountLayout from "../../../components/layouts/AccountLayout";
import { Loading } from "../../../components/Loading";
import {
  Trip,
  useGetMyTripsQuery,
} from "../../../graphql_types/generated/graphql";

interface TripsProps {}

/**
 * @author
 * @function @Trips
 **/

const Trips: FC<TripsProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  const [trips, setTrips] = useState<Trip[]>();

  const { data, loading } = useGetMyTripsQuery();

  useEffect(() => {
    if (data?.getMyTrips) {
      setTrips(data.getMyTrips);
    }
  }, [data]);

  useEffect(() => {
    if (trips && !loading) {
      setMainLoading(false);
    }
  }, [trips]);

  // console.log("data :>> ", data);

  return (
    <>
      <CustomHead title="Account - Trips" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : trips && trips.length > 0 ? (
            <div className="p-2 mt-4">
              <div className="lg-tripboxes-wrapper">
                <div className="container">
                  <h3>Trips</h3>
                  <div className="row">
                    <div className="col">
                      <p className="fw-bold">Info</p>
                    </div>
                    <div className="col-2">
                      <p className="fw-bold">Status</p>
                    </div>
                    {/* <div className="col-1">
                      <p className="fw-bold">Action</p>
                    </div> */}
                  </div>
                </div>
                {trips.map((trip) => (
                  <TripBox key={trip.id} data={trip} />
                ))}
              </div>
              <div className="sm-tripboxes-wrapper">
                {trips.map((trip) => (
                  <SmTripBox key={trip.id} data={trip} />
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                height: "calc(100vh - 70px)",
                top: "70px",
                width: "100%",
              }}
              className="d-flex align-items-center justify-content-center"
            >
              <h6>You have no trips yet!</h6>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Trips;
