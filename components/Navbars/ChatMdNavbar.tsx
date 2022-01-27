import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import { BsArrowLeft } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../hooks/useRole";
import { AccountSideBarMenu } from "../layouts/AccountSideBarMenu";

interface ChatNavbarMdProps {}

const ChatNavbarMd = (props: ChatNavbarMdProps): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const router = useRouter();
  const [isHost, setIsHost] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState<boolean>();

  useEffect(() => {
    if (role === 2) {
      setIsHost(true);
    }
  }, [role]);

  const [redirectPath, setRedirectPath] = useState("/");

  const [isAuth, setIsAuth] = useState<boolean>();

  const handleOpeHamburgerClick = () => {
    // setHamburgerOpen(!hamburgerOpen);
    setShowSideMenu((prevState) => {
      if (prevState === undefined) {
        return true;
      }
      return prevState == true ? false : prevState === false ? true : undefined;
    });
  };

  const handleCloseHamburgerClick = () => {
    // setHamburgerOpen(!hamburgerOpen);
    setShowSideMenu((prevState) => {
      if (prevState === undefined) {
        return true;
      }
      return prevState == true ? false : prevState === false ? true : undefined;
    });
  };

  useEffect(() => {
    if (router.pathname) {
      if (router.pathname.split("/").length > 2) {
        setRedirectPath("/account");
      } else {
        setRedirectPath("/");
      }
    }
  }, [router.pathname]);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  return (
    <div className={`accountNavbar bgWhite shadow`}>
      <div className="w-100 h-100 d-flex p-2 px-3 align-items-center justify-content-between">
        <div>
          <button
            className="btn m-0 p-0 pl-2"
            onClick={async () => {
              await router.push("/account/chats");
            }}
          >
            <BsArrowLeft size={"30px"} />
          </button>
        </div>
        <div className="d-flex align-items-center">
          {" "}
          <img
            src="/images/mackenzi.png"
            style={{ objectFit: "cover", height: "40px", width: "40px" }}
            className="rounded-circle"
          />
          <h6 className="m-0">Mike</h6>
        </div>
        <div />
      </div>
    </div>
  );
};

export default ChatNavbarMd;
