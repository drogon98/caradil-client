import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { hostPlansData } from "../../data";
import {
  Plan,
  useGetHostCanListACarDataQuery,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import RenewSubscribeBtn from "../Account/Overview/RenewSubscribeBtn";
import UpgradeBtn from "../Account/Overview/UpgradeBtn";
import { Loading } from "../Loading";

interface AddCarStartProps {
  setActiveSlide: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
}

export const AddCarStart = (props: AddCarStartProps) => {
  const [mainLoading, setMainLoading] = useState(true);
  const { data, loading } = useGetHostCanListACarDataQuery({
    fetchPolicy: "no-cache",
  });
  const user = useAppSelector((state) => state.user.user);
  const [planData, setPlanData] = useState<Plan>();
  const router = useRouter();
  const [action, setAction] = useState<string>();

  useEffect(() => {
    try {
      if (data?.hostCanListACarData.error) {
      } else if (data?.hostCanListACarData.plan) {
        setPlanData(data?.hostCanListACarData.plan);
        let _hostPlanData = data?.hostCanListACarData.plan!;
        let _hostListedCars = data?.hostCanListACarData.carsListed!;

        if (_hostPlanData.title === "individual") {
          if (_hostListedCars === 2) {
            setAction("upgrade");
          } else {
            setAction("add_car");
          }
        } else {
          let listedCarsMinusTwo = _hostListedCars - 2;
          let planCarCount = hostPlansData.filter(
            (hpd) => hpd.title === _hostPlanData?.title
          )[0].carCount;

          // Check if plan is active
          if (!_hostPlanData.active) {
            if (_hostListedCars === 2) {
              setAction("subscribe");
            } else {
              setAction("add_car"); // can list two cars only
            }
          } else {
            // Check if the subscription is expired
            if (_hostPlanData?.due_date! < new Date().getTime()) {
              setAction("expired");
            } else {
              // Check if host has exceeded the package car count
              if (planCarCount === "Unlimited") {
                setAction("add_car");
              } else {
                if (listedCarsMinusTwo === planCarCount) {
                  setAction("upgrade");
                } else {
                  setAction("add_car");
                }
              }
            }
          }
        }
      }
      setMainLoading(false);
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [data]);

  // Check if host is qualified to list a car
  // If this host picks a plan redirect to the pay page

  return (
    <>
      {mainLoading || loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          {props.activeSlide === -1 && (
            <div>
              <button
                className="btn m-0 p-0 pl-2 mb-3"
                onClick={() => {
                  router.replace("/account/listings");
                }}
              >
                <BsArrowLeft size={"30px"} />
              </button>
            </div>
          )}
          {action === "add_car" && (
            <>
              <h4>Requirements to list your car</h4>
              <ul>
                <li>Car Owner National ID copy</li>
                <li>Car Logbook Scanned Copy (Can add later)</li>
                <li>
                  At least 5 clean photos of your car. These should be
                  rear,fore,both sides and inner photos of the car. These photos{" "}
                  <b>should not</b> contain any contact information like phone
                  no., email or website urls.
                </li>
              </ul>
              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn bgOrange"
                  type="submit"
                  onClick={() => props.setActiveSlide(0)}
                >
                  Start
                </button>
              </div>
            </>
          )}
          {action === "subscribe" && (
            <>
              <h4>Activate your subscription!</h4>

              <div className="d-flex justify-content-end mt-4">
                <RenewSubscribeBtn data={planData!} proceedToPay user={user!} />
              </div>
            </>
          )}
          {/* Redirect to pay page */}
          {action === "expired" && (
            <>
              <h4>Your subscription is Expired</h4>

              <div className="d-flex justify-content-end mt-4">
                <RenewSubscribeBtn data={planData!} user={user!} />
              </div>
            </>
          )}
          {/* Redirect to list cars plan section */}
          {action === "upgrade" && (
            <>
              <h4>Please Upgrade</h4>

              <div className="d-flex justify-content-end mt-4">
                <UpgradeBtn data={planData!} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
