import Head from "next/head";
import React, { FC } from "react";
import { AdminAuthWrapper } from "../../components/AdminAuthWrapper";
import AdminLayout from "../../components/layouts/AdminLayout";

interface IProps {}

const Admin: FC<IProps> = (props) => {
  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminAuthWrapper>
        <AdminLayout>
          <h1>Welcome Admin</h1>
        </AdminLayout>
      </AdminAuthWrapper>
    </>
  );
};

export default Admin;
