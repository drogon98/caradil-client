import React, { FC, useEffect, useRef, useState } from "react";
import { Tabs } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import { AdminAuthWrapper } from "../../components/AdminAuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import AdminLayout from "../../components/layouts/AdminLayout";
import FlexibleLoader from "../../components/Loading/FlexibleLoader";
import { AllBox } from "../../components/Root/Transactions/AllBox";
import {
  Transaction,
  useGetTransactionsLazyQuery,
} from "../../graphql_types/generated/graphql";

interface TransactionsProps {}

const Transactions: FC<TransactionsProps> = (props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [getTransactions, { data, loading }] = useGetTransactionsLazyQuery({
    fetchPolicy: "network-only",
  });
  const [key, setKey] = useState("all");
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (key && topRef && topRef.current) {
      topRef.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }, [key, topRef]);

  useEffect(() => {
    if (key) {
      // setTransactions([]);
      getTransactions({ variables: { type_: key } });
    }
  }, [key]);

  // console.log("key :>> ", key);

  useEffect(() => {
    if (data?.getTransactions) {
      setTransactions(data.getTransactions);
    }
  }, [data]);

  return (
    <>
      <CustomHead title="Admin - Transactions" />
      <AdminAuthWrapper>
        <AdminLayout>
          <div className="admin-transactions-container">
            <h3 className="transactions-title px-2">Transactions</h3>
            <Tabs
              activeKey={key}
              id="noanim-tab-example"
              className="tabs-box px-2"
              onSelect={(k) => setKey(k!)}
            >
              <Tab eventKey="all" title="All" tabClassName="admin-tab">
                {key === "all" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      transactions.map((transaction) => (
                        <AllBox key={transaction.id} data={transaction} />
                      ))
                    )}
                  </div>
                )}
              </Tab>
              <Tab eventKey="booking" title="Bookings" tabClassName="admin-tab">
                {key === "booking" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      transactions.map((transaction) => (
                        <AllBox key={transaction.id} data={transaction} />
                      ))
                    )}
                  </div>
                )}
              </Tab>
              {/* <Tab
                eventKey="under-verification"
                title={<b>Under Verification</b>}
                tabClassName="admin-tab"
              >
                {key === "under-verification" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      cars.map((car) => (
                        <UnderVerificationBox key={car.id} data={car} />
                      ))
                    )}
                  </div>
                )}
              </Tab> */}
              {/* <Tab
                eventKey="unverified"
                title="UnVerified"
                tabClassName="admin-tab"
              >
                {key === "unverified" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      cars.map((car) => (
                        <UnverifiedBox key={car.id} data={car} />
                      ))
                    )}
                  </div>
                )}
              </Tab> */}
              {/* <Tab
                eventKey="edit-requests"
                title="Edit Requests"
                tabClassName="admin-tab"
              >
                {key === "edit-requests" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      cars.map((car) => (
                        <EditRequestBox
                          key={car.id}
                          data={car}
                          cars={cars}
                          setCars={setCars}
                        />
                      ))
                    )}
                  </div>
                )}
              </Tab> */}
              <Tab
                eventKey="host_disbursement"
                title="Host Disbursements"
                tabClassName="admin-tab"
              >
                {key === "host_disbursement" && (
                  <div className="tab-content p-2">
                    <div ref={topRef} />
                    {loading ? (
                      <FlexibleLoader />
                    ) : (
                      transactions.map((transaction) => (
                        <AllBox key={transaction.id} data={transaction} />
                      ))
                    )}
                  </div>
                )}
              </Tab>
            </Tabs>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    </>
  );
};

export default Transactions;
