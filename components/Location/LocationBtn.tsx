import { useRouter } from "next/router";
import React, { MouseEvent, useState } from "react";
import { ToastWrapper } from "../Toast/ToastWrapper";

interface ILocationBtnProps {
  text: string;
  path: string;
  query?: any;
}

export default function LocationBtn(props: ILocationBtnProps) {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  async function success(pos: { coords: any }) {
    const cords = pos.coords;

    const query = props.query ?? {};

    await router.push({
      pathname: "/browse-cars",
      query: { ...query, longitude: cords.longitude, latitude: cords.latitude },
    });
  }

  function error(err: { code: any; message: any }) {
    const tempToastMsg = `ERROR(${err.code}): ${err.message}`;
    setToastMessage(tempToastMsg);
    setShowToast(true);
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      navigator.permissions
        .query({
          name: "geolocation",
        })
        .then((result) => {
          const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          };

          navigator.geolocation.getCurrentPosition(success, error, options);
        });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <>
      {showToast && (
        <ToastWrapper
          setShow={setShowToast}
          message={toastMessage}
          show={showToast}
          position="bottom-end"
          bg={"warning"}
        />
      )}
      <button className="btn bgOrange mt-4" onClick={handleClick}>
        {props.text}
      </button>
    </>
  );
}
