import Head from "next/head";
import React, { FC } from "react";
import { AdminAuthWrapper } from "../../components/AdminAuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import AdminLayout from "../../components/layouts/AdminLayout";

interface IProps {}

const Admin: FC<IProps> = (props) => {
  return (
    <>
      <CustomHead title="Admin" />
      <AdminAuthWrapper>
        <AdminLayout>
          <h1>Welcome Admin</h1>
        </AdminLayout>
      </AdminAuthWrapper>
    </>
  );
};

export default Admin;
