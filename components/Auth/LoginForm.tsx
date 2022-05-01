import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import client from "../../apollo";
import { ButtonLoading } from "../../components/Loading/ButtonLoading";
import {
  LoginInput,
  useLoginMutation,
} from "../../graphql_types/generated/graphql";
import { setToken } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { getRole } from "../../utils/role";

interface Props {
  isModal?: boolean;
  close?: any;
  isAdmin: boolean;
}

export default function LoginForm(props: Props): ReactElement {
  const [values, setValues] = useState<LoginInput>({
    email: "",
    password: "",
    isAdmin: false,
  });
  const [error, setError] = useState<string>("");
  const [mainLoading, setMainLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [hasTrial, setHasTrial] = useState(false);
  const [login, { loading }] = useLoginMutation();
  const [hasPlanData, setHasPlanData] = useState(false);
  const [planData, setPlanData] = useState<{ plan: string; period: string }>();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value.trim() });
  };

  useEffect(() => {
    if (router.query.trial) {
      setHasTrial(true);
    } else {
      setHasTrial(false);
    }
  }, [router]);

  useEffect(() => {
    const checkPlanData = () => {
      try {
        let queryData = { ...router.query };
        // console.log("queryData :>> ", queryData);
        if (parseInt(queryData.role as string, 10) === 2) {
          delete queryData.role;
          delete queryData.trial;
          if (Object.keys({ ...queryData }).length > 0) {
            setHasPlanData(true);
            setPlanData({
              plan: router.query.plan as string,
              period: router.query.period as string,
            });
          }

          // else {
          //   setHasPlanData(false);
          //   // setPlanData({
          //   //   plan: "free",
          //   //   period: "monthly",
          //   // });
          // }
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    checkPlanData();
  }, [router]);

  useEffect(() => {
    if (loading) {
      setMainLoading(true);
    }
  }, [loading]);

  // Check focusevent issues
  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;

    try {
      let payload = { ...values!, isAdmin: props.isAdmin! };

      response = await login({ variables: { payload: payload! } });

      if (response?.data?.login.error) {
        setError(response.data?.login.error);
        setMainLoading(false);
        return;
      } else if (response?.data?.login.access_token) {
        dispatch(setToken(response.data?.login.access_token));
        if (props.isModal) {
          await client.resetStore();
          props.close();
        } else {
          if (props.isAdmin) {
            await router.push("/root");
          } else {
            if (router.query.next) {
              let pathname = router.query.next as string;
              await router.push({
                pathname,
                query: router.query.nextQuery
                  ? JSON.parse(router.query.nextQuery! as string)
                  : {},
              });
              // }
            } else {
              // Check role
              let role = getRole(response.data?.login.access_token);
              if ((hasTrial || hasPlanData) && role === 1) {
                // redirect to setting upgrade section
                await router.push({
                  pathname: "/account/settings",
                  query: { upgrade_account: true, ...(planData ?? {}) },
                });
              } else {
                await router.push("/account");
              }
            }
          }
        }
      }
    } catch (error) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (errorMessage.includes("missing query")) {
        await router.push("/");
      }
      console.log("error :>> ", error);
      setError("Network Error!");
      setMainLoading(false);
      return;
    }
  };

  return (
    <>
      <h3>Sign In</h3>
      <div>{error && <small className="text-danger">{error}</small>}</div>
      <form
        className="form-group mt-2"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            required
            id="email"
            value={values.email}
            placeholder="johndoe@gmail.com"
            onChange={handleChange}
            name="email"
            onFocus={handleFocus}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            type="password"
            value={values.password}
            required
            onChange={handleChange}
            name="password"
            onFocus={handleFocus}
          />
        </div>
        <div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn bgOrange auth-btn"
              disabled={loading}
            >
              {mainLoading ? (
                <ButtonLoading
                  spinnerColor="white"
                  dimensions={{ height: "24px", width: "24px" }}
                />
              ) : (
                "Login"
              )}
            </button>
          </div>

          {!props.isAdmin && (
            <div className="d-flex mt-3 justify-content-between">
              <span>
                <Link href="/forgot-password">
                  <a className="cursor-pointer">
                    <small>Forgot Password?</small>
                  </a>
                </Link>
              </span>
              {props.isModal && (
                <span>
                  <Link href="/register">
                    <a className="cursor-pointer">
                      <small>Don't have account?</small>
                    </a>
                  </Link>
                </span>
              )}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
