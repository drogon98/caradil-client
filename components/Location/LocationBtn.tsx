import React, { MouseEvent, useState } from "react";

interface ILocationBtnProps {
  text: string;
  path: string;
}

export default function LocationBtn(props: ILocationBtnProps) {
  const [coords, setCoords] = useState<{
    latitude: string;
    longitude: string;
  }>();
  function success(pos: { coords: any }) {
    const crd = pos.coords;
    setCoords(crd);
  }

  function error(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
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
      <button className="btn bgOrange mt-4" onClick={handleClick}>
        {props.text}
      </button>
      {coords && <p>{`lat-${coords?.latitude} long-${coords?.longitude}`}</p>}
    </>
  );
}
