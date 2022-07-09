import Link from "next/link";
import React, { MouseEvent, useEffect, useState } from "react";
import { hostPlansData } from "../../../data";
import { Plan, User } from "../../../graphql_types/generated/graphql";
import { useAppSelector } from "../../../redux/hooks";
import { baseHttpDomain } from "../../../utils/baseDomain";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface RenewSubscribeBtnProps {
  data: Plan;
  isUpgrade?: boolean;
  period?: string;
  proceedToPay?: boolean;
  user: User;
}

export default function RenewSubscribeBtn(props: RenewSubscribeBtnProps) {
  // const [values, setValues] = useState<any>();
  const [loading, setLoading] = useState(false);
  const token = useAppSelector((state) => state.auth._id);
  const [amt, setAmt] = useState<number>();

  useEffect(() => {
    if (props.data) {
      console.log("props.data", props.data);
      console.log("props.period :>> ", props.period);
      let period = props.period ? props.period : props.data.period;
      let plan = hostPlansData.filter(
        (hpd) => hpd.title === props.data.title
      )[0];
      console.log("plan :>> ", plan);

      let amt;

      if (period === "monthly") {
        amt = plan.monthlyPrice;
      } else if (period === "annually") {
        amt = plan.annuallyPrice;
      }

      setAmt(amt);
    }
  }, [props.data, props.period]);
  // Redirect to pay page
  // If proceed to pay, calculate the payable fee and show it
  // console.log("props.user", props.user);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      let payload = {
        p1: props.data.title,
        p2: props.isUpgrade
          ? "upgrade"
          : props.data.active
          ? "renew"
          : "upgrade",
        p3: props.period ? props.period : props.data.period,
        // p4: props.data.title,
        eml: props.user.email,
        tel: props.user.phone,
        ttl: amt,
      };

      let response = await fetch(
        `${baseHttpDomain}ipay-plan-renew-or-subscribe`,
        {
          method: "POST",
          // withCredentials: true,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
          }),
        }
      );

      // "https://payments.ipayafrica.com/v3/ke?live=0&oid=1647122682913&ttl=200&tel=65372891&eml=stephen%40gmail.com&vid=demo&curr=KES&p1=individual&p2=upgrade&p3=undefined&p4=undefined&cbk=http%3A%2F%2Flocalhost%3A3000%2Fcheckout%2Fbooking&cst=1&crl=2&hsh=3ae937887ccfb1fe85d13084c8ea2aeea5c219fe"

      if (response) {
        const data = await response.json();
        // console.log("data", data);
        if (window) {
          // if (distance) {
          //   localStorage.setItem("delivery_location", location);
          // }
          //  window.location.href = data.url;
          window.open(data.url, "_blank");
        }
      }

      setLoading(false);
    } catch (error) {
      console.log("error :>> ", error);
      setLoading(false);
    }
  };

  console.log("amt", amt);

  return (
    <>
      {props.isUpgrade && (
        <div className="d-flex justify-content-center">
          <button
            className="btn bgOrange renew-subscribe-btn"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? (
              <ButtonLoading
                spinnerColor="white"
                dimensions={{ height: "24px", width: "24px" }}
              />
            ) : (
              "Subscribe Now"
            )}
          </button>
        </div>
      )}
      {props.proceedToPay && (
        <button
          className="btn btn-sm btn-outline-success renew-subscribe-btn"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <ButtonLoading
              spinnerColor="white"
              dimensions={{ height: "24px", width: "24px" }}
            />
          ) : (
            `Proceed to pay Ksh.${amt?.toLocaleString()}`
          )}
        </button>
      )}
      {!props.proceedToPay && !props.isUpgrade && (
        <button
          className="btn btn-sm btn-outline-success renew-subscribe-btn"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <ButtonLoading
              spinnerColor="white"
              dimensions={{ height: "24px", width: "24px" }}
            />
          ) : (
            "Renew plan!"
          )}
        </button>
      )}
    </>
  );
}
