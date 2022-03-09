import type { NextPage } from "next";
import { CustomHead } from "../components/CustomHead";
import Layout from "../components/layouts/Layout";

const AboutUs: NextPage = () => {
  return (
    <>
      <CustomHead title="About Us" />
      <Layout>
        <div className="mb-5">
          <div className="about-us-hero d-flex align-items-center justify-content-center">
            <div className="about-us-overlay" />
            <div className="about-us-hero-content colorOrange text-center">
              <h1>About Us</h1>
              {/* <p>Send us a message</p> */}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-center">Welcome To Caradil</h3>
            <p className="text-center col-md-7 mx-auto">
              We appreciate you taking the time today to visit our web site. Our
              goal is to make car sharing as simple as possible. Are you in the
              search for a ride for your next trip? Or, Do you want to put your
              idle car to use and make some money? You are at the right place.At
              Caradil, we strive to make it easier for you.
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-center">Mission</h3>
            <p className="text-center col-md-7 mx-auto">
              To be the go to car sharing marketplace in africa and globally.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AboutUs;
