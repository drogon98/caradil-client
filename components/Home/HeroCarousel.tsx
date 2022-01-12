import Link from "next/link";
import React from "react";

export interface HeroCarouselProps {}

export function HeroCarousel(props: HeroCarouselProps) {
  return (
    <div
      id="carouselExampleControlsNoTouching"
      className="carousel slide"
      data-bs-ride="carousel"
      //   data-bs-touch="false"
      //   data-bs-interval="false"
    >
      <div className="carousel-inner">
        <div className="carousel-item homeHero homeHeroSubaru active">
          <Link href="/">
            <a>
              <button className="btn bgOrange hero-carousel-btn">
                Browse Subaru
              </button>
            </a>
          </Link>
        </div>
        <div className="carousel-item homeHero homeHeroJeep">
          <Link href="/">
            <a>
              <button className="btn bgOrange hero-carousel-btn">
                Browse Jeep
              </button>
            </a>
          </Link>
        </div>
        <div className="carousel-item homeHero homeHeroBus">
          <Link href="/">
            <a>
              <button className="btn bgOrange hero-carousel-btn">
                Browse Buses
              </button>
            </a>
          </Link>
        </div>
        <div className="carousel-item homeHero homeHeroSafariLandCruiser">
          <Link href="/">
            <a>
              <button className="btn bgOrange hero-carousel-btn">
                Browse Safaris
              </button>
            </a>
          </Link>
        </div>
        <div className="carousel-item homeHero homeHeroLuxuries">
          <Link href="/">
            <a>
              <button className="btn bgOrange hero-carousel-btn">
                Browse Luxuries
              </button>
            </a>
          </Link>
        </div>
        {/* <div className="carousel-item homeHero homeHeroSafariTruck"></div> */}
        {/*  */}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
