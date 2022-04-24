import Link from "next/link";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { HostPlansData } from "../../utils/interfaces";
import { useRole } from "../hooks/useRole";

interface GetStartedBtnProps {
  plansData: HostPlansData;
  period: string | boolean;
}

export default function GetStartedBtn(props: GetStartedBtnProps) {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  return (
    <div className="d-flex justify-content-center">
      {" "}
      {/* If am logged in as a host take me to the list form */}
      {/* If am logged in as a driver take me to the upgrade acoount page */}
      {/* If guest register me in as a host ie role=2 */}
      {role === 1 && (
        <Link
          href={{
            pathname: "/account/settings",
            query: { upgrade: true },
          }}
        >
          <a className="btn bgOrange">Get Started</a>
        </Link>
      )}
      {role === 2 && (
        <Link
          href={{
            pathname: "/account/listings/add-car",
          }}
        >
          <a className="btn bgOrange">Get Started</a>
        </Link>
      )}
      {role === 3 && (
        <Link
          href={{
            pathname: "/",
          }}
        >
          <a className="btn bgOrange">Get Started</a>
        </Link>
      )}
      {!role && (
        <Link
          href={{
            pathname: "/register",
            query:
              props.period === ""
                ? {
                    role: 2,
                    plan: "individual",
                  }
                : {
                    role: 2,
                    plan: props.plansData.title,
                    period: props.period,
                  },
          }}
        >
          <a className="btn bgOrange">Get Started</a>
        </Link>
      )}
    </div>
  );
}
