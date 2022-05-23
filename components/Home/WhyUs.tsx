import React, { FC } from "react";

interface WhyUsProps {}

export const WhyUs: FC<WhyUsProps> = (props) => {
  return (
    <div className="page-section customContainer">
      <div className="text-center">
        <small className="text-uppercase section-heading-top-heading">
          Why Us?
        </small>
      </div>
      <div className="d-flex justify-content-center">
        <div className="section-heading-hr" />
      </div>
      <div className="text-center">
        <h2 className="mb-5 section-heading">
          We Have Solutions To Your Challenges
        </h2>
      </div>
      <div className="row mx-0 align-items-center mb-4">
        <div className="col-md-6">
          <img src="images/many-cars.jpg" width={"100%"} />
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
          <h4>Many Varieties of Cars</h4>
          <p>
            We have many cars to meet different client needs. From budget cars
            to classic cars,self driven and chauffeur driven,business and
            leisure cars,name it. Our search and filter algorithms make it easy
            for you to get your perfect car in the shortest time possible.
          </p>
        </div>
      </div>

      <div className="row mx-0 align-items-center flex-wrap-reverse flex-md-nowrap mb-4">
        <div className="col-md-6">
          <h4>Your booking fee is safe</h4>
          <p>
            Have you been conned before? No more sending money to strangers to
            make bookings. We hold your money and disburse it to host based on
            your trip's progress. This makes it easy for you to cancel a
            trip,reschedule a trip or even ask for a refund. Also our checkout
            system is fully secured for transactions.
          </p>
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
          <img src="images/safepayment.png" width={"100%"} />
        </div>
      </div>

      <div className="row mx-0 align-items-center mb-4">
        <div className="col-md-6">
          <img src="images/24hours.png" width={"100%"} />
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
          <h4>24 hours support</h4>
          <p>
            Our dedicated team is ready to answer your queries and offer help
            when it is needed. Don't be frustrated by anything during your trip,
            we are here to make things easier for you. Also with our integrated
            chatting system, you can communicate with host for queries specific
            to the car.
          </p>
        </div>
      </div>
    </div>
  );
};
