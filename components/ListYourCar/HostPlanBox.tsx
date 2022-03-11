import React from "react";
import { HostPlansData } from "../../utils/interfaces";
import GetStartedBtn from "./GetStartedBtn";

interface HostPlanBoxProps {
  data: HostPlansData;
  period: string;
}

export default function HostPlanBox(props: HostPlanBoxProps) {
  return (
    <div className="w-100 p-2 py-3 host-plan-box">
      <div className="d-flex align-items-center justify-content-center">
        <h6 className="m-0" style={{ textTransform: "capitalize" }}>
          {props.data.title}
        </h6>
      </div>
      <hr />
      <div className="text-center">
        <p>
          <sup className="host-plan-sub-sup">ksh</sup>
          <span className="host-plan-amount">
            {props.data.price?.toLocaleString()}
          </span>
          <sub className="host-plan-sub-sup">
            /{props.period === "monthly" ? "month" : "annum"}
          </sub>
        </p>
        {/* <p className="lead host-plan-lead">Billed 600 per year</p> */}
      </div>
      <hr />
      <div>
        <ul
          style={{ listStyle: "none" }}
          className="px-2 w-75 mx-auto text-left"
        >
          <li>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.972 6.251a1.999 1.999 0 0 0-2.72.777l-3.713 6.682l-2.125-2.125a2 2 0 1 0-2.828 2.828l4 4c.378.379.888.587 1.414.587l.277-.02a2 2 0 0 0 1.471-1.009l5-9a2 2 0 0 0-.776-2.72z"
                />
              </svg>
            </span>
            &nbsp;&nbsp;
            <span>{props.data.carCount} car(s)</span>
          </li>
          <li>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.972 6.251a1.999 1.999 0 0 0-2.72.777l-3.713 6.682l-2.125-2.125a2 2 0 1 0-2.828 2.828l4 4c.378.379.888.587 1.414.587l.277-.02a2 2 0 0 0 1.471-1.009l5-9a2 2 0 0 0-.776-2.72z"
                />
              </svg>
            </span>
            &nbsp;&nbsp;<span>Search Ranking</span>
          </li>
          <li>
            {" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.972 6.251a1.999 1.999 0 0 0-2.72.777l-3.713 6.682l-2.125-2.125a2 2 0 1 0-2.828 2.828l4 4c.378.379.888.587 1.414.587l.277-.02a2 2 0 0 0 1.471-1.009l5-9a2 2 0 0 0-.776-2.72z"
                />
              </svg>
            </span>
            &nbsp;&nbsp;<span>Offers and Deals</span>
          </li>
        </ul>
      </div>

      <div className="mt-5">
        <GetStartedBtn plansData={props.data} period={props.period} />
      </div>
    </div>
  );
}
