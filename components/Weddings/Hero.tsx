import Link from "next/link";
import React from "react";
import CustomImage from "../Image";

interface IHeroProps {}

export default function Hero(props: IHeroProps) {
  return (
    <div className="customContainer my-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <CustomImage
            src="/images/weddhero2.jpg"
            alt="Weddings"
            height={"300px"}
            width={"500px"}
            layout="responsive"
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
    </div>
  );
}
