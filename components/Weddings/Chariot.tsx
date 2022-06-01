import Link from "next/link";
import React from "react";
import LocationBtn from "../Location/LocationBtn";

interface IChariotProps {}

export default function Chariot(props: IChariotProps) {
  return (
    <div className="customContainer my-5 text-center">
      {/* <p className="text-center">How It Works</p> */}

      <h2 className="mb-3 section-heading">Your Chariot Awaits</h2>
      <p>Book the perfect car rental alternative for your ceremony getaway</p>

      {/* <Link
        href={{
          pathname: "/browse-cars",
          query: { categories: ["wedding"] },
        }}
      >
        <a className="btn bgOrange mt-4">Browse Nearby Cars</a>
      </Link> */}
      <LocationBtn path="/browse-cars" text="Browse Nearby Cars" />
    </div>
  );
}
