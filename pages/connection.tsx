import { useRouter } from "next/router";
import React from "react";

interface IConnectionLostProps {}

export default function ConnectionLost(props: IConnectionLostProps) {
  const router = useRouter();
  return (
    <div className="customContainer">
      <div className="text-center pt-5">
        {" "}
        <h1>Unable to connect to the internet!</h1>
        <p>
          Your device seems not to be connected to the internet. Ensure you have
          stable connection and try again.
        </p>
        <div>
          <button className="btn bg-orange" onClick={() => router.back()}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
