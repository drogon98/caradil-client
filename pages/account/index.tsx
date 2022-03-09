import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { BoxWrapper } from "../../components/Account/Overview/BoxWrapper";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import { useRole } from "../../components/hooks/useRole";
import AccountLayout from "../../components/Layouts/AccountLayout";
import { Loading } from "../../components/Loading";
import { useAppSelector } from "../../redux/hooks";
// import { Link, Route } from "react-router-dom";

interface IProps {}

const Account: FC<IProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);

  const [hasCompleteProfile, setHasCompleteProfile] = useState(true);
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [isToCar, setIsToCar] = useState<boolean>();
  const router = useRouter();

  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (router.query && router.query.to_car) {
      if (role === 2) {
        setIsToCar(true);
      }
    }
  }, [router.query, role]);

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

  return (
    <>
      <CustomHead title="Account" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="p-2 my-4">
              {hasCompleteProfile ? (
                <div className="row m-0">
                  <div className="col-lg-9 bs-column overview-left">
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
              {isToCar && (
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
              )}
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Account;
