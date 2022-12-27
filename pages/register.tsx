import React, { FC } from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import Wrapper from "../components/Auth/Wrapper";
import { CustomHead } from "../components/CustomHead";

interface IProps {}

const Register: FC<IProps> = (props) => {
  return (
    <>
      <CustomHead
        title="Register"
        metaDescription="Create a guest or host account to start using our amazing services."
      />
      <Wrapper>
        <RegisterForm />
      </Wrapper>
    </>
  );
};

export default Register;
