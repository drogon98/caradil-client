import React, { FC } from "react";

interface CarDetailsReviewsProps {}

/**
 * @author @CodeYourEmpire
 * @function @CarDetailsReviews
 **/

export const CarDetailsReviews: FC<CarDetailsReviewsProps> = (props) => {
  return (
    <>
      <h6>Reviews</h6>
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
