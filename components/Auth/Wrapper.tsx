import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactChild, useEffect, useState } from "react";

interface WrapperProps {
  children: ReactChild;
}

export default function Wrapper(props: WrapperProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [hasTrial, setHasTrial] = useState(false);
  const [hasPlanData, setHasPlanData] = useState(false);
  const [planData, setPlanData] = useState<{ plan: string; period: string }>();

  const router = useRouter();

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
          } else {
            setHasPlanData(false);
            setPlanData({
              plan: "free",
              period: "monthly",
            });
          }
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    };
    checkPlanData();
  }, [router]);

  // console.log("planData", planData);
  // console.log("hasPlanData :>> ", hasPlanData);

  // console.log("router", router);
  // console.log("isLogin", isLogin);
  // console.log("isRegister :>> ", isRegister);

  useEffect(() => {
    if (router.pathname.includes("/login")) {
      setIsLogin(true);
    } else if (router.pathname.includes("/register")) {
      setIsRegister(true);
    }
    if (router.query && router.query.trial) {
      setHasTrial(true);
    } else {
      setHasTrial(false);
    }
  }, [router]);

  return (
    <div id="auth-page-wrapper">
      <div id="auth-page-content-wrapper">
        <div
          className="d-flex justify-content-between align-items-center shadow px-2 mb-3"
          style={{
            height: "70px",
            //   , borderBottom: "1px solid #d4d4d4"
          }}
        >
          <div className="brand">
            <Link href="/">
              <a>
                <h1 className="m0">Caradil</h1>
              </a>
            </Link>
          </div>
          <div className="d-flex h-100 align-items-center">
            {isLogin && (
              <>
                {" "}
                <span>New to Caradil?</span>
                &nbsp;&nbsp;
                <Link
                  href={{
                    pathname: "/register",
                    query: hasTrial
                      ? { role: 2, trial: true }
                      : hasPlanData
                      ? { role: 2, ...planData }
                      : {},
                  }}
                >
                  <a className="btn btn-outline-secondary">Sign Up</a>
                </Link>
              </>
            )}

            {isRegister && (
              <>
                {" "}
                <span>Have an account?</span>
                &nbsp;&nbsp;
                <Link
                  href={{
                    pathname: "/login",
                    query: hasTrial
                      ? { role: 2, trial: true }
                      : hasPlanData
                      ? { role: 2, ...planData }
                      : {},
                  }}
                >
                  <a className="btn btn-outline-secondary">Sign In</a>
                </Link>
              </>
            )}

            {/* {!isRegister && !isLogin && (
              <>
             
               
                &nbsp;&nbsp;
                <Link href="/browse-cars">
                  <a>Browse Cars</a>
                </Link>
              </>
            )} */}
          </div>
        </div>
        {/* <div className="row"></div> */}
        <div className="authContent mx-auto p-2">{props.children}</div>
      </div>
      <div
        className="py-3 px-2 d-flex justify-content-between"
        id="auth-page-footer-wrapper"
        style={{ borderTop: "1px solid #d4d4d4" }}
      >
        <div>
          &copy; {new Date().getFullYear()} <span>Caradil</span>
        </div>
        <div className="d-flex">
          <span>
            <Link href="/policies/terms">
              <a>Policies</a>
            </Link>
          </span>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <span>
            <Link href="/contact-us">
              <a>Contact Us</a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
