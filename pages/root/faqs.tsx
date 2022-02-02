import Head from "next/head";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { AdminAuthWrapper } from "../../components/AdminAuthWrapper";
import AdminLayout from "../../components/layouts/AdminLayout";
import "react-quill/dist/quill.snow.css";
import AddEditModalFaq from "../../components/Root/faqs/AddEditModalFaq";
import { Faq, useGetFaqsQuery } from "../../graphql_types/generated/graphql";
import { CustomHead } from "../../components/CustomHead";

interface IProps {}

const Faqs: FC<IProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [toEdit, setToEdit] = useState<Faq>();
  const [faqs, setFaqs] = useState<Faq[]>();
  const { data, loading } = useGetFaqsQuery({ fetchPolicy: "network-only" });
  const [mainLoading, setMainLoading] = useState(true);

  useEffect(() => {
    try {
      if (data?.faqs && !loading) {
        setFaqs(data?.faqs);
        setMainLoading(false);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [data]);

  const handleShowModal = (
    e: SyntheticEvent<HTMLButtonElement>,
    faq: Faq | null
  ) => {
    if (faq) {
      setIsEdit(true);
      setToEdit(faq!);
    }
    setShowModal(true);
  };

  console.log("data :>> ", data);

  return (
    <>
      <CustomHead title="Admin - FAQs" />
      <AdminAuthWrapper>
        <AdminLayout>
          <div className="p-2">
            {showModal && (
              <AddEditModalFaq
                modalShow={showModal}
                handleClose={() => setShowModal(false)}
                isEdit={isEdit}
                faq={toEdit}
              />
            )}

            <h1>Manage FAQS</h1>
            <button
              className="btn bgOrange"
              onClick={(e) => handleShowModal(e, null)}
            >
              Add FAQ
            </button>
            <ul>
              {faqs?.map((faq) => (
                <li>
                  {faq.question}
                  <span>
                    <button
                      className="btn bgOrange"
                      onClick={(e) => handleShowModal(e, faq)}
                    >
                      Edit
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    </>
  );
};

export default Faqs;
