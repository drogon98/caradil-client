import Link from "next/link";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../hooks/useRole";

export default function TryForFreeBtn() {
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
          <a className="btn bgOrange fw-bolder text-light">Try For Free Now</a>
        </Link>
      )}
      {role === 2 && (
        <Link
          href={{
            pathname: "/account/listings/add-car",
          }}
        >
          <a className="btn bgOrange fw-bolder text-light">Try For Free Now</a>
        </Link>
      )}
      {role === 3 && (
        <Link
          href={{
            pathname: "/",
          }}
        >
          <a className="btn bgOrange fw-bolder text-light">Try For Free Now</a>
        </Link>
      )}
      {!role && (
        <Link
          href={{
            pathname: "/register",
            query: { role: 2 },
          }}
        >
          <a className="btn bgOrange fw-bolder text-light">Try For Free Now</a>
        </Link>
      )}
    </div>
  );
}
