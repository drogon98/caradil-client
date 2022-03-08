import Link from "next/link";
import React from "react";
import { CustomHead } from "../components/CustomHead";
import { BrowseByMake } from "../components/BrowseByMake";
import Layout from "../components/layouts/Layout";

export default function Weddings() {
  return (
    <div>
      <CustomHead title="Weddings" />
      <Layout>
        <div className="my-5">
          <div className="customContainer">
            <div className="row align-items-center">
              <div className="col-md-6">
                <img
                  src="images/weddhero2.jpg"
                  width={"100%"}
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </div>
              <div className="col-md-6 text-center mt-4 mt-md-0">
                <h1>Wedding Getaway Cars</h1>
                <p>Drive off to your happily ever after in style</p>
                <Link
                  href={{
                    pathname: "/browse-cars",
                    query: { categories: ["wedding"] },
                  }}
                >
                  <a className="btn bgOrange mt-4">Find Your Wedding Car</a>
                </Link>
              </div>
            </div>
            <br />
            <br />
            <div className="my-5">
              <BrowseByMake />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
