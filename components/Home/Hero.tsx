import Link from "next/link";
import React from "react";
// import { HeroCarousel } from "./HeroCarousel";

const Hero = (): JSX.Element => {
  return (
    <div className="homeHero page-section">
      <div className="heroOverlay" />
      <div className="homeHeroSubaru" />

      <div className="heroContent">
        <h1 className="section-heading">
          Find Your <span className="colorOrange hero-text-suffix">Drive</span>
        </h1>
        <p className="text-center">
          {" "}
          Explore africa's largest car sharing marketplace
        </p>
        <Link href="/browse-cars">
          <a className="btn bgOrange mt-4 text-light">Browse Cars</a>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
