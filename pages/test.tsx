import React, { ReactElement } from "react";
import CarDataStepForm from "../components/CarDataStepForm";

interface Props {}

export default function Test({}: Props): ReactElement {
  return (
    <div className="my-5">
      <CarDataStepForm />
    </div>
  );
}
