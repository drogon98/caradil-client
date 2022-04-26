import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../redux/hooks";
import {
  RegisterInput,
  useRegisterMutation,
} from "../../graphql_types/generated/graphql";
import { setToken } from "../../redux/authSlice";
import { ButtonLoading } from "../Loading/ButtonLoading";
import { countries } from "../../data";

interface IProps {
  isAdmin?: boolean;
}

interface CustomRegisterInput extends RegisterInput {
  confirmPassword?: string | "";
}

const RegisterForm: FC<IProps> = (props) => {
  const [values, setValues] = useState<CustomRegisterInput>({
    first_name: "",
    last_name: "",
    email: "",
    country: "kenya",
    password: "",
    confirmPassword: "",
    role: 1,
  });
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [registering, setRegistering] = useState(false);
  const router = useRouter();
  const [role, setRole] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [passwordMisMatch, setPasswordMisMatch] = useState(false);
  const [hasPlanData, setHasPlanData] = useState(false);
  const [planData, setPlanData] = useState<{ plan: string; period?: string }>();

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

    const checkPlanData = () => {
      try {
        let queryData = { ...router.query };
        if (parseInt(queryData.role as string, 10) === 2) {
          delete queryData.role;
          delete queryData.trial;
          if (Object.keys({ ...queryData }).length > 0) {
            setHasPlanData(true);
            const plan = router.query.plan as string;
            if (plan === "individual") {
              setPlanData({
                plan,
              });
            } else {
              setPlanData({
                plan,
                period: router.query.period as string,
              });
            }
          } else {
            setHasPlanData(false);
            setPlanData({
              plan: "individual",
            });
          }
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    };

    checkRole();
    checkPlanData();
  }, [router.query]);

  // console.log("role :>> ", role);

  const [register, { loading, error: registerError }] = useRegisterMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
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

    if (passwordMisMatch) {
      setPasswordMisMatch(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setPasswordMisMatch(true);
      return;
    }

    delete values.confirmPassword;

    let payload: RegisterInput = { ...values, role };

    if (props.isAdmin) {
      payload.role = 3;
    }

    if (payload.role === 2) {
      payload = { ...payload!, ...planData! };
    }

    try {
      setRegistering(true);
      let response;

      response = await register({ variables: { payload } });

      if (response?.data?.register.error) {
        setError(response?.data?.register.error);
        setRegistering(false);
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
        if (props.isAdmin) {
          await router.push("/root");
        } else {
          await router.push("/account");
        }
        // }
      }
    } catch (error) {
      setRegistering(false);
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError("Network Error!");
      return;
    }
  };

  return (
    <>
      <h3>Sign Up</h3>
      <div>{error && <small className="text-danger">{error}</small>}</div>
      <div>
        {passwordMisMatch && (
          <small className="text-danger">Password mismatch!</small>
        )}
      </div>
      <form
        className="form-group mb-3"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="row mb-3">
          <div className="col-6">
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
              value={values.first_name ?? ""}
            />
          </div>
          <div className="col-6">
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
              value={values.last_name ?? ""}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="country">Country</label>
          <select
            className="form-select form-control"
            onChange={handleChange}
            value={values?.country ?? ""}
            name="country"
            // disabled={props.isManage && !props.isEdit}
            required
            // defaultValue={"Kenya"}
          >
            <option value={""}>Select Country</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country.toLowerCase()}>
                {country}
              </option>
            ))}
          </select>
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
            value={values.email ?? ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            type="password"
            value={values.password ?? ""}
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
            value={values.confirmPassword ?? ""}
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
            <label className="form-check-label" htmlFor="agreeToTermsRegister">
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
              disabled={registering || !hasAgreedToTerms}
            >
              {registering ? (
                <ButtonLoading
                  spinnerColor="white"
                  dimensions={{ height: "24px", width: "24px" }}
                />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
