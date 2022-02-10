import React from "react";
import LoginForm from "../components/Auth/LoginForm";

interface LoginProps {}

const Login = (props: LoginProps) => {
  return (
    <div className="authWrapper">
      <div className="authContent p-2 py-5">
        <LoginForm isAdmin={false} />
      </div>
    </div>
  );
};

export default Login;
