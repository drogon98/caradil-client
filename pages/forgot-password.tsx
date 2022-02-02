import Head from "next/head";
import React, { ChangeEvent, useState } from "react";
import { CustomHead } from "../components/CustomHead";
import Layout from "../components/layouts/Layout";
// import { ButtonLoading } from "../components/Loading/ButtonLoading";

export interface ForgotPasswordProps {}

function ForgotPassword(props: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {};
  return (
    <div>
      <CustomHead title="Forgot Password" />
      <Layout>
        <div className="customContainer py-4">
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto">
              <h3>Forgot Password</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    required
                    id="email"
                    value={email}
                    placeholder="johndoe@gmail.com"
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn bgOrange"
                    // disabled={loading}
                  >
                    {/* <ButtonLoading
                        spinnerColor="white"
                        dimensions={{ height: "24px", width: "24px" }}
                      /> */}
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ForgotPassword;
