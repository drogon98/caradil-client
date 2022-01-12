import React, { useEffect, useRef, useState } from "react";
import AccountNavbar from "../Navbars/AccountNavbar";
import Link from "next/link";
import { useRole } from "../hooks/useRole";
import { useAppSelector } from "../../redux/hooks";

interface AdminLayoutProps {
  isHome?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  isHome,
}): JSX.Element => {
  const topRef = useRef<HTMLDivElement>();
  const [showAnimatedNavbar, setShowAnimatedNavbar] = useState(false);
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);

  const scrollHandler = () => {
    if (topRef?.current) {
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
    <div id="accountLayoutWrapper">
      <div id="accountContentWrapper">
        <header>
          <AccountNavbar />
        </header>
        <main>
          <div className="admin-wrapper">
            <div className="admin-sidebar">
              <div className="admin-side-menu">
                <ul className="list-style-none pl-0 pl-3">
                  <li>
                    <Link
                      href="/account/personal-details"
                      data-testid="test-link"
                    >
                      <a className="link black-link">Personal Details</a>
                    </Link>
                  </li>
                  {role === 2 && (
                    <li>
                      <Link href="/root/listings">
                        <a className="link black-link">Listings</a>
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link href="/root/car-makes">
                      <a className="link black-link">Car Makes</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/chats">
                      <a className="link black-link">Chats</a>
                    </Link>
                  </li>
                  {role === 2 && (
                    <li>
                      <Link href="/account/chats">
                        <a className="link black-link">Earnings</a>
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href="/account/notifications">
                      <a className="link black-link">Notifications</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/settings">
                      <a className="link black-link">Settings</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="admin-content">{children}</div>
          </div>
          {/* {children} */}
        </main>
      </div>
      {/* <footer id="footerWrapper">
        <MainFooter />
      </footer> */}
    </div>
  );
};

export default AdminLayout;
