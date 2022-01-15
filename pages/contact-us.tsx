import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import Layout from "../components/layouts/Layout";
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="customContainer my-5">
          <div className="row">
            <div className="col-md-7 col-lg-5 mx-auto">
              <h3>Reach Out</h3>

              <form
                className="form-group mt-3"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    required
                    id="email"
                    placeholder="johndoe@gmail.com"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject">Subject</label>
                  <select
                    className="form-select form-control"
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={values.subject}
                    name="subject"
                  >
                    <option value={""}>Select Subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Inquiry">Technical Inquiry</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    value={values.message}
                    name="message"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn bgOrange"
                      disabled={loading}
                    >
                      Submit
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
