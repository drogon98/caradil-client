import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Offcanvas } from "react-bootstrap";
import { carCategories, carColors, carMakes, carSeats } from "../../data";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeMoreFilters, showMoreFilters } from "../../redux/searchSlice";
import { numericInput } from "../../utils/regex_";
import { useOutsideClickHandler } from "../hooks/useOutsideClickHandler";
import { useRole } from "../hooks/useRole";
import { getLongLat, PlacesAutocomplete } from "../Location/AutoComplete";
import { LogoutOverlay } from "../LogoutOverlay";
import BrowseCarsWhenComp from "../BrowseCars/BrowseCarsWhenComp";
import { UserNavIcon } from "./UserNavIcon";
import { TripDatesObj } from "../../utils/interfaces";
import { getTripDuration } from "../../utils/trip_duration_ttl_calc";
import { LocationCords } from "../../graphql_types/generated/graphql";

const BrowseCarsNavbar = (): JSX.Element => {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [isAuth, setIsAuth] = useState<boolean>();
  const loggingOut = useAppSelector((state) => state.logout.loggingOut);
  // const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.search.show_more_filters);
  const handleClose = () => {
    dispatch(closeMoreFilters());
  };
  const handleShow = () => {
    dispatch(showMoreFilters());
  };
  const [values, setValues] = useState<any>();
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const [showWhenComp, setShowWhenComp] = useState(false);
  const [showSmWhenComp, setShowSmWhenComp] = useState(false);
  const whenCompRef = useRef<HTMLDivElement>(null);
  const whenSmCompRef = useRef<HTMLDivElement>(null);
  const whenInputRef = useRef<HTMLInputElement>(null);
  const whenSmDivRef = useRef<HTMLDivElement>(null);
  const [dateTime, setDateTime] = useState<TripDatesObj | undefined>({
    start_date: null,
    end_date: null,
    start_time: "",
    end_time: "",
  });
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [location, setLocation] = useState("");
  const [locationCords, setLocationCords] = useState<LocationCords>();
  const [rateError, setRateError] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    let date = new Date();
    return date.getTime();
  });
  const [endDate, setEndDate] = useState(() => {
    let date = new Date();
    return date.getTime();
  });
  const [tripDuration, setTripDuration] = useState("");

  useOutsideClickHandler(whenCompRef, setShowWhenComp, whenInputRef);
  useOutsideClickHandler(whenSmCompRef, setShowSmWhenComp, whenSmDivRef);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  useEffect(() => {
    // Populate values,datetime and location
    try {
      if (router && router.query) {
        // console.log("router.query", router.query);
        if (router.query.start_time) {
          let tempDateTime = {
            start_time: router.query.start_time as string,
            end_time: router.query.end_time as string,
            start_date: parseInt(router.query.start_date as string, 10),
            end_date: parseInt(router.query.end_date as string, 10),
          };
          setDateTime({ ...tempDateTime });
        } else {
          setDateTime(undefined);
          setDateTimeInput("");
        }

        let tempValues = {};

        if (router.query.categories) {
          let rawCategories = router.query.categories as string;
          let categories = rawCategories?.split(",");
          tempValues = { ...tempValues, categories };
        }

        if (router.query.location) {
          setLocation(router.query.location as string);
          if (router.query.longitude) {
            setLocationCords({
              ...(locationCords ?? {}),
              longitude: parseFloat(router.query.longitude as string),
            });
          }

          if (router.query.latitude) {
            setLocationCords({
              ...(locationCords ?? {}),
              latitude: parseFloat(router.query.latitude as string),
            });
          }
        } else {
          setLocation("");
        }

        if (router.query.name) {
          tempValues = { ...tempValues, name: router.query.name as string };
        }

        if (router.query.color) {
          tempValues = { ...tempValues, color: router.query.color as string };
        }

        if (router.query.make) {
          tempValues = { ...tempValues, make: router.query.make as string };
        }

        if (router.query.seats) {
          tempValues = { ...tempValues, seats: router.query.seats as string };
        }

        if (router.query.end_user_type) {
          tempValues = {
            ...tempValues,
            end_user_type: router.query.end_user_type as string,
          };
        }

        if (router.query.trip_duration) {
          tempValues = {
            ...tempValues,
            trip_duration: router.query.trip_duration as string,
          };
        }

        if (router.query.trip_type) {
          tempValues = {
            ...tempValues,
            trip_type: router.query.trip_type as string,
          };
        }

        if (router.query.car_market_class) {
          tempValues = {
            ...tempValues,
            car_market_class: router.query.car_market_class as string,
          };
        }

        if (router.query.min_rate) {
          tempValues = {
            ...tempValues,
            min_rate: router.query.min_rate as string,
          };
        }

        if (router.query.max_rate) {
          tempValues = {
            ...tempValues,
            max_rate: router.query.max_rate as string,
          };
        }
        setValues({ ...tempValues });
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [router.query]);

  useEffect(() => {
    if (
      dateTime &&
      dateTime.start_date &&
      dateTime.start_time &&
      dateTime.end_date &&
      dateTime.end_time
    ) {
      let s = `start_time=${dateTime.start_time}&end_time=${dateTime.end_time}&start_date=${dateTime.start_date}&end_date=${dateTime.end_date}`;
      setDateTimeInput(s);
      let tempTripDuration = getTripDuration(dateTime);
      if (tempTripDuration.duration === 1) {
        setTripDuration("less_24");
      } else {
        setTripDuration("more_24");
      }
    } else {
      setDateTimeInput("");
    }
  }, [dateTime]);

  useEffect(() => {
    if (values && Object.keys(values).length > 0) {
      setShowClearFilter(true);
    } else {
      setShowClearFilter(false);
    }
  }, [values]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.name === "category") {
      let tempCategories = [...(values?.categories ?? [])];
      let categoryExists = tempCategories.some((cat) => cat === e.target.value);
      let newCategories = [];

      if (categoryExists) {
        newCategories = tempCategories.filter((cat) => cat !== e.target.value);
        if (newCategories.length === 0) {
          delete values.categories;
          setValues({ ...(values ?? {}) });
        } else {
          setValues({ ...(values ?? {}), categories: newCategories });
        }
      } else {
        newCategories = [...tempCategories, e.target.value];
        setValues({ ...(values ?? {}), categories: newCategories });
      }
    } else if (e.target.name === "min_rate" || e.target.name === "max_rate") {
      if (e.target.value && !numericInput.test(e.target.value)) {
        return;
      }
      setValues({ ...(values ?? {}), [e.target.name]: e.target.value });
    } else if (e.target.name === "trip_duration") {
      // setDateTime(undefined);
      // setDateTimeInput("");
      setTripDuration(e.target.value);
      setValues({ ...(values ?? {}), [e.target.name]: e.target.value });
    } else {
      setValues({ ...(values ?? {}), [e.target.name]: e.target.value });
    }
  };

  const handleClearFilters = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValues(undefined);
    setTripDuration("");
    setDateTime(undefined);
    setStartDate(() => {
      let date = new Date();
      return date.getTime();
    });
    setEndDate(() => {
      let date = new Date();
      return date.getTime();
    });
    setLocation("");
    setLocationCords(undefined);
    try {
      // let payload = {};

      // if (location) {
      //   payload = { location };
      // }

      // if (dateTime) {
      //   payload = { ...payload, ...dateTime };
      // }

      router.push(
        {
          pathname: "/browse-cars",
          // query: { ...payload },
        },
        ``,
        { shallow: true }
      );
      handleClose();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleWhenFocus = (e: any) => {
    // console.log("Focused");
    if (showWhenComp) {
      setShowWhenComp(false);
    } else {
      setShowWhenComp(true);
    }
  };

  const handleSmWhenFocus = (e: any) => {
    // console.log("Focused");
    setShowSmWhenComp(!showSmWhenComp);
  };

  const handleWhenChange = (e: ChangeEvent<HTMLInputElement>) => {
    return;
  };

  const handleRateFocus = () => {
    if (rateError) {
      setRateError(false);
    }
  };

  // console.log("locationCords", locationCords);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (values?.max_rate) {
        if (parseInt(values.max_rate, 10) < parseInt(values.min_rate, 10)) {
          setRateError(true);
          return;
        }
      }
      let payload = { ...values! };

      if (location) {
        payload = { ...payload, location };
        let tempLocCords;
        if (!locationCords) {
          let cords = await getLongLat(location);
          tempLocCords = cords;
        } else {
          tempLocCords = locationCords;
        }

        payload = {
          ...payload,
          longitude: tempLocCords.longitude ?? null,
          latitude: tempLocCords.latitude ?? null,
        };
      }

      if (dateTimeInput) {
        payload = { ...payload, ...dateTime! };
      }

      if (payload.categories) {
        payload = { ...payload, categories: payload.categories.join() };
      }

      if (tripDuration) {
        payload = { ...payload, trip_duration: tripDuration };
      }

      router.push(
        {
          pathname: "/browse-cars",
          query: { ...payload },
        },
        ``,
        { shallow: true }
      );

      if (show) {
        handleClose();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div className="browseCarsNav bgWhite shadow">
      <div className="customBrowseCarContainer d-flex align-items-center py-2 m-auto">
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
          <div className="browseCarsNavLinksLeft d-flex align-items-center">
            <form
              className="form-group d-flex p-0 m-0 browse-cars-nav-form"
              onSubmit={handleSubmit}
            >
              <div className="input-group p-0 m-0 d-flex w-100">
                <div className="h-100 browse-nav-where-input">
                  <PlacesAutocomplete
                    setLocation={setLocation}
                    location={location}
                    setLocationCords={setLocationCords}
                    geocodeEstablishments={true}
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
                    onChange={handleWhenChange}
                    onFocus={handleWhenFocus}
                    value={dateTimeInput}
                    // value={values.}
                  />
                  {showWhenComp && (
                    <BrowseCarsWhenComp
                      whenCompRef={whenCompRef}
                      dateTime={dateTime!}
                      setDateTime={setDateTime}
                      dateTimeInput={dateTimeInput}
                      setShowWhenComp={setShowWhenComp}
                      values={values}
                      setValues={setValues}
                      setDateTimeInput={setDateTimeInput}
                      searchBtnRef={searchBtnRef}
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      setTripDuration={setTripDuration}
                    />
                  )}
                </div>
                <div className="input-group-append h-100 browse-nav-search-input">
                  <button
                    type="submit"
                    ref={searchBtnRef}
                    className="btn bgOrange text-light h-100 d-flex align-items-center"
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
                  <div
                    className="d-flex align-items-center h-100"
                    style={{ position: "relative" }}
                  >
                    <button
                      className="btn browse-cars-nav-filter-btn py-0 pr-0"
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
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
                    {showClearFilter && (
                      <div className="browse-cars-filters-counter" />
                    )}
                  </div>
                  <Offcanvas show={show} onHide={handleClose} backdrop="false">
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>
                        <h3>More Filters</h3>
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="p-2">
                      <div id="more-filter-offcanvas">
                        {showClearFilter && (
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-md bg-secondary text-light"
                              onClick={handleClearFilters}
                            >
                              Clear Filters
                            </button>
                          </div>
                        )}

                        <div className="my-4">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="name">Car Name</label>
                            <button
                              className="btn p-0 m-0 more-filters-mini-clear"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  if (values?.name) {
                                    delete values.name;
                                    setValues({ ...values });
                                    await router.push(
                                      {
                                        pathname: "/browse-cars",
                                        query: { ...values },
                                      },
                                      ``,
                                      { shallow: true }
                                    );
                                  }
                                } catch (error) {}
                              }}
                              disabled={!values?.name}
                            >
                              Clear
                            </button>
                          </div>
                          <input
                            className={`form-control form-control-md mt-1 ${
                              values?.name && `more-filter-active`
                            }`}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="eg Subaru Forester 2010"
                            value={values?.name ?? ""}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="browse-nav-when-sm-input mb-3 w-100">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="name">When?</label>
                            <button
                              className="btn p-0 m-0 more-filters-mini-clear"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  if (dateTimeInput) {
                                    setDateTimeInput("");
                                    setDateTime(undefined);
                                    delete values.start_time;
                                    delete values.end_time;
                                    delete values.start_date;
                                    delete values.end_date;
                                    let newValues = { ...values };
                                    setValues({ ...newValues });
                                    await router.push(
                                      {
                                        pathname: "/browse-cars",
                                        query: { ...values },
                                      },
                                      ``,
                                      { shallow: true }
                                    );
                                  }
                                } catch (error) {}
                              }}
                              disabled={!dateTimeInput}
                            >
                              Clear
                            </button>
                          </div>
                          <div
                            className={`cursor-pointer sm-when-input p-2 mt-1 ${
                              dateTimeInput && `more-filter-active`
                            }`}
                            ref={whenSmDivRef}
                            onClick={handleSmWhenFocus}
                          >
                            {dateTimeInput ? dateTimeInput : "When?"}
                          </div>
                          {showSmWhenComp && (
                            <BrowseCarsWhenComp
                              whenCompRef={whenSmCompRef}
                              dateTime={dateTime!}
                              setDateTime={setDateTime}
                              dateTimeInput={dateTimeInput}
                              setShowWhenComp={setShowSmWhenComp}
                              values={values}
                              setDateTimeInput={setDateTimeInput}
                              searchBtnRef={searchBtnRef}
                              setValues={setValues}
                              startDate={startDate}
                              endDate={endDate}
                              setStartDate={setStartDate}
                              setEndDate={setEndDate}
                              setTripDuration={setTripDuration}
                            />
                          )}
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="make">Make</label>
                            <button
                              className="btn p-0 m-0 more-filters-mini-clear"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  if (values?.make) {
                                    delete values?.make;
                                    setValues({ ...values });
                                    await router.push(
                                      {
                                        pathname: "/browse-cars",
                                        query: { ...values },
                                      },
                                      ``,
                                      { shallow: true }
                                    );
                                  }
                                } catch (error) {}
                              }}
                              disabled={!values?.make}
                            >
                              Clear
                            </button>
                          </div>
                          <select
                            id="make"
                            value={values?.make ?? ""}
                            name="make"
                            className={`form-control form-control-md mt-1 ${
                              values?.make && `more-filter-active`
                            }`}
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
                            <button
                              className="btn p-0 m-0 more-filters-mini-clear"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  if (values?.color) {
                                    delete values?.color;
                                    setValues({ ...values });
                                    await router.push(
                                      {
                                        pathname: "/browse-cars",
                                        query: { ...values },
                                      },
                                      ``,
                                      { shallow: true }
                                    );
                                  }
                                } catch (error) {
                                  console.log("error", error);
                                }
                              }}
                              disabled={!values?.color}
                            >
                              Clear
                            </button>
                          </div>
                          <select
                            id="color"
                            className={`form-control form-control-md mt-1 ${
                              values?.color && `more-filter-active`
                            }`}
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
                            <label htmlFor="seats">Seats</label>
                            <button
                              className="btn p-0 m-0 more-filters-mini-clear"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  if (values?.seats) {
                                    delete values?.seats;
                                    setValues({ ...values });
                                    await router.push(
                                      {
                                        pathname: "/browse-cars",
                                        query: { ...values },
                                      },
                                      ``,
                                      { shallow: true }
                                    );
                                  }
                                } catch (error) {
                                  console.log("error", error);
                                }
                              }}
                              disabled={!values?.seats}
                            >
                              Clear
                            </button>
                          </div>
                          <select
                            id="seats"
                            className={`form-control form-control-md mt-1 ${
                              values?.seats && `more-filter-active`
                            }`}
                            onChange={handleChange}
                            value={values?.seats ?? ""}
                            name="seats"
                          >
                            <option value={""}>Choose Seats...</option>
                            {carSeats().map((seat, idx) => {
                              return (
                                <option key={idx} value={seat}>
                                  {seat}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="end_user_type">End User Type</label>
                            <button
                              className="btn p-0 m-0 more-filters-mini-clear"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  if (values?.end_user_type) {
                                    delete values?.end_user_type;
                                    setValues({ ...values });
                                    await router.push(
                                      {
                                        pathname: "/browse-cars",
                                        query: { ...values },
                                      },
                                      ``,
                                      { shallow: true }
                                    );
                                  }
                                } catch (error) {}
                              }}
                              disabled={!values?.end_user_type}
                            >
                              Clear
                            </button>
                          </div>
                          <div>
                            <div className="custom-control custom-radio d-inline-block w-50 mt-1">
                              <div className="d-flex align-items-center">
                                <input
                                  type="radio"
                                  id="end_user_type_chauffeur_self"
                                  name="end_user_type"
                                  className="custom-control-input w-25"
                                  value={"self_driven"}
                                  onChange={handleChange}
                                  checked={
                                    values?.end_user_type === "self_driven"
                                  }
                                />
                                <p
                                  className="custom-control-label ml-3 more-filters-text w-75"
                                  // htmlFor="trip_type_leisure"
                                >
                                  Self Driven
                                </p>
                              </div>
                            </div>
                            <div className="custom-control custom-radio d-inline-block w-50">
                              <div className="d-flex align-items-center">
                                <input
                                  type="radio"
                                  id="end_user_type_chauffeur"
                                  name="end_user_type"
                                  className="custom-control-input w-25"
                                  value={"chauffeur_driven"}
                                  onChange={handleChange}
                                  checked={
                                    values?.end_user_type === "chauffeur_driven"
                                  }
                                />
                                <p
                                  className="custom-control-label more-filters-text w-75"
                                  // htmlFor="trip_type_business"
                                >
                                  Chauffeur Driven
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="trip_type">Trip Type</label>
                            <button
                              className="btn p-0 m-0 more-filters-mini-clear"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  if (values?.trip_type) {
                                    delete values?.trip_type;
                                    setValues({ ...values });
                                    await router.push(
                                      {
                                        pathname: "/browse-cars",
                                        query: { ...values },
                                      },
                                      ``,
                                      { shallow: true }
                                    );
                                  }
                                } catch (error) {}
                              }}
                              disabled={!values?.trip_type}
                            >
                              Clear
                            </button>
                          </div>
                          <div>
                            <div className="custom-control custom-radio d-inline-block w-50 mt-1">
                              <div className="d-flex align-items-center">
                                <input
                                  type="radio"
                                  id="trip_type_leisure"
                                  name="trip_type"
                                  className="custom-control-input w-25"
                                  value={"leisure"}
                                  onChange={handleChange}
                                  checked={values?.trip_type === "leisure"}
                                />
                                <p
                                  className="custom-control-label ml-3 more-filters-text w-75"
                                  // htmlFor="trip_type_leisure"
                                >
                                  Leisure / Tourism
                                </p>
                              </div>
                            </div>
                            <div className="custom-control custom-radio d-inline-block w-50">
                              <div className="d-flex align-items-center">
                                <input
                                  type="radio"
                                  id="trip_type_business"
                                  name="trip_type"
                                  className="custom-control-input w-25"
                                  value={"business"}
                                  onChange={handleChange}
                                  checked={values?.trip_type === "business"}
                                />
                                <p
                                  className="custom-control-label more-filters-text w-75"
                                  // htmlFor="trip_type_business"
                                >
                                  Business
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="car_market_class">
                              Car Market Class
                            </label>
                            <button
                              className="btn p-0 m-0 more-filters-mini-clear"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  if (values?.car_market_class) {
                                    delete values?.car_market_class;
                                    setValues({ ...values });
                                    await router.push(
                                      {
                                        pathname: "/browse-cars",
                                        query: { ...values },
                                      },
                                      ``,
                                      { shallow: true }
                                    );
                                  }
                                } catch (error) {}
                              }}
                              disabled={!values?.car_market_class}
                            >
                              Clear
                            </button>
                          </div>
                          <div>
                            <div className="custom-control custom-radio d-inline-block w-50 mt-1">
                              <div className="d-flex align-items-center">
                                <input
                                  type="radio"
                                  id="car_class_budget_car"
                                  name="car_market_class"
                                  className="custom-control-input w-25"
                                  value={"budget_car"}
                                  onChange={handleChange}
                                  checked={
                                    values?.car_market_class === "budget_car"
                                  }
                                />
                                <p
                                  className="custom-control-label m-0 more-filters-text w-75"
                                  // htmlFor="car_class_budget_car"
                                >
                                  Budget/Economy Car
                                </p>
                              </div>
                            </div>
                            <div className="custom-control custom-radio d-inline-block w-50">
                              <div className="d-flex align-items-center">
                                <input
                                  type="radio"
                                  id="car_class_luxury_car"
                                  name="car_market_class"
                                  className="custom-control-input w-25"
                                  value={"luxury_car"}
                                  onChange={handleChange}
                                  checked={
                                    values?.car_market_class === "luxury_car"
                                  }
                                />
                                <p
                                  className="custom-control-label more-filters-text w-75"
                                  // htmlFor="car_class_luxury_car"
                                >
                                  Luxury/Premium Car
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {!dateTimeInput && (
                          <div className="mb-4">
                            <div className="d-flex justify-content-between">
                              <label htmlFor="trip_duration">
                                Trip Duration
                              </label>
                              <button
                                className="btn p-0 m-0 more-filters-mini-clear"
                                onClick={async (e) => {
                                  e.preventDefault();
                                  try {
                                    if (values?.trip_duration) {
                                      delete values?.trip_duration;
                                      setValues({ ...values });
                                      await router.push(
                                        {
                                          pathname: "/browse-cars",
                                          query: { ...values },
                                        },
                                        ``,
                                        { shallow: true }
                                      );
                                    }
                                  } catch (error) {}
                                }}
                                disabled={!values?.trip_duration}
                              >
                                Clear
                              </button>
                            </div>
                            <div>
                              <div className="custom-control custom-radio d-inline-block w-50 mt-1">
                                <div className="d-flex align-items-center">
                                  <input
                                    type="radio"
                                    id="trip_duration_less_24"
                                    name="trip_duration"
                                    className="custom-control-input w-25"
                                    value={"less_24"}
                                    onChange={handleChange}
                                    checked={
                                      values?.trip_duration === "less_24"
                                    }
                                  />
                                  <p
                                    className="custom-control-label ml-3 more-filters-text w-75"
                                    // htmlFor="trip_type_leisure"
                                  >
                                    less than 24 hrs
                                  </p>
                                </div>
                              </div>
                              <div className="custom-control custom-radio d-inline-block w-50">
                                <div className="d-flex align-items-center">
                                  <input
                                    type="radio"
                                    id="trip_duration_more_24"
                                    name="trip_duration"
                                    className="custom-control-input w-25"
                                    value={"more_24"}
                                    onChange={handleChange}
                                    checked={
                                      values?.trip_duration === "more_24"
                                    }
                                  />
                                  <p
                                    className="custom-control-label more-filters-text w-75"
                                    // htmlFor="trip_type_business"
                                  >
                                    more than 24 hrs
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label htmlFor="trip_duration">
                              {tripDuration
                                ? tripDuration === "more_24"
                                  ? "Daily "
                                  : "Hourly "
                                : "Daily "}
                              Rate
                            </label>
                            <button
                              className="btn p-0 m-0 more-filters-mini-clear"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  if (values?.min_rate) {
                                    delete values?.min_rate;
                                    delete values?.max_rate;
                                    setValues({ ...values });
                                    await router.push(
                                      {
                                        pathname: "/browse-cars",
                                        query: { ...values },
                                      },
                                      ``,
                                      { shallow: true }
                                    );
                                  }
                                } catch (error) {}
                              }}
                              disabled={!values?.min_rate && !values?.max_rate}
                            >
                              Clear
                            </button>
                          </div>
                          {rateError && (
                            <p>
                              <small className="text-danger">
                                Max rate must be greater than min_rate!
                              </small>
                            </p>
                          )}
                          <div className="row m-0 mt-1">
                            <div className="col p-0">
                              <div className="input-group m-0 p-0">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    values?.min_rate && `more-filter-active`
                                  }`}
                                  placeholder="Min rate"
                                  name="min_rate"
                                  value={values?.min_rate ?? ""}
                                  onChange={handleChange}
                                  onFocus={handleRateFocus}
                                />
                                <span
                                  className="input-group-text more-filters-text"
                                  id="basic-addon2"
                                >
                                  KSH
                                </span>
                              </div>
                            </div>
                            <div className="col">
                              <div className="input-group m-0 p-0">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    values?.max_rate && `more-filter-active`
                                  }`}
                                  placeholder="Max rate"
                                  name="max_rate"
                                  value={values?.max_rate ?? ""}
                                  onChange={handleChange}
                                  onFocus={handleRateFocus}
                                />
                                <span
                                  className="input-group-text more-filters-text"
                                  id="basic-addon2"
                                >
                                  KSH
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="d-flex justify-content-between">
                            <label>Categories</label>
                            <button
                              className="btn p-0 m-0 more-filters-mini-clear"
                              onClick={async (e) => {
                                e.preventDefault();
                                try {
                                  if (values?.categories) {
                                    delete values?.categories;
                                    setValues({ ...values });
                                    await router.push(
                                      {
                                        pathname: "/browse-cars",
                                        query: { ...values },
                                      },
                                      ``,
                                      { shallow: true }
                                    );
                                  }
                                } catch (error) {}
                              }}
                              disabled={!values?.categories}
                            >
                              Clear
                            </button>
                          </div>
                          <div className="categories-wrapper mt-1">
                            {carCategories.map((category, idx) => {
                              const isSelected = values?.categories?.find(
                                (cat: string) => cat === category.toLowerCase()
                              );
                              return (
                                <div className="form-check" key={idx}>
                                  <div className="d-flex align-items-center">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value={category.toLowerCase()}
                                      checked={isSelected ? true : false}
                                      // id="flexCheckDefault"
                                      onChange={handleChange}
                                      name="category"
                                    />
                                    &nbsp; &nbsp;
                                    <p
                                      className="form-check-label more-filters-text m-0"
                                      // htmlFor="flexCheckDefault"
                                    >
                                      {category}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4 mb-2">
                          <button
                            className="btn btn-md bg-secondary text-light"
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
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
