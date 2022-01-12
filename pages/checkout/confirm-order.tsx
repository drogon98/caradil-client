import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
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
  console.log(`router`, router);
  console.log(`userData`, userData);
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

  // console.log(`data`, data);

  // console.log(`loading`, loading);

  // console.log(`totalCharge`, totalCharge);

  useEffect(() => {
    if (data?.getCar.car && router.query.startDate) {
      let startDate = new Date(router.query.startDate! as string);
      let endDate = new Date(router.query.endDate! as string);

      // To calculate the time difference of two dates
      let Difference_In_Time = endDate.getTime() - startDate.getTime();

      // To calculate the no. of days between two dates
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      console.log("Difference_In_Days :>> ", Difference_In_Days);

      setTotalCharge(() => {
        let total =
          parseInt(data.getCar.car?.daily_rate!, 10) * Difference_In_Days;
        return total as unknown as string;
      });
    }
  }, [router.query, data]);

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
    if (e.target.name === "firstName" || e.target.name === "lastName") {
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
          ttl: totalCharge,
        }),
      });
    } catch (error) {
      return;
    }

    console.log("response.json() :>> ", response);
    if (response) {
      const data = await response.json();
      if (window) {
        window.location.href = data.url;
      }
    }
  };

  console.log(`approvedLoading`, approvedLoading);

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
            <div className="customContainer my-4">
              {/* <h3>Pay Now</h3> */}
              <form onSubmit={handleSubmit}>
                {/* <form
                // method="post"
                action={`https://payments.ipayafrica.com/v3/ke?${paramString}`}
              > */}

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

                <div className="d-grid gap-2">
                  <button type="submit" className="btn bgOrange fw-bolder">
                    {`Pay Ksh.${totalCharge.toLocaleString()}`}
                  </button>
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
