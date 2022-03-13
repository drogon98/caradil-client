import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import Wrapper from "../components/Auth/Wrapper";
import { CustomHead } from "../components/CustomHead";

interface LoginProps {}

const Login = (props: LoginProps) => {
  return (
    <>
      <CustomHead title="Login" />
      <Wrapper>
        <LoginForm isAdmin={false} />
      </Wrapper>
    </>
  );
};

export default Login;
