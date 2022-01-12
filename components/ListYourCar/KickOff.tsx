import Link from "next/link";
import React, { FC } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../hooks/useRole";

interface IProps {}

/**
 * @author
 * @function @KickOff
 **/

export const KickOff: FC<IProps> = (props) => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  // const role = null;

  console.log("role :>> ", role);

  return (
    <div className="customContainer my-5">
      <div className="row w-100 m-0 align-items-center">
        <div className="col-lg-6 pl-lg-0">
          <h1>Kick Off your Car Business Today</h1>

          <p>
            Start building a small car sharing business with Caradil Start
            building a small car sharing business with Caradil Start building a
            small car sharing business with Caradil Start building a small car
            sharing business with Caradil
          </p>
        </div>
        <div className="col-lg-6">
          <img
            src="/images/car_business.jpg"
            height="300px"
            width="100%"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        {" "}
        {/* If am logged in as a host take me to the list form */}
        {/* If am logged in as a driver take me to the upgrade acoount page */}
        {/* If guest register me in as a host ie role=2 */}
        {role === 1 && (
          <Link
            href={{
              pathname: "/account/settings",
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
              query: { role: 2 },
            }}
          >
            <a className="btn bgOrange">Get Started</a>
          </Link>
        )}
      </div>
    </div>
  );
};
