import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { ListBox } from "../../../components/Account/Listings/ListBox";
import { SmListBox } from "../../../components/Account/Listings/SmListBox";
import { AuthWrapper } from "../../../components/AuthWrapper";
import { CustomHead } from "../../../components/CustomHead";
import AccountLayout from "../../../components/layouts/AccountLayout";
import { Loading } from "../../../components/Loading";
import {
  Car,
  useGetHostCarsQuery,
} from "../../../graphql_types/generated/graphql";

interface ListingsProps {}

/**
 * @author
 * @function @Listings
 **/

const Listings: FC<ListingsProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  const { data, loading } = useGetHostCarsQuery({
    fetchPolicy: "no-cache",
  });
  // console.log("data :>> ", data);

  const [cars, setCars] = useState<Car[]>();

  useEffect(() => {
    if (data?.getHostCars) {
      setCars(data?.getHostCars);
    }
  }, [data]);

  useEffect(() => {
    if (cars && !loading) {
      setMainLoading(false);
    }
  }, [cars, loading]);

  // console.log("cars :>> ", cars);

  return (
    <>
      <CustomHead title="Account - Listings" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="p-2">
              {cars && cars?.length > 0 ? (
                <div className="pt-lg-3">
                  <div className="container p-0 d-flex justify-content-between m-0">
                    <h3>Cars</h3>

                    <div>
                      <Link href="/account/listings/add-car">
                        <a className="btn bgOrange">Add Car</a>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3 large-screen-listings">
                    <div className="listings-header">
                      <div className="container p-0">
                        <div className="row m-0 align-items-center">
                          <div className="col-1">
                            <p className="fw-bold m-0">Photo</p>
                          </div>
                          <div className="col-2">
                            <p className="fw-bold m-0">Name</p>
                          </div>
                          <div className="col">
                            <p className="fw-bold m-0">Reg No.</p>
                          </div>

                          <div className="col">
                            <p className="fw-bold m-0">Published</p>
                          </div>
                          <div className="col">
                            <p className="fw-bold m-0">Booked</p>
                          </div>
                          <div className="col">
                            <p className="fw-bold m-0">Rate</p>
                          </div>
                          {/* <div className="col-1">
                            <p className="fw-bold m-0">Action</p>
                          </div> */}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      {cars?.map((car) => (
                        <ListBox key={car.id} data={car} />
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 sm-screen-listings">
                    {cars?.map((car) => (
                      <SmListBox key={car.id} data={car} />
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
                  className="d-flex align-items-center justify-content-center flex-column"
                >
                  <div className="mb-4">
                    <h6>You have not added a car.</h6>
                  </div>
                  <div>
                    <Link href="/account/listings/add-car">
                      <a className="btn bgOrange">Add Car</a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Listings;
