import parse from "html-react-parser";
import React, { FC } from "react";

interface FaqsProps {}

const faqs = [
  {
    question: "How do i receive payment?",
    answer: "The quick brown fox jumped over the lazy dog.",
  },
  {
    question: "How do i receive payment?",
    answer: "The quick brown fox jumped over the lazy dog.",
  },
  {
    question: "How do i receive payment?",
    answer: "The quick brown fox jumped over the lazy dog.",
  },
  {
    question: "How do i receive payment?",
    answer: "The quick brown fox jumped over the lazy dog.",
  },
  {
    question: "How do i receive payment?",
    answer: "The quick brown fox jumped over the lazy dog.",
  },
];
const faqsR = [
  {
    question: "How do i receive payment?",
    answer: "The quick brown fox jumped over the lazy dog.",
  },
  {
    question: "How do i receive payment?",
    answer: "The quick brown fox jumped over the lazy dog.",
  },
  {
    question: "How do i receive payment?",
    answer: "The quick brown fox jumped over the lazy dog.",
  },
  {
    question: "How do i receive payment?",
    answer: "The quick brown fox jumped over the lazy dog.",
  },
  {
    question: "How do i receive payment?",
    answer: "The quick brown fox jumped over the lazy dog.",
  },
];

export const Faqs: FC<FaqsProps> = (props) => {
  return (
    <div className="page-section customContainer">
      <div className="text-center">
        <small className="text-uppercase section-heading-top-heading">
          FAQS
        </small>
      </div>
      <div className="d-flex justify-content-center">
        <div className="section-heading-hr" />
      </div>
      <div className="text-center">
        <h2 className="mb-5 section-heading">Frequently Asked Questions</h2>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="accordion" id="accordionPanelsStayOpenExampleL">
            {faqs?.map((faq, idx) => (
              <div className="accordion-item" key={idx}>
                <h2
                  className="accordion-header"
                  id={`panelsStayOpen-heading${idx}`}
                >
                  <button
                    className={`accordion-button faq-accordion-button ${`collapsed`}`}
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
                  className={`accordion-collapse collapse`}
                  aria-labelledby={`panelsStayOpen-heading${idx}`}
                >
                  <div className="accordion-body faq-accordion-answer">
                    {parse(faq.answer!)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6 lg-faqs">
          <div className="accordion" id="accordionPanelsStayOpenExampleR">
            {faqsR?.map((faq, idx) => {
              idx += 5;
              return (
                <div className="accordion-item" key={idx}>
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
