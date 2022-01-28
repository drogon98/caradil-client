import React from "react";
import LoginForm from "../../components/Auth/LoginForm";

interface AdminLoginProps {}

const AdminLogin = (props: AdminLoginProps) => {
  return (
    <div className="authWrapper">
      <div className="authContent p-2 py-5">
        <LoginForm isAdmin />
      </div>
    </div>
  );
};

export default AdminLogin;
