import { useRouter } from "next/router";
import React from "react";

interface ICustom404Props {}

export default function Custom404(props: ICustom404Props) {
  const router = useRouter();
  return (
    <div className="customContainer">
      <div className="text-center pt-5">
        {" "}
        <h1>Page not found!!</h1>
        <div>
          <button className="btn bgOrange" onClick={() => router.back()}>
            Go Back
          </button>
        </div>
        <p className="m-0 my-3">Or</p>
        <div>
          <label>Search what you are looking for</label>
          <div>
            <input placeholder="Search ..." />
          </div>
        </div>
      </div>
    </div>
  );
}
