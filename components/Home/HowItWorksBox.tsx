import React from "react";

interface HowItWorksProps {
  data: any;
}

const HowItWorksBox = ({ data }: HowItWorksProps): JSX.Element => {
  return (
    <div className="p-2">
      <div className="d-flex justify-content-center mb-3">
        <div className="icon-wrapper">{data.icon}</div>
      </div>
      <div className="text-center">
        <span className="how-it-works-lead font-weight-bold mb-3">
          {data.heading}
        </span>
        <div>
          <small>{data.content}</small>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksBox;
