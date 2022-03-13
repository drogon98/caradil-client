import React, { FC } from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import Wrapper from "../components/Auth/Wrapper";
import { CustomHead } from "../components/CustomHead";

interface IProps {}

const Register: FC<IProps> = (props) => {
  return (
    <>
      <CustomHead title="Register" />
      <Wrapper>
        <RegisterForm />
      </Wrapper>
    </>
  );
};

export default Register;
