import Link from "next/link";
import React from "react";
import CustomImage from "../Image";

type Props = {};

export default function Hero({}: Props) {
  return (
    <div className="customContainer my-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center mt-4 mt-md-0">
          <h1>Discover a different world</h1>
          <p>Africa is a riddle because of its mysterious safari.</p>
          <Link
            href={{
              pathname: "/browse-cars",
              query: { categories: ["tours"] },
            }}
          >
            <a className="btn bgOrange mt-4">Find Your Safari Car</a>
          </Link>
        </div>
        <div className="col-md-6">
          <CustomImage
            src="/images/tours.jpg"
            alt="tours"
            height={"300px"}
            width={"500px"}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
}
