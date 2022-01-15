import Link from "next/link";
import React from "react";
// import { HeroCarousel } from "./HeroCarousel";

const Hero = (): JSX.Element => {
  return (
    <div className="homeHero">
      <div className="heroOverlay" />
      <div className="homeHeroSubaru" />

      {/* <HeroCarousel /> */}
      <div className="heroContent">
        <h1>
          Plan your{" "}
          <span className="colorOrange hero-text-suffix">trip now</span>
          {/* Find Your Drive */}
        </h1>
        {/* <h5 className="mt-3">Find Your Best Car</h5> */}

        <Link href="/browse-cars">
          <a className="btn bgOrange mt-4 text-light">Browse Cars</a>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
