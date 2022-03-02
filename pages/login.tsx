import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import Wrapper from "../components/Auth/Wrapper";

interface LoginProps {}

const Login = (props: LoginProps) => {
  return (
    <Wrapper>
      <LoginForm isAdmin={false} />
    </Wrapper>
  );
};

export default Login;
