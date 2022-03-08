import React, { FC } from "react";
import { AuthWrapper } from "../../../../components/AuthWrapper";
import CarDataStepForm from "../../../../components/CarDataStepForm";
import { CustomHead } from "../../../../components/CustomHead";
import AccountLayout from "../../../../components/Layouts/AccountLayout";

interface AddCarProps {}

const AddCar: FC<AddCarProps> = (props) => {
  return (
    <>
      <CustomHead title="Account - Add Car" />
      <AccountLayout>
        <AuthWrapper>
          <div className="p-2 mt-4">
            <CarDataStepForm />
          </div>
        </AuthWrapper>
      </AccountLayout>
    </>
  );
};

export default AddCar;
