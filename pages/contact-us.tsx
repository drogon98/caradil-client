import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { CustomHead } from "../components/CustomHead";
import Layout from "../components/Layouts/Layout";
import { ButtonLoading } from "../components/Loading/ButtonLoading";
import { ToastWrapper } from "../components/Toast/ToastWrapper";
import {
  ContactInput,
  useContactMutation,
} from "../graphql_types/generated/graphql";

const ContactUs: NextPage = () => {
  const [values, setValues] = useState<ContactInput>({
    email: "",
    subject: "",
    message: "",
  });
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [contact, { loading }] = useContactMutation({
    variables: { input: values },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await contact({
        variables: { input: values },
      });

      if (response.data?.contact.success) {
        setValues({ email: "", subject: "", message: "" });
        setShowSaveToast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CustomHead title="Contact Us" />
      <Layout>
        <div className="my-5">
          {/* <div className="contact-hero d-flex align-items-center justify-content-center">
            <div className="contact-overlay" />
            <div className="contact-hero-content colorOrange text-center">
              <h1 className="section-heading">How can we help?</h1>
              <p>Send us a message</p>
            </div>
          </div> */}
          <div className="row m-0">
            {showSaveToast && (
              <ToastWrapper
                setShow={setShowSaveToast}
                show={showSaveToast}
                message={"Message sent successfully!"}
                position="bottom-end"
                bg="success"
              />
            )}

            <div className="col-md-7 col-lg-4 mx-auto">
              <h1>Contact Us</h1>

              <form
                className="form-group mt-3"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="mb-4">
                  {/* <label htmlFor="email">Email</label> */}
                  <input
                    className="form-control px-2"
                    style={{ padding: "10px 0" }}
                    required
                    id="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                </div>
                <div className="mb-4">
                  {/* <label htmlFor="subject">What is this about?</label> */}
                  <select
                    className="form-select form-control px-2"
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={values.subject}
                    name="subject"
                    style={{ padding: "10px 0" }}
                  >
                    <option value={""}>What is this about?</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Inquiry">Technical Inquiry</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>
                <div className="mb-4">
                  {/* <label htmlFor="message">Message</label> */}
                  <textarea
                    placeholder="Go ahead, we are listening..."
                    className="form-control"
                    id="message"
                    value={values.message}
                    name="message"
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>
                <div>
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn bgOrange"
                      disabled={loading}
                    >
                      {loading ? (
                        <ButtonLoading
                          spinnerColor="white"
                          dimensions={{ height: "24px", width: "24px" }}
                        />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ContactUs;
