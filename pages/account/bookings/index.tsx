import Head from "next/head";
import React, { ReactElement, useEffect, useState } from "react";
import BookBox from "../../../components/Account/Bookings/BookBox";
import SmBookBox from "../../../components/Account/Bookings/SmBookBox";
import { AuthWrapper } from "../../../components/AuthWrapper";
import { CustomHead } from "../../../components/CustomHead";
import AccountLayout from "../../../components/layouts/AccountLayout";
import { Loading } from "../../../components/Loading";
import {
  Trip,
  useGetMyBookingsQuery,
} from "../../../graphql_types/generated/graphql";

interface Props {}

export default function index(props: Props): ReactElement {
  const [mainLoading, setMainLoading] = useState(true);
  const { data, loading } = useGetMyBookingsQuery({
    fetchPolicy: "network-only",
  });
  // console.log("data :>> ", data);

  const [bookings, setBookings] = useState<Trip[]>([]);

  useEffect(() => {
    if (data?.getMyBookings) {
      setBookings(data?.getMyBookings);
    }
  }, [data]);

  useEffect(() => {
    if (bookings && !loading) {
      setMainLoading(false);
    }
  }, [bookings, loading]);

  return (
    <>
      <CustomHead title="Account - Bookings" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : bookings && bookings.length > 0 ? (
            <div className="p-2 mt-4">
              <div className="lg-tripboxes-wrapper">
                <div className="container">
                  <h3>Bookings</h3>
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
                {bookings.map((trip) => (
                  <BookBox key={trip.id} data={trip} />
                ))}
              </div>
              <div className="sm-tripboxes-wrapper">
                {bookings.map((trip) => (
                  <SmBookBox key={trip.id} data={trip} />
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
              <h6>You have no bookings yet!</h6>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
}
