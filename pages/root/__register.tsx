import React from "react";
import RegisterForm from "../../components/Auth/RegisterForm";

interface AdminRegisterProps {}

const AdminRegister = (props: AdminRegisterProps) => {
  return (
    <div className="authWrapper">
      <div className="authContent p-2 py-5">
        <RegisterForm isAdmin />
      </div>
    </div>
  );
};

export default AdminRegister;
