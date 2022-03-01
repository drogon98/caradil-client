import { Icon } from "@iconify/react";
import React, { FC } from "react";
import { Maybe } from "../../graphql_types/generated/graphql";

interface CarDetailsData {
  name: Maybe<string> | undefined;
  trips: Maybe<number> | undefined;
  gas: Maybe<string> | undefined;
  transmission: Maybe<string> | undefined;
  seats: Maybe<number> | undefined;
  // doors: Maybe<number> | undefined;
  bags: Maybe<number> | undefined;
}
interface CarDetailsTopProps {
  data: CarDetailsData;
}

export const CarDetailsTop: FC<CarDetailsTopProps> = (props) => {
  return (
    <div>
      <h1>{props.data.name}</h1>
      {/* <div className="d-flex align-items-center">
        <h4 className="m-0">4.81</h4>
        <span>
          <p className="ml-2">({props.data.trips})</p>
        </span>
      </div> */}

      <div>
        <div className="mt-3 details-top-icons-wrapper">
          <div className="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              className="carTopIcon"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="1.5"
                strokeWidth="1.5"
                clipRule="evenodd"
              >
                <path
                  strokeWidth="1.493"
                  d="M3 7.562A2.562 2.562 0 0 1 5.563 5H7V3h5v2h2.002A6.998 6.998 0 0 1 21 11.998v6.442a2.562 2.562 0 0 1-2.563 2.562H5.563A2.565 2.565 0 0 1 3 18.44V7.562Z"
                />
                <path d="M12 9s3 2.993 3 4.886c0 1.656-1.345 3-3 3c-1.656 0-2.988-1.344-3-3C9.01 11.992 12 9 12 9Z" />
              </g>
            </svg>
            &nbsp; &nbsp;
            <span> Gas ({props.data.gas})</span>
          </div>
          <div className="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 48 48"
              className="carTopIcon"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              >
                <path d="M40 12v12H8m16-12v24M8 12v24" />
                <path d="M44 8a4 4 0 1 1-8 0a4 4 0 0 1 8 0ZM28 8a4 4 0 1 1-8 0a4 4 0 0 1 8 0ZM12 8a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm16 32a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-16 0a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z" />
                <circle cx="40" cy="40" r="4" />
              </g>
            </svg>
            &nbsp; &nbsp;
            <span>Transmission ({props.data.transmission})</span>
          </div>
          <div className="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 48 48"
              className="carTopIcon"
            >
              <g transform="translate(48 0) scale(-1 1)">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="4"
                >
                  <path d="m36 33l6-29s-10.5 2-10.5 6c0 2.5 4 4 2.5 5.5s-7 3-7 7c0 2.5 1.64 4.36 0 6c-1.5 1.5-3 .714-5.5 0c-2.8-.8-8.5-1.5-10.5-1S7 29 7 32c0 1.65 1 3.5 3.5 4s5.5-2 9.5-2s9 3 12 3s4-4 4-4Z" />
                  <path d="m11 36l-3 8h33l-6-8" />
                </g>
              </g>
            </svg>
            &nbsp; &nbsp;
            <span>{props.data.seats} Seats</span>
          </div>
          <div className="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              className="carTopIcon"
            >
              <g transform="translate(24 0) scale(-1 1)">
                <path
                  fill="currentColor"
                  d="M9.5 18V9H8v9m4.75 0V9h-1.5v9M16 18V9h-1.5v9m2.53-12C18.11 6 19 6.88 19 8v11c0 1.13-.89 2-1.97 2c0 .58-.47 1-1.03 1c-.5 0-1-.42-1-1H9c0 .58-.5 1-1 1c-.56 0-1.03-.42-1.03-1C5.89 21 5 20.13 5 19V8c0-1.12.89-2 1.97-2H9V3c0-.58.46-1 1-1h4c.54 0 1 .42 1 1v3m-4.5-2.5V6h3V3.5M17.03 19V8H6.97v11"
                />
              </g>
            </svg>
            &nbsp; &nbsp;
            <span>{props.data.bags} Bags</span>
          </div>
        </div>
      </div>
    </div>
  );
};
