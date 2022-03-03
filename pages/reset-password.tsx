import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Wrapper from "../components/Auth/Wrapper";
import { CustomHead } from "../components/CustomHead";
import Layout from "../components/layouts/Layout";
import { ButtonLoading } from "../components/Loading/ButtonLoading";
import { useResetPasswordMutation } from "../graphql_types/generated/graphql";

export interface ResetPasswordProps {}

function ResetPassword(props: ResetPasswordProps) {
  const [values, setValues] =
    useState<{ password: string; confirmPassword: string }>();
  const [error, setError] = useState("");
  const [tokenError, setTokenError] = useState(false);
  const [resetPassword, { loading }] = useResetPasswordMutation();
  //   const [success, setSuccess] = useState(false);
  const [isMatch, setIsMatch] = useState(true);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values!, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (values?.password !== values?.confirmPassword) {
        setIsMatch(false);
      }
      const response = await resetPassword({
        variables: {
          input: {
            password: values?.password!,
            token: router.query["reset-token"] as string,
          },
        },
      });

      if (response.data?.resetPassword.error) {
        console.log(
          "response.data?.resetPassword.error :>> ",
          response.data?.resetPassword.error
        );
        let error = response.data?.resetPassword.error;

        if (error.includes("Token")) {
          setTokenError(true);
        }
        //   Do something
      } else {
        //   Show a toast
        await router.replace("/login");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleFocus = () => {
    if (error) {
      setError("");
    }
    if (!isMatch) {
      setIsMatch(true);
    }
  };

  const handleBlur = () => {
    if (values?.password !== values?.confirmPassword) {
      setIsMatch(false);
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
        <>
          <h3 className="my-3">Reset Password</h3>

          {tokenError && (
            <div className="bg-danger text-light p-3">
              <small>
                Your reset password token is invalid. Request a new one{" "}
                <Link href="/forgot-password">
                  <a
                    className="colorOrange"
                    style={{ textDecoration: "underline" }}
                  >
                    here
                  </a>
                </Link>
              </small>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isMatch && (
              <p className="text-danger">
                <small>Passwords mismatch!</small>
              </p>
            )}

            <div className="mb-3">
              <label htmlFor="new-pass">New Password</label>
              <input
                className="form-control"
                required
                id="new-pass"
                value={values?.password}
                type="password"
                onChange={handleChange}
                name="password"
                onFocus={handleFocus}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm-pass">Confirm Password</label>
              <input
                className="form-control"
                required
                id="confirm-pass"
                value={values?.confirmPassword}
                type="password"
                onChange={handleChange}
                name="confirmPassword"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn bgOrange"
                disabled={loading || !isMatch}
              >
                {loading ? (
                  <ButtonLoading
                    spinnerColor="white"
                    dimensions={{ height: "24px", width: "24px" }}
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </>
      </Wrapper>
      {/* </div>
          </div>
        </div>
      </Layout> */}
    </div>
  );
}

export default ResetPassword;
