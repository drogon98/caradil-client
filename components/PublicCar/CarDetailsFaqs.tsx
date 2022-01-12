import React, { FC } from "react";

interface CarDetailsFaqsProps {}

/**
 * @author @CodeYourEmpire
 * @function @CarDetailsFaqs
 **/

export const CarDetailsFaqs: FC<CarDetailsFaqsProps> = (props) => {
  return (
    <>
      <h6>Faqs</h6>
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
