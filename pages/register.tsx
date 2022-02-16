import React, { FC } from "react";
import RegisterForm from "../components/Auth/RegisterForm";

interface IProps {}

const Register: FC<IProps> = (props) => {
  return (
    <div className="authWrapper">
      <div className="authContent p-2 py-5">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
