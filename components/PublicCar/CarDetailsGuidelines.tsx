import React, { FC } from "react";

interface CarDetailsGuidelinesProps {}

/**
 * @author @CodeYourEmpire
 * @function @CarDetailsGuidelines
 **/

export const CarDetailsGuidelines: FC<CarDetailsGuidelinesProps> = (props) => {
  return (
    <>
      {" "}
      <h6>Guidelines</h6>
      <p>
        Sites usually show images to provide illustration, like photos for
        online stores or news articles Sites usually show images to provide
        illustration, like photos for online stores or news articles Sites
        usually show images to provide illustration, like photos for online
        stores or news articles
      </p>
      <div className="mt-2">
        <button className="moreBox">More</button>
      </div>
    </>
  );
};
