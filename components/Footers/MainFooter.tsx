import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

interface IProps {}

/**
 * @author
 * @function @MainFooter
 **/

export const MainFooter: FC<IProps> = (props) => {
  const router = useRouter();
  const [isCarPage, setIsCarPage] = useState(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (
      Object.keys(router.query).length === 2 &&
      router.query.slug &&
      router.query.id
    ) {
      setIsCarPage(true);
    }
  }, [router]);

  // console.log("router :>> ", router);

  if (isCarPage && width <= 800) {
    return null;
  }
  return (
    <div className="bgBlack text-light">
      <div className="customContainer py-5 px-0">
        <div className="row m-0 p-0">
          <div className="col-md-6 col-lg-3 p-0 pr-2">
            <h3>Logo</h3>
            <p>
              Plan Your Trip With Caradil. Rent a Car Online Today & Enjoy the
              Best Deals.
            </p>
          </div>
          <div className="col-md-6 col-lg-3">
            <h3>Caradil</h3>
            <ul>
              <li>
                <Link href="/">About</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3">
            <h3>Explore</h3>
            <ul>
              <li>
                <Link href="/browse-cars">Browse cars</Link>
              </li>{" "}
              <li>
                <Link href="/browse-cars">Book a car</Link>
              </li>{" "}
              <li>
                <Link href="/">Trust & Safety</Link>
              </li>{" "}
              <li>
                <Link href="/">Get Help</Link>
              </li>{" "}
              <li>
                <Link href="/">FAQs</Link>
              </li>{" "}
            </ul>
          </div>
          <div className="col-md-6 col-lg-3">
            <h3>Hosting</h3>
            <ul>
              <li>
                <Link href="/">List your car</Link>
              </li>
              <li>
                <Link href="/">Trust & Safety</Link>
              </li>{" "}
              <li>
                <Link href="/">FAQS</Link>
              </li>
              <li>
                <Link href="/">Carasure</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <p>
            &copy; {new Date().getFullYear()} <span>Caradil</span>
          </p>
        </div>
      </div>
    </div>
  );
};
