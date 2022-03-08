import parse from "html-react-parser";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomHead } from "../components/CustomHead";
import Layout from "../components/Layouts/Layout";
import { Loading } from "../components/Loading";
import { Faq, useGetFaqsQuery } from "../graphql_types/generated/graphql";

const FAQS: NextPage = () => {
  const [faqs, setFaqs] = useState<Faq[]>();
  const { data, loading } = useGetFaqsQuery({ fetchPolicy: "network-only" });
  const [mainLoading, setMainLoading] = useState(true);

  useEffect(() => {
    if (data?.faqs && !loading) {
      setFaqs(data.faqs);
      setMainLoading(false);
    }
  }, [data]);

  // console.log("data :>> ", data);
  return (
    <>
      <CustomHead title="FAQs" />
      <Layout>
        <div className="customContainer my-4">
          <h3 className="my-5 text-center section-heading">
            FREQUENTLY ASKED QUESTIONS
          </h3>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="accordion" id="accordionPanelsStayOpenExample">
              {faqs?.map((faq, idx) => (
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id={`panelsStayOpen-heading${idx}`}
                  >
                    <button
                      className={`accordion-button faq-accordion-button ${
                        idx !== 0 && `collapsed`
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#panelsStayOpen-collapse${idx}`}
                      aria-expanded={idx === 0 ? true : false}
                      aria-controls={`panelsStayOpen-collapse${idx}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`panelsStayOpen-collapse${idx}`}
                    className={`accordion-collapse collapse ${
                      idx === 0 && `show`
                    }`}
                    aria-labelledby={`panelsStayOpen-heading${idx}`}
                  >
                    <div className="accordion-body faq-accordion-answer">
                      {parse(faq.answer!)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3">
            <p>
              Couldn't find what you are looking for?
              <Link href="/contact-us">
                <a className="colorOrange">
                  <small>
                    <b>Contact Us</b>
                  </small>
                </a>
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FAQS;
