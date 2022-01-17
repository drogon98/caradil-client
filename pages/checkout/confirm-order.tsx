import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import Summary from "../../components/Checkout/Summary";
import Layout from "../../components/layouts/Layout";
import { Loading } from "../../components/Loading";
import {
  useCheckIfDriverIsApprovedToDriveQuery,
  useGetAuthUserQuery,
  useGetCarQuery,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import { baseUrl } from "../../utils/baseUrl";

interface ConfirmOrderProps {}

interface PayData {
  tel: string;
  eml: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  ttl: string;
}

/**
 * @author @CodeYourEmpire
 * @function @ConfirmOrder
 **/

const ConfirmOrder: FC<ConfirmOrderProps> = (props) => {
  const router = useRouter();
  const [mainLoading, setMainLoading] = useState(true);
  const [skip, setSkip] = useState(true);
  const [error, setError] = useState("");
  // Make a request to check if driver is approved
  const { data: approvedData, loading: approvedLoading } =
    useCheckIfDriverIsApprovedToDriveQuery({
      fetchPolicy: "network-only",
    });

  const { data: userData, loading: userLoading } = useGetAuthUserQuery({
    fetchPolicy: "network-only",
  });
  const token = useAppSelector((state) => state.auth._id);
  const [ttl, setTtl] = useState(0);
  const [driverTtl, setDriverTtl] = useState(0);
  const [deliverTtl, setDeliverTtl] = useState(0);
  const [totalCharge, setTotalCharge] = useState<string>("");
  const [values, setValues] = useState<PayData>({
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    eml: "",
    tel: "",
    ttl: "",
  });

  const [dummyData, setDummyData] = useState({ firstName: "", lastName: "" });
  const [includeDriver, setIncludeDriver] = useState(false);
  const [deliverToMe, setDeliverToMe] = useState(false);
  const [discountEligible, setDiscountEligible] = useState<boolean>(false);
  const [tripDays, setTripDays] = useState<number>(0);

  useEffect(() => {
    if (userData?.getUser.user) {
      setDummyData({
        firstName: userData.getUser.user.first_name ?? "",
        lastName: userData.getUser.user.last_name ?? "",
      });
      setValues({
        ...values,
        eml: userData.getUser.user.email ?? "",
        tel: userData.getUser.user.phone ?? "",
      });
    }
  }, [userData]);

  useEffect(() => {
    if (router.query.carId) {
      setSkip(false);
      setValues({
        ...values,
        p1: router.query.startDate as string,
        p2: router.query.startTime as string,
        p3: router.query.endDate as string,
        p4: `${router.query.endTime as string} ${router.query.carId}`,
      });
    }
  }, [router.query]);

  const { data, loading } = useGetCarQuery({
    variables: { carId: parseInt(router.query.carId as string, 10) },
    skip,
    fetchPolicy: "cache-and-network",
  });

  // console.log("data :>> ", data);

  useEffect(() => {
    if (data?.getCar.car && router.query.startDate) {
      let startDate = new Date(router.query.startDate! as string);
      let endDate = new Date(router.query.endDate! as string);

      // To calculate the time difference of two dates
      let Difference_In_Time = endDate.getTime() - startDate.getTime();

      // To calculate the no. of days between two dates
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      // console.log("Difference_In_Days :>> ", Difference_In_Days);
      setTripDays(Difference_In_Days);
      // setTotalCharge(() => {
      //   let total = data.getCar.car?.daily_rate! * Difference_In_Days;
      //   return total as unknown as string;
      // });
    }
  }, [router.query, data]);

  // console.log("tripDays :>> ", tripDays);
  useEffect(() => {
    if (data && tripDays) {
      let total = data?.getCar.car?.daily_rate! * tripDays;
      setTtl(total);
    }
  }, [tripDays, data]);

  useEffect(() => {}, [totalCharge, tripDays, data]);

  useEffect(() => {
    if (data && tripDays) {
      if (includeDriver) {
        let driverTtl = data.getCar.car?.driver_daily_rate! * tripDays;
        setDriverTtl(driverTtl);
      } else {
        setDriverTtl(0);
      }
    }
  }, [includeDriver, tripDays, data]);

  useEffect(() => {
    if (data) {
      if (deliverToMe) {
        let deliverTtl = data.getCar.car?.delivery_rate! * 2;
        setDeliverTtl(deliverTtl);
      } else {
        setDeliverTtl(0);
      }
    }
  }, [deliverToMe, tripDays, data]);

  useEffect(() => {
    if (data?.getCar.car?.id) {
      if (data.getCar.car.discount) {
        // if (data.getCar.car.discount_days) {
        // if (data.getCar.car.discount_days > 0) {
        setDiscountEligible(true);
        // }
        // }
      }
    }
  }, [tripDays, data]);

  useEffect(() => {
    const redirect = async () => {
      if (approvedData?.checkIfDriverIsApprovedToDrive) {
        if (!approvedData?.checkIfDriverIsApprovedToDrive.approved) {
          // Consider redirecting to an unknown page
          await router.push({
            pathname: "/checkout/approve-driver",
            query: { approved: false },
          });
        }
      }
    };
    redirect();
  }, [approvedData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setPhone(e.target.value);
    if (e.target.name === "checkout-include-driver") {
      setIncludeDriver(e.target.value === "true" ? true : false);
    } else if (e.target.name === "checkout-delivery") {
      setDeliverToMe(e.target.value === "true" ? true : false);
    } else if (e.target.name === "firstName" || e.target.name === "lastName") {
      setDummyData({ ...dummyData, [e.target.name]: e.target.value });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value.trim() });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    try {
      response = await fetch(`${baseUrl}ipay-pay`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          ttl: getTotal(),
        }),
      });
    } catch (error) {
      return;
    }

    if (response) {
      const data = await response.json();
      if (window) {
        window.location.href = data.url;
      }
    }
  };

  const getTotal = () => {
    let tempTtl = ttl + deliverTtl + driverTtl;
    if (discountEligible) {
      if (data?.getCar.car?.discount_days) {
        if (tripDays >= data?.getCar.car?.discount_days) {
          return (
            (tempTtl * (100 - parseFloat(data.getCar.car?.discount!))) / 100
          );
        }
        return tempTtl;
      }
      return (tempTtl * (100 - parseFloat(data?.getCar.car?.discount!))) / 100;
    } else {
      return tempTtl;
    }
  };

  return (
    <>
      <Head>
        <title>FAQs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthWrapper>
        <Layout>
          {approvedLoading ? (
            <Loading />
          ) : (
            <div className="customCarDetailsContainer my-4">
              {/* <div className="container"> */}
              <form onSubmit={handleSubmit}>
                <div className="row m-0">
                  <div className="col-md-7 col-lg-8">
                    <h3>Billing Details</h3>
                    <div className="mb-3">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        className="form-control"
                        required
                        id="firstName"
                        value={dummyData.firstName}
                        placeholder="John"
                        onChange={handleChange}
                        name="firstName"
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        className="form-control"
                        required
                        id="lastName"
                        value={dummyData.lastName}
                        placeholder="Doe"
                        onChange={handleChange}
                        name="lastName"
                        type="text"
                      />
                    </div>
                    {/* </div> */}

                    <div className="mb-3">
                      <label htmlFor="email">Email</label>
                      <input
                        className="form-control"
                        required
                        id="email"
                        value={values.eml}
                        placeholder="johndoe@gmail.com"
                        onChange={handleChange}
                        name="eml"
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone">Phone</label>
                      <input
                        className="form-control"
                        required
                        id="phone"
                        value={values.tel}
                        placeholder="eg.254799204524"
                        onChange={handleChange}
                        name="tel"
                        type="text"
                      />
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={includeDriver ? "false" : "true"}
                        id="checkout-include-driver"
                        onChange={handleChange}
                        name="checkout-include-driver"
                        checked={includeDriver}
                        disabled={!data?.getCar.car?.has_driver}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="checkout-include-driver"
                      >
                        Include Driver{" "}
                        <small>
                          {!data?.getCar.car?.has_driver && (
                            <>(This host does not provide driver).</>
                          )}
                        </small>
                      </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={deliverToMe ? "false" : "true"}
                        id="checkout-delivery"
                        onChange={handleChange}
                        name="checkout-delivery"
                        checked={deliverToMe}
                        disabled={!data?.getCar.car?.delivery}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="checkout-delivery"
                      >
                        Deliver car to me{" "}
                        <small>
                          {!data?.getCar.car?.delivery ? (
                            <>(This host does not deliver car).</>
                          ) : (
                            "(Specify delivery point)"
                          )}
                        </small>
                      </label>
                    </div>
                    <div className="d-none d-md-block">
                      <div className="d-grid gap-2">
                        <button
                          type="submit"
                          className="btn bgOrange fw-bolder"
                        >
                          {`Pay Ksh.${getTotal().toLocaleString()}`}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 col-lg-4">
                    <Summary
                      includeDriver={includeDriver}
                      deliverToMe={deliverToMe}
                      discountEligible={discountEligible}
                      discountDays={data?.getCar.car?.discount_days!}
                      discount={data?.getCar.car?.discount!}
                      totalCharge={getTotal()}
                      tripDays={tripDays}
                      dailyRate={data?.getCar.car?.daily_rate!}
                      car={data?.getCar.car!}
                    />
                  </div>
                  <div className="sm-screen-checkout-btn mt-4 d-md-none">
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn bgOrange fw-bolder">
                        {`Pay Ksh.${getTotal().toLocaleString()}`}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </Layout>
      </AuthWrapper>
    </>
  );
};

export default ConfirmOrder;
