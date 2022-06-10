import Link from "next/link";
import React, { FC, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/layouts/Layout";

interface ApproveDriverProps {}

const ApproveDriver: FC<ApproveDriverProps> = (props) => {
  const [values, setValues] = useState({});

  const handleChange = () => {};
  return (
    <>
      <CustomHead title="FAQs" />
      <AuthWrapper>
        <Layout>
          <div className="customContainer my-4">
            <h1>Get Approved To Drive</h1>
            <p>
              Since this is your first time we would like you to provide us with
              some information
            </p>
            <form className="form-group">
              <div className="mb-3">
                <div className="mb-3">
                  <label htmlFor="email">Email Address</label>
                  {/* Email will never be changed  */}
                  <input
                    className="form-control"
                    required
                    id="email"
                    //   value={values.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <label htmlFor="email">Phone Number</label>
                <input
                  className="form-control"
                  required
                  id="email"
                  // value={values.email}

                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Driving License No.</label>
                <input
                  className="form-control"
                  required
                  id="email"
                  // value={values.email}

                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <Link
                  href={{
                    pathname: "/checkout/confirm-order",
                    query: {},
                  }}
                >
                  <button type="submit" className="btn bgOrange">
                    Continue
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </Layout>
      </AuthWrapper>
    </>
  );
};

export default ApproveDriver;
