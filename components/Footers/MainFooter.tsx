import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { FaInstagram } from "react-icons/fa";
import {
  FiFacebook,
  FiLinkedin,
  FiSmartphone,
  FiTwitter,
} from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";

interface IProps {}

export const MainFooter: FC<IProps> = (props) => {
  const router = useRouter();
  const [isCarPage, setIsCarPage] = useState(false);
  const { width, height } = useWindowDimensions();
  const [isBrowseCars, setIsBrowseCars] = useState(false);

  useEffect(() => {
    if (
      Object.keys(router.query).length === 2 &&
      router.query.slug &&
      router.query.id
    ) {
      setIsCarPage(true);
    }
  }, [router]);

  useEffect(() => {
    if (router.pathname.includes("browse-cars")) {
      setIsBrowseCars(true);
    } else {
      setIsBrowseCars(false);
    }
  }, [router]);

  // console.log("router :>> ", router);

  if (isCarPage && width <= 800) {
    return null;
  }
  return (
    <div className="bgBlack text-light">
      <div
        className={`${
          isBrowseCars ? `customBrowseCarContainer` : `customContainer`
        } py-5 px-0`}
      >
        <div className="main-footer-wrapper mb-4 m-0 p-0">
          <div className="">
            <h5>Caradil</h5>
            <div>
              <p>
                <Link href="/about-us">About</Link>
              </p>
              <p>
                <Link href="/contact-us">Contact</Link>
              </p>
              {/* <p>
                <Link href="/contact-us">Testimonies</Link>
              </p> */}
              {/* <p>
                <Link href="/contact-us">Careers</Link>
              </p> */}
              <p>
                <Link href="/faqs">Get Help</Link>
              </p>{" "}
              <p>
                <Link href="/policies/terms">Policies</Link>
              </p>
            </div>
          </div>

          <div className="">
            <h5>Explore</h5>
            <div>
              <p>
                <Link href="/browse-cars">Browse cars</Link>
              </p>{" "}
              <p>
                <Link href="/weddings">Weddings</Link>
              </p>{" "}
              {/* <p>
                <Link href="/">Luxuries & VIPs</Link>
              </p>{" "} */}
              <p>
                <Link href="/tours">Tours & Safaris</Link>
              </p>
              <p>
                <Link href="/">Sports</Link>
              </p>{" "}
            </div>
          </div>
          <div className="">
            <h5>Hosting</h5>
            <div>
              <p>
                <Link href="/list-your-car">List your car</Link>
              </p>
              {/* <p>
                <Link href="/">Calculator</Link>
              </p>{" "}
              <p>
                <Link href="/">Carasure</Link>
              </p>
              <p>
                <Link href="/">Photography</Link>
              </p> */}
            </div>
          </div>
          <div className="">
            <h5>Contact Info</h5>
            <p>
              <FiSmartphone />
              &nbsp;&nbsp;
              <a href="tel:+254799204524">+254799204524</a>
            </p>
            <p>
              <AiOutlineMail />
              &nbsp;&nbsp;
              <a href="mailto:contact@caradil.com">contact@caradil.com</a>
            </p>
          </div>
          <div className="">
            <h5>Get Social</h5>
            <div>
              <p className="mb-2">
                <a
                  target="_blank"
                  href="https://www.facebook.com/Caradil-104656882145709"
                >
                  <span className="d-flex align-items-center">
                    <FiFacebook size={"25px"} />
                  </span>
                </a>
              </p>
              <p className="mb-2">
                <a target="_blank" href="https://instagram.com">
                  <span className="d-flex align-items-center">
                    <FaInstagram size={"25px"} />
                  </span>
                </a>
              </p>

              <p className="mb-2">
                <a target="_blank" href="https://twitter.com">
                  <span className="d-flex align-items-center">
                    <FiTwitter size={"25px"} />
                  </span>
                </a>
              </p>
              {/* FiLinkedin */}
              <p className="mb-2">
                <a target="_blank" href="https://linkedin.com">
                  <span className="d-flex align-items-center">
                    <FiLinkedin size={"25px"} />
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
        <div>
          <p id="footer-copyright">
            &copy; {new Date().getFullYear()} <span>Caradil</span>
          </p>
        </div>
      </div>
    </div>
  );
};
