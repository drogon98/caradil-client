import Head from "next/head";
import Link from "next/link";
import React, { FC } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import AccountLayout from "../../components/layouts/AccountLayout";
// import { Link, Route } from "react-router-dom";

interface IProps {}

/**
 * @author
 * @function @Account
 **/

const Account: FC<IProps> = (props) => {
  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthWrapper>
        <AccountLayout>
          <div className="mt-2 p-2">
            <h1>Hi there,</h1>
            <small>Let's get you started.</small>
            <div>
              <Link href="/account/personal-details">
                <a>
                  <small className="colorOrange">Complete Your Profile</small>
                </a>
              </Link>
            </div>
          </div>
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Account;
