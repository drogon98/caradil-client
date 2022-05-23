import React from "react";
import RegisterForm from "../../components/Auth/RegisterForm";
import Wrapper from "../../components/Auth/Wrapper";
import { CustomHead } from "../../components/CustomHead";

interface AdminRegisterProps {}

const AdminRegister = (props: AdminRegisterProps) => {
  return (
    <>
      <CustomHead title="Register" />
      <Wrapper>
        <RegisterForm isAdmin />
      </Wrapper>
    </>
  );
};

export default AdminRegister;
