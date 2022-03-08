import type { NextPage } from "next";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/Layouts/Layout";

const GettingPaid: NextPage = () => {
  return (
    <>
      <CustomHead title="Getting Paid" />
      <Layout>
        <div className="customContainer my-5">
          <h1>Getting paid</h1>
          <h2>Hosts</h2>
          <ul>
            <li>
              <strong>Completed trip:</strong>&nbsp;We typically initiate
              payment 24hrs after trip ends.
            </li>

            <li>
              <strong>Trips lasting more than a week:</strong>&nbsp;We make
              weekly partial payments
            </li>
            <li className="ql-indent-1">
              We’ll initiate first payment on day seven, the next on day 14, and
              so on until trip has ended, and you’ve received all your earnings
            </li>
            <li>We’ll issue no more than one payout a day</li>
          </ul>
          <p>
            <strong>Note:</strong>&nbsp;If you haven't entered your payment
            information in, we can’t issue you payments until you
            do.&nbsp;Learn&nbsp;
            <a
              href="https://support.caradil.com/hc/articles/4417624765203-Setting-up-or-changing-direct-deposit"
              rel="noopener noreferrer"
              target="_blank"
            >
              how to set up mpesa payment.
            </a>
          </p>
        </div>
      </Layout>
    </>
  );
};

export default GettingPaid;
