import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  RegisterInput,
  useRegisterMutation,
} from "../graphql_types/generated/graphql";
import { useRouter } from "next/router";
import { setToken } from "../redux/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { ButtonLoading } from "../components/Loading/ButtonLoading";

interface IProps {}

interface CustomRegisterInput extends RegisterInput {
  confirmPassword?: string | "";
}

const Register: FC<IProps> = (props) => {
  const [values, setValues] = useState<CustomRegisterInput>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 1,
  });
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  const router = useRouter();
  const [role, setRole] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkRole = () => {
      if (router.query.role && router.query.role === "2") {
        setRole(2);
      } else if (router.query.role && router.query.role !== "2") {
        setRole(2);
      } else {
        setRole(1);
      }
    };

    checkRole();
  }, [router.query]);

  // console.log("role :>> ", role);

  const [register, { loading, error: registerError }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "agree-to-terms") {
      setHasAgreedToTerms(e.target.value === "false" ? false : true);
    } else {
      setValues({ ...values, [e.target.name]: e.target.value.trim() });
    }
  };

  const handleFocus = (e: SyntheticEvent) => {
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload = { ...values, role };
    delete payload.confirmPassword;
    let response;

    try {
      response = await register({ variables: { payload } });
    } catch (error) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError("Network Error!");
      return;
    }
    // console.log("response :>> ", response);
    if (response?.data?.register.error) {
      setError(response?.data?.register.error);
      return;
    }
    if (response?.data?.register.access_token) {
      dispatch(setToken(response?.data?.register.access_token));
      // if (Object.keys(router.query).length > 0) {
      //   if (router.query.role && !router.query.next) {
      //     await router.push("/account");
      //   } else if (router.query.next) {
      //     let pathname = router.query.next as string;
      //     await router.push({ pathname });
      //   }
      // } else {
      // Check role
      await router.push("/account");
      // }
    }
  };

  return (
    <div className="authWrapper">
      <div className="authContent p-2 py-5">
        {/* <h3 className="text-center">Register</h3> */}
        <div style={{ height: "10px" }}>
          {error && <small className="text-danger">{error}</small>}
        </div>
        <form
          className="form-group mt-3"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                aria-label="First name"
                id="firstName"
                name="first_name"
                onChange={handleChange}
                onFocus={handleFocus}
                value={values.first_name}
              />
            </div>
            <div className="col">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                aria-label="Last name"
                id="lastName"
                name="last_name"
                onChange={handleChange}
                onFocus={handleFocus}
                value={values.last_name}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              required
              id="email"
              placeholder="johndoe@gmail.com"
              name="email"
              onChange={handleChange}
              onFocus={handleFocus}
              value={values.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              type="password"
              value={values.password}
              name="password"
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="form-control"
              id="confirmPassword"
              type="password"
              value={values.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              onFocus={handleFocus}
              required
            />
          </div>

          <div className="my-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={hasAgreedToTerms ? "false" : "true"}
                name="agree-to-terms"
                id="agreeToTermsRegister"
                checked={hasAgreedToTerms}
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                htmlFor="agreeToTermsRegister"
              >
                Yes,I agree to caradil{" "}
                <Link href="/policies/terms">
                  <a target={"_blank"} className="text-primary">
                    terms and conditons
                  </a>
                </Link>
              </label>
            </div>
          </div>
          <div>
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn bgOrange auth-btn"
                disabled={loading || !hasAgreedToTerms}
              >
                {loading ? (
                  <ButtonLoading
                    spinnerColor="white"
                    dimensions={{ height: "24px", width: "24px" }}
                  />
                ) : (
                  "Register"
                )}
              </button>
            </div>

            <div className="d-flex mt-3 justify-content-between">
              <span></span>
              <span>
                <Link href="/login">
                  <a>
                    <small>Already have an account?</small>
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
