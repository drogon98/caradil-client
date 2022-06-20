import React from "react";
import LoginForm from "../../components/Auth/LoginForm";
import Wrapper from "../../components/Auth/Wrapper";
import { CustomHead } from "../../components/CustomHead";

interface AdminLoginProps {}

const AdminLogin = (props: AdminLoginProps) => {
  return (
    <>
      <CustomHead title="Login" />
      <Wrapper>
        <LoginForm isAdmin />
      </Wrapper>
    </>
  );
};

export default AdminLogin;
