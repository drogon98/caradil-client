import Link from "next/link";
import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Offcanvas } from "react-bootstrap";
import { carCategories, carColors, carMakes } from "../../data";
import { useAppSelector } from "../../redux/hooks";
import { useOutsideClickHandler } from "../hooks/useOutsideClickHandler";
import { useRole } from "../hooks/useRole";
import { AutoComplete } from "../Location/AutoComplete";
import { LogoutOverlay } from "../LogoutOverlay";
import BrowseCarsWhenComp from "./BrowseCarsWhenComp";
import { UserNavIcon } from "./UserNavIcon";

interface BrowseCarsNavbarProps {
  //   isHome?: boolean;
  animated?: boolean;
}

const BrowseCarsNavbar = ({ animated }: BrowseCarsNavbarProps): JSX.Element => {
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [isAuth, setIsAuth] = useState<boolean>();
  const loggingOut = useAppSelector((state) => state.logout.loggingOut);
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searching, setSearching] = useState(false);
  const [values, setValues] = useState<any>();
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const [showWhenComp, setShowWhenComp] = useState(false);
  const whenCompRef = useRef<HTMLDivElement>(null);
  const whenInputRef = useRef<HTMLInputElement>(null);

  useOutsideClickHandler(whenCompRef, setShowWhenComp, whenInputRef);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setValues({ ...(values ?? {}), [e.target.name]: e.target.value });
  };

  const handleLocationChange = () => {};

  const handleClearFilters = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValues(undefined);
    try {
      if (window) {
        // let params = new URLSearchParams({
        //   ...values!,
        // }).toString();
        // console.log("params :>> ", params);
        // window.location.href = "/browse-cars";
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleWhenFocus = (e: any) => {
    console.log("Focused");
    setShowWhenComp(true);
  };

  const handleWhereChange = (e: ChangeEvent<HTMLInputElement>) => {
    return;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearching(true);
    console.log("values :>> ", values);
    try {
      if (window) {
        let params = new URLSearchParams({
          ...values!,
        }).toString();
        console.log("params :>> ", params);
        // window.location.href = "/browse-cars";
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // console.log("carId :>> ", carId);

  return (
    <div className="browseCarsNav bgWhite shadow">
      <div className="customBrowseCarContainer d-flex align-items-center py-2 m-auto">
        <div className="brand">
          <Link href="/">
            <a>
              <h1 className="m0 brand-head">Caradil</h1>
            </a>
          </Link>
        </div>
        <div className="mainNavLinks d-flex">
          <div className="browseCarsNavLinksLeft d-flex align-items-center">
            <form
              className="form-group d-flex p-0 m-0 browse-cars-nav-form"
              onSubmit={handleSubmit}
            >
              <div className="input-group p-0 m-0 d-flex w-100">
                <div className="h-100 browse-nav-where-input">
                  {/* <input
                    type="text"
                    className="form-control w-100 h-100"
                    placeholder="Where?"
                    aria-describedby="basic-addon2"
                  /> */}
                  <AutoComplete
                    placeholder="Where?"
                    handler={handleLocationChange}
                    inputRef={inputRef}
                    name="location"
                    value={""}
                    // required={true}
                  />
                </div>
                <div className="h-100 browse-nav-when-input">
                  <input
                    type="text"
                    className="form-control h-100"
                    placeholder="When?"
                    aria-describedby="basic-addon2"
                    ref={whenInputRef}
                    // readOnly
                    onChange={handleWhereChange}
                    onFocus={handleWhenFocus}
                    value={values?.dates_and_time ?? ""}
                    // value={values.}
                  />
                  {showWhenComp && (
                    <BrowseCarsWhenComp whenCompRef={whenCompRef} />
                  )}
                </div>
                <div className="input-group-append h-100 browse-nav-search-input">
                  <button
                    type="submit"
                    ref={searchBtnRef}
                    className="btn bgOrange text-light h-100"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 32 32"
                      className="browse-cars-search-icon"
                    >
                      <g
                        fill="none"
                        stroke="currentcolor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <circle cx="14" cy="14" r="12" />
                        <path d="m23 23l7 7" />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <>
                  <button
                    className="btn browse-cars-nav-filter-btn"
                    onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      handleShow();
                    }}
                    title="More Filters"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 21 21"
                      className="browse-cars-filter-icon"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.5 4a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1zm12 2h-11m-2 0h-3m4 8a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm12 2h-11m-2 0h-3m12-7a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm-1 2h-11m16 0h-3"
                      />
                    </svg>
                  </button>
                  <Offcanvas show={show} onHide={handleClose} backdrop="false">
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>
                        <h3>More Filters</h3>
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <div>
                        <div className="d-flex justify-content-end mb-4">
                          <button
                            className="btn btn-md bg-secondary text-light"
                            onClick={handleClearFilters}
                          >
                            Clear Filters
                          </button>
                        </div>
                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="name">Car Name</label>
                            <button className="btn p-0 m-0 more-filters-mini-clear">
                              Clear
                            </button>
                          </div>
                          <input
                            className="form-control form-control-md"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="eg Subaru Forester 2010"
                            value={values?.name ?? ""}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="make">Make</label>
                            <button className="btn p-0 m-0 more-filters-mini-clear">
                              Clear
                            </button>
                          </div>
                          <select
                            id="make"
                            value={values?.make ?? ""}
                            name="make"
                            className="form-control"
                            onChange={handleChange}
                          >
                            <option value={""}>Choose Make...</option>
                            {carMakes.map((make, idx) => (
                              <option value={make.toLowerCase()} key={idx}>
                                {make}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="color">Color</label>
                            <button className="btn p-0 m-0 more-filters-mini-clear">
                              Clear
                            </button>
                          </div>
                          <select
                            id="color"
                            className="form-control"
                            onChange={handleChange}
                            value={values?.color ?? ""}
                            name="color"
                          >
                            <option value={""}>Choose Color...</option>
                            {carColors.map((color, idx) => {
                              return (
                                <option key={idx} value={color.toLowerCase()}>
                                  {color}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="trip_type">Trip Type</label>
                            <button className="btn p-0 m-0 more-filters-mini-clear">
                              Clear
                            </button>
                          </div>
                          <div>
                            <div className="custom-control custom-radio d-inline-block w-50">
                              <input
                                type="radio"
                                id="trip_type_leisure"
                                name="trip_type"
                                className="custom-control-input"
                              />
                              <p
                                className="custom-control-label ml-3 more-filters-text"
                                // htmlFor="trip_type_leisure"
                              >
                                Leisure / Tourism
                              </p>
                            </div>
                            <div className="custom-control custom-radio d-inline-block w-50">
                              <input
                                type="radio"
                                id="trip_type_business"
                                name="trip_type"
                                className="custom-control-input"
                              />
                              <p
                                className="custom-control-label more-filters-text"
                                // htmlFor="trip_type_business"
                              >
                                Business
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="trip_type">Trip Duration</label>
                            <button className="btn p-0 m-0 more-filters-mini-clear">
                              Clear
                            </button>
                          </div>
                          <div>
                            <div className="custom-control custom-radio d-inline-block w-50">
                              <input
                                type="radio"
                                id="trip_duration_less_than_24hrs"
                                name="trip_duration"
                                className="custom-control-input"
                              />
                              <p
                                className="custom-control-label m-0 more-filters-text"
                                // htmlFor="trip_duration_less_than_24hrs"
                              >
                                Less than 24hrs
                              </p>
                            </div>
                            <div className="custom-control custom-radio d-inline-block w-50">
                              <input
                                type="radio"
                                id="trip_duration_more_than_24hrs"
                                name="trip_duration"
                                className="custom-control-input"
                              />
                              <p
                                className="custom-control-label more-filters-text"
                                // htmlFor="trip_duration_more_than_24hrs"
                              >
                                More than 24hrs
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label>Categories</label>
                            <button className="btn p-0 m-0 more-filters-mini-clear">
                              Clear
                            </button>
                          </div>
                          <div className="categories-wrapper ">
                            {carCategories.map((category, idx) => {
                              // const isSelected = props.payload.categories?.find(
                              //   (cat) => cat === category.toLowerCase()
                              // );
                              return (
                                <div className="form-check" key={idx}>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={category}
                                    // checked={isSelected ? true : false}
                                    id="flexCheckDefault"
                                    // onChange={handleChange}
                                  />
                                  <p
                                    className="form-check-label more-filters-text"
                                    // htmlFor="flexCheckDefault"
                                  >
                                    {category}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                          <button
                            className="btn btn-md bg-secondary text-light"
                            onClick={(e: SyntheticEvent<HTMLButtonElement>) => {
                              e.preventDefault();
                              if (searchBtnRef && searchBtnRef.current) {
                                searchBtnRef.current.click();
                              }
                            }}
                          >
                            Apply Filters
                          </button>
                        </div>
                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>
                </>
              </div>
            </form>
          </div>

          <div className="browse-cars-nav-auth d-flex align-items-center">
            <div className="mainNavLinksRight d-flex align-items-center justify-content-end">
              <div className="browse-cars-nav-list-car">
                <Link
                  href={
                    role === 2 ? "/account/listings/add-car" : "/list-your-car"
                  }
                >
                  <a className="d-flex align-items-center list-car-navbar h-100">
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
      </div>

      {loggingOut && <LogoutOverlay />}
    </div>
  );
};

export default BrowseCarsNavbar;
