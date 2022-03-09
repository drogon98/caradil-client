import React, { ChangeEvent, FormEvent, useState } from "react";
import Wrapper from "../components/Auth/Wrapper";
import { CustomHead } from "../components/CustomHead";
import Layout from "../components/layouts/Layout";
import { ButtonLoading } from "../components/Loading/ButtonLoading";
import { useForgotPasswordMutation } from "../graphql_types/generated/graphql";
// import { ButtonLoading } from "../components/Loading/ButtonLoading";

export interface ForgotPasswordProps {}

function ForgotPassword(props: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, { loading }] = useForgotPasswordMutation();
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ variables: { email: email } });

      if (response.data?.forgotPassword.error) {
        setError(response.data?.forgotPassword.error);
      } else {
        // Show toast
        setEmail("");
        setSuccess(true);
        setInterval(() => {
          setSuccess(false);
        }, 4000);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleFocus = () => {
    if (error) {
      setError("");
    }
  };

  return (
    <div>
      <CustomHead title="Forgot Password" />
      {/* <Layout>
        <div className="customContainer py-4">
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto"> */}
      <Wrapper>
        <div className="mt-3">
          <h3 className="mb-3">Forgot Password</h3>

          {success && (
            <div className="bg-success text-light p-3">
              <small>
                A link to reset your password has been sent to your inbox.
              </small>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {error && (
              <p className="text-danger">
                <small>{error}</small>
              </p>
            )}

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
                onFocus={handleFocus}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn bgOrange" disabled={loading}>
                {loading ? (
                  <ButtonLoading
                    spinnerColor="white"
                    dimensions={{ height: "24px", width: "24px" }}
                  />
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        </div>
      </Wrapper>
      {/* </div>
          </div>
        </div>
      </Layout> */}
    </div>
  );
}

export default ForgotPassword;
