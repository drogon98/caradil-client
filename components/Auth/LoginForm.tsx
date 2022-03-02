import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { setToken } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import {
  LoginInput,
  useLoginMutation,
} from "../../graphql_types/generated/graphql";
import { ButtonLoading } from "../../components/Loading/ButtonLoading";
import client from "../../apollo";

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

  const [login, { loading }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value.trim() });
  };

  const router = useRouter();

  // console.log(`router`, router);

  useEffect(() => {
    if (loading) {
      setMainLoading(true);
    }
  }, [loading]);

  // Check focusevent issues
  const handleFocus = (e: SyntheticEvent) => {
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
              await router.push("/account");
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
      <div style={{ height: "10px" }}>
        {error && <small className="text-danger">{error}</small>}
      </div>
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
