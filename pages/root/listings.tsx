import React, { FC, useEffect, useRef, useState } from "react";
import { Tabs } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import { AdminAuthWrapper } from "../../components/AdminAuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import AdminLayout from "../../components/layouts/AdminLayout";
import FlexibleLoader from "../../components/Loading/FlexibleLoader";
import { AllBox } from "../../components/Root/Listings/AllBox";
import { BeingEditedBox } from "../../components/Root/Listings/BeingEditedBox";
import { EditRequestBox } from "../../components/Root/Listings/EditRequestBox";
import { UnderVerificationBox } from "../../components/Root/Listings/UnderVerificationBox";
import { UnverifiedBox } from "../../components/Root/Listings/UnverifiedBox";
import { VerifiedBox } from "../../components/Root/Listings/VerifiedBox";
import {
  Car,
  useGetAdminCarsLazyQuery,
} from "../../graphql_types/generated/graphql";

interface ListingsProps {}

const Listings: FC<ListingsProps> = (props) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [getCars, { data, loading }] = useGetAdminCarsLazyQuery({
    fetchPolicy: "network-only",
  });
  const [key, setKey] = useState("all");
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (key && topRef && topRef.current) {
      topRef.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }, [key, topRef]);

  useEffect(() => {
    if (key) {
      getCars({ variables: { type_: key } });
    }
  }, [key]);

  // console.log("key :>> ", key);

  useEffect(() => {
    if (data?.getAdminCars) {
      setCars(data.getAdminCars);
    }
  }, [data]);

  // console.log("data :>> ", data);
  // console.log("cars :>> ", cars);
  return (
    <>
      <CustomHead title="Admin - Listings" />
      <AdminAuthWrapper>
        <AdminLayout>
          <div className="admin-listings-container">
            <h3 className="listings-title px-2">Listings</h3>
            <Tabs
              activeKey={key}
              id="noanim-tab-example"
              className="tabs-box px-2"
              onSelect={(k) => setKey(k!)}
            >
              <Tab eventKey="all" title="All" tabClassName="admin-tab">
                {key === "all" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      cars.map((car) => <AllBox key={car.id} data={car} />)
                    )}
                  </div>
                )}
              </Tab>
              <Tab eventKey="live" title="Published" tabClassName="admin-tab">
                {key === "live" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      cars.map((car) => <VerifiedBox key={car.id} data={car} />)
                    )}
                  </div>
                )}
              </Tab>
              {/* <Tab
                eventKey="under-verification"
                title={<b>Under Verification</b>}
                tabClassName="admin-tab"
              >
                {key === "under-verification" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      cars.map((car) => (
                        <UnderVerificationBox key={car.id} data={car} />
                      ))
                    )}
                  </div>
                )}
              </Tab> */}
              {/* <Tab
                eventKey="unverified"
                title="UnVerified"
                tabClassName="admin-tab"
              >
                {key === "unverified" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      cars.map((car) => (
                        <UnverifiedBox key={car.id} data={car} />
                      ))
                    )}
                  </div>
                )}
              </Tab> */}
              {/* <Tab
                eventKey="edit-requests"
                title="Edit Requests"
                tabClassName="admin-tab"
              >
                {key === "edit-requests" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      cars.map((car) => (
                        <EditRequestBox
                          key={car.id}
                          data={car}
                          cars={cars}
                          setCars={setCars}
                        />
                      ))
                    )}
                  </div>
                )}
              </Tab> */}
              <Tab
                eventKey="being-edited"
                title="Being Edited"
                tabClassName="admin-tab"
              >
                {key === "being-edited" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      cars.map((car) => (
                        <BeingEditedBox key={car.id} data={car} />
                      ))
                    )}
                  </div>
                )}
              </Tab>
            </Tabs>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    </>
  );
};

export default Listings;
