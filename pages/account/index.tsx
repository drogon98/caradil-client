import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { BoxWrapper } from "../../components/Account/Overview/BoxWrapper";
import RenewSubscribeBtn from "../../components/Account/Overview/RenewSubscribeBtn";
import UpgradeBtn from "../../components/Account/Overview/UpgradeBtn";
import CustomAlert from "../../components/Alert";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import { useRole } from "../../components/hooks/useRole";
import AccountLayout from "../../components/layouts/AccountLayout";
import { Loading } from "../../components/Loading";
import {
  Plan,
  useGetAccountPlanLazyQuery,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
// import { Link, Route } from "react-router-dom";

interface IProps {}

const Account: FC<IProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);

  const [hasCompleteProfile, setHasCompleteProfile] = useState(true);
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  // const [isToCar, setIsToCar] = useState<boolean>();
  const router = useRouter();
  const [showPlanAlert, setShowPlanAlert] = useState(true);
  const user = useAppSelector((state) => state.user.user);
  const [planData, setPlanData] = useState<Plan>();
  const [showUpgradeBtn, setShowUpgradeBtn] = useState(false);
  const [showDowngradeBtn, setShowDowngradeBtn] = useState(false);
  const [showRenewBtn, setShowRenewBtn] = useState(false);
  const [alertPlanMsg, setAlertPlanMsg] = useState<ReactNode>();
  const [getPlanData, { data: _planData, loading: planLoading }] =
    useGetAccountPlanLazyQuery({ fetchPolicy: "no-cache" });

  // useEffect(() => {
  //   if (router.query && router.query.to_car) {
  //     if (role === 2) {
  //       setIsToCar(true);
  //     }
  //   }
  // }, [router.query, role]);

  useEffect(() => {
    if (token && role === 2) {
      getPlanData();
    }
  }, [role, token]);

  useEffect(() => {
    try {
      if (role === 1) {
        if (user?.first_name && user?.last_name) {
          setHasCompleteProfile(true);
        } else {
          setHasCompleteProfile(false);
        }
      } else if (role === 2) {
        if (user?.phone && user?.first_name && user?.last_name) {
          setHasCompleteProfile(true);
        } else {
          setHasCompleteProfile(false);
        }
      }

      setMainLoading(false);
      // }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [user]);

  useEffect(() => {
    if (_planData?.getPlan.plan) {
      setPlanData(_planData.getPlan.plan);

      setMainLoading(false);
    }
  }, [_planData]);

  const calculatePlanDueDays = (dueDate: number): number => {
    let now = new Date().getTime();
    let diff = dueDate - now;
    if (diff <= 0) {
      return 0;
    }

    if (diff <= 5) {
      setShowRenewBtn(true);
    }

    return Math.ceil(diff / 86400000);
  };

  useEffect(() => {
    if (planData?.title === "free") {
      setShowUpgradeBtn(true);

      setAlertPlanMsg(
        <>
          <small>
            You are currently subscribed to the free plan. This subscription
            will expire in{" "}
            {calculatePlanDueDays(planData.due_date!) === 0
              ? `today`
              : `${calculatePlanDueDays(planData.due_date!)} days `}
            from now. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <UpgradeBtn data={planData} />
          </small>
        </>
      );
    } else if (planData?.title !== "free") {
      let tempShowUpgradeBtn;
      let tempShowDowngradeBtn;
      if (planData?.title !== "enterprise") {
        tempShowUpgradeBtn = true;
        setShowUpgradeBtn(true);
      } else {
        tempShowUpgradeBtn = false;
        setShowUpgradeBtn(false);
      }

      if (planData?.title !== "individual") {
        tempShowDowngradeBtn = true;
        setShowDowngradeBtn(true);
      } else {
        tempShowDowngradeBtn = false;
        setShowDowngradeBtn(false);
      }

      if (!planData?.active) {
        // setShowUpgradeBtn(true);
        // setShowRenewBtn(true);

        setAlertPlanMsg(
          <>
            <div>
              <Alert.Heading>Activate plan!</Alert.Heading>
              <p>
                <small>
                  You picked {planData?.title} plan but you haven't activated it
                  yet. To activate the plan proceed to payment now.
                </small>
              </p>
              <div className="d-flex justify-content-end">
                <RenewSubscribeBtn user={user!} data={planData!} proceedToPay />
              </div>
            </div>
          </>
        );
      } else {
        // setShowUpgradeBtn(true);
        // setShowRenewBtn(true);
        setAlertPlanMsg(
          <>
            <small>
              You are currently subscribed to the {planData?.title} plan. This
              subscription will expire in{" "}
              {calculatePlanDueDays(planData?.due_date!) === 0
                ? `today`
                : `${calculatePlanDueDays(planData?.due_date!)} days `}
              from now. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="d-flex justify-content-end mt-2">
                {tempShowUpgradeBtn && <UpgradeBtn data={planData!} />}

                {showRenewBtn && (
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <RenewSubscribeBtn user={user!} data={planData!} />
                  </>
                )}
              </div>
            </small>
          </>
        );
      }
    }
  }, [planData]);

  // console.log("showUpgradeBtn", showUpgradeBtn);

  return (
    <>
      <CustomHead title="Account" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading || planLoading ? (
            <Loading />
          ) : (
            <div className="p-2 my-4">
              {hasCompleteProfile ? (
                <div className="row m-0">
                  <div className="col-lg-9 bs-column overview-left">
                    <CustomAlert
                      show={showPlanAlert}
                      setShow={setShowPlanAlert}
                      variant="warning"
                    >
                      <>{alertPlanMsg!}</>
                    </CustomAlert>
                    <p>Welcome Back,</p>
                    <div className="d-flex justify-content-between">
                      <h3 className="m-0">{`${user?.first_name} ${user?.last_name}`}</h3>
                      {role === 2 && (
                        <Link href="/account/listings/add-car">
                          <a className="btn bgOrange">Add Car</a>
                        </Link>
                      )}
                    </div>

                    <div className={`overview-boxes-top-wrapper`}>
                      <BoxWrapper>
                        <div className="py-3 p-2">
                          <h6>Trips</h6>
                          <p>0 Trips</p>
                        </div>
                      </BoxWrapper>
                      {role === 2 && (
                        <BoxWrapper>
                          <div className="py-3 p-2">
                            <h6>Bookings</h6>
                            <p>0 Bookings</p>
                          </div>
                        </BoxWrapper>
                      )}

                      {role === 2 && (
                        <BoxWrapper>
                          <div className="py-3 p-2">
                            <h6>Earnings</h6>
                            <p>Ksh. 0</p>
                          </div>
                        </BoxWrapper>
                      )}

                      <BoxWrapper>
                        <div className="py-3 p-2">
                          <h6>Balance</h6>
                          <p>Ksh. 0</p>
                        </div>
                      </BoxWrapper>
                    </div>
                  </div>
                  <div className="col-lg-3 bs-column mt-4 mt-lg-0">
                    <h6>Activities</h6>
                    <p className="mt-2">No activities yet!</p>
                  </div>
                </div>
              ) : (
                <>
                  <h1>Hi {user?.first_name ? user.first_name : "there"},</h1>
                  <p>Let's get you started.</p>
                  <div>
                    <Link
                      href={{
                        pathname: "/account/profile",
                        query: { initial: true },
                      }}
                    >
                      <a>
                        <p className="colorOrange">Complete Your Profile</p>
                      </a>
                    </Link>
                  </div>
                </>
              )}
              {/* {isToCar && (
                <>
                  <p>List your first car.</p>
                  <div>
                    <Link
                      href={{
                        pathname: "/account/listings",
                      }}
                    >
                      <a>
                        <p className="colorOrange">Go to list car</p>
                      </a>
                    </Link>
                  </div>
                </>
              )} */}
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Account;
