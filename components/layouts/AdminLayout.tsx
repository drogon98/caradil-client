import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../hooks/useRole";
import AdminNavbar from "../Navbars/AdminNavbar";

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
          <AdminNavbar />
        </header>
        <main>
          <div className="admin-wrapper">
            <div className="admin-sidebar">
              <div className="admin-side-menu pt-4">
                <ul className="list-style-none pl-0 pl-3">
                  <li>
                    <Link href="/root/users">
                      <a className="link white-link">Users</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/root/listings">
                      <a className="link white-link">Listings</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/root/car-makes">
                      <a className="link white-link">Car Makes</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/root/transactions">
                      <a className="link white-link">Transactions</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/root/faqs">
                      <a className="link white-link">Faqs</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/root/enquiries">
                      <a className="link white-link">Enquiries</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="admin-content">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
