import React from "react";

interface IFuelPolicyBoxProps {
  data: any;
}

export default function FuelPolicyBox(props: IFuelPolicyBoxProps) {
  return (
    <div className="mb-4">
      <h6>{props.data.title}</h6>
      <p>{props.data.content}</p>
    </div>
  );
}
