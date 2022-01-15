import React from "react";
import LoginForm from "../components/Auth/LoginForm";

interface LoginProps {}

/**
 * @author
 * @function @Login
 **/

const Login = (props: LoginProps) => {
  return (
    <div className="authWrapper">
      <div className="authContent p-2 py-5">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
