import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { MainFooter } from "../Footers/MainFooter";
import BrowseCarsNavbar from "../Navbars/BrowseCarsNavbar";
import MainNavbar from "../Navbars/MainNavbar";

interface LayoutProps {
  isHome?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isHome }): JSX.Element => {
  const topRef = useRef<HTMLDivElement>(null);
  // useRef is a generic function
  // A ref is initially set to null
  const [showAnimatedNavbar, setShowAnimatedNavbar] = useState(false);
  const router = useRouter();
  const [isBrowseCars, setIsBrowseCars] = useState(false);

  useEffect(() => {
    if (router.pathname.includes("browse-cars")) {
      setIsBrowseCars(true);
    } else {
      setIsBrowseCars(false);
    }
  }, [router]);

  const scrollHandler = () => {
    if (topRef && topRef.current) {
      // Since the ref can be null we need to check it first
      let navbarSrollDistance = topRef.current.getBoundingClientRect().top;
      if (Math.abs(navbarSrollDistance) > 150) {
        setShowAnimatedNavbar(true);
      } else {
        setShowAnimatedNavbar(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);

    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };
  }, []);

  return (
    <div id="mainLayoutWrapper">
      <div id="mainContentWrapper">
        <header>
          <div style={{ height: isHome ? "" : "70px" }}>
            {isBrowseCars ? (
              <BrowseCarsNavbar />
            ) : showAnimatedNavbar ? (
              <div className="animated-navbar">
                <MainNavbar isHome={isHome} animated />
              </div>
            ) : isHome ? (
              <MainNavbar isHome={isHome} />
            ) : (
              <MainNavbar />
            )}
          </div>
        </header>
        <main>
          <div ref={topRef} />
          {children}
        </main>
      </div>
      <footer id="footerWrapper">
        <MainFooter />
      </footer>
    </div>
  );
};

export default Layout;
