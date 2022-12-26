import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useEditCarPublishedMutation } from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";
import { useRole } from "../hooks/useRole";
import { LogoutOverlay } from "../LogoutOverlay";
import { UserNavIcon } from "./UserNavIcon";

interface MainNavbarProps {
  isHome?: boolean;
  animated?: boolean;
}

const MainNavbar = ({ isHome, animated }: MainNavbarProps): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [isAuth, setIsAuth] = useState<boolean>();
  const router = useRouter();
  const [isCarPreview, setIsCarPreview] = useState(false);
  const [editCarPublished, { loading }] = useEditCarPublishedMutation();
  const [carId, setCarId] = useState<string>();
  const loggingOut = useAppSelector((state) => state.logout.loggingOut);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  useEffect(() => {
    if (router && router.query) {
      try {
        let tempIsCarPreview = router.query.is_car_preview;
        if (tempIsCarPreview) {
          setIsCarPreview(true);

          let tempId = router.query.id as string;

          setCarId(tempId);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [router]);

  const handleClick = async (e: any) => {
    try {
      const response = await editCarPublished({
        variables: { carId: carId! },
      });
      if (response.data?.editCarPublished) {
        sessionStorage.removeItem("carId");

        // Do something like a toast
        await router.replace("/account/listings");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // console.log("carId :>> ", carId);

  return (
    <div
      className={
        isHome && animated
          ? "mainNavbar bgWhite shadow"
          : isHome
          ? "heroNav"
          : "mainNavbar bgWhite shadow"
      }
      // className="mainNavbar bgWhite shadow"
    >
      <div className="customContainer d-flex py-2 my-auto">
        <div className="brand">
          <h1 className="m0">
            <Link href="/">
              <a>
                <span>Caradil</span>
              </a>
            </Link>
          </h1>
        </div>
        <div className="mainNavLinks d-flex">
          <div className="mainNavLinksLeft d-flex align-items-center justify-content-around">
            <div>
              <Link href="/browse-cars">
                <a>
                  <small>Browse Cars</small>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/faqs">
                <a>
                  <small>Get Help</small>
                </a>
              </Link>
            </div>
            <div>
              {/* <Link href="/contact-us">
                <a>
                  <small>Contact Us</small>
                </a>
              </Link> */}
            </div>
          </div>
          <div className="mainNavLinksRight d-flex align-items-center justify-content-end">
            <div>
              <Link
                href={
                  role === 2 ? "/account/listings/add-car" : "/list-your-car"
                }
              >
                <a className="d-flex align-items-center list-car-navbar h-100">
                  {/* <span>
                    <Icon icon="akar-icons:circle-plus" />{" "}
                    <BiPlusCircle size={"18px"} />
                  </span> */}
                  <span>
                    <small>List Your Car</small>
                  </span>
                </a>
              </Link>
            </div>
            <div className="marginLeft30px">
              {isAuth ? (
                <>
                  <UserNavIcon />
                </>
              ) : (
                <div className="d-flex align-items-center">
                  <div
                    style={{ width: "60px" }}
                    className="d-flex justify-content-center"
                  >
                    <Link href="/login">
                      <a>
                        <small>Sign In</small>
                      </a>
                    </Link>
                  </div>
                  <div className="d-flex sign-up-link">
                    |
                    <div
                      className="d-flex justify-content-center"
                      style={{ width: "60px" }}
                    >
                      {" "}
                      <Link href="/register">
                        <a>
                          <small>Sign Up</small>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isCarPreview && (
        <div className="main-navbar-car-preview-banner bg-warning text-center">
          <span className="d-flex justify-content-center align-items-center">
            {" "}
            <small>This is the preview of your car. If its ok, </small>
            <button className="btn m-0 p-0" onClick={handleClick}>
              <small>
                <b>Publish It Now</b>
              </small>
            </button>
          </span>
        </div>
      )}
      {loggingOut && <LogoutOverlay />}
    </div>
  );
};

export default MainNavbar;
