import React, { FC } from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import Wrapper from "../components/Auth/Wrapper";

interface IProps {}

const Register: FC<IProps> = (props) => {
  return (
    <Wrapper>
      <RegisterForm />
    </Wrapper>
  );
};

export default Register;
