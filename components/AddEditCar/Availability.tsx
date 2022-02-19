import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { time24hrs } from "../../data";
import {
  Car,
  CarAvailabilityInput,
  useEditCarAvailabilityMutation,
} from "../../graphql_types/generated/graphql";
import { ToastWrapper } from "../Toast/ToastWrapper";
import { FormNextPrevButton } from "./FormNextPrevButton";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface AvailabilityProps {
  value: CarAvailabilityInput;
  // setData: Dispatch<SetStateAction<CarAvailabilityInput>>;
  carId: number | undefined;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  // manual: boolean;
  isManage?: boolean;
  // booked?: boolean;
  // verificationInProgress?: boolean;
}

export const Availability: FC<AvailabilityProps> = (props) => {
  const [editAvailability, { loading }] = useEditCarAvailabilityMutation();
  // const [saved, setSaved] = useState(false);
  const [values, setValues] = useState<CarAvailabilityInput>();
  const [invalidAdvanceData, setInvalidAdvanceData] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  useEffect(() => {
    if (props.value) {
      setValues({ ...props.value });
    }
  }, [props.value]);

  const handleChange = (e: any) => {
    if (
      e.target.name === "startDate" ||
      e.target.name === "endDate" ||
      e.target.name === "startTime" ||
      e.target.name === "endTime"
    ) {
      setValues({
        ...values!,
        custom_availability_data: {
          ...values?.custom_availability_data,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.name === "custom_availability") {
      setValues({
        ...values!,
        [e.target.name]: !values?.custom_availability,
      });
    } else if (
      e.target.name === "advance_book_period" ||
      e.target.name === "fuel_policy"
    ) {
      setValues({
        ...values!,
        [e.target.name]: e.target.value,
      });
    }
    //  else if (e.target.name === "driver_mode") {
    //   if (e.target.value === "2") {
    //     setValues({
    //       ...values!,
    //       manual_transmission_test: false,
    //       [e.target.name]: parseInt(e.target.value, 10),
    //     });
    //   }
    //   else {
    //     setValues({
    //       ...values!,
    //       [e.target.name]: parseInt(e.target.value, 10),
    //       manual_transmission_test: true,
    //     });
    //   }
    // }
    else if (e.target.name === "fuel_efficiency") {
      setValues({
        ...values!,
        [e.target.name]: e.target.value,
      });
    } else {
      setValues({
        ...values!,
        [e.target.name]: e.target.value === "true" ? true : false,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values?.advance_book_period) {
      setInvalidAdvanceData(true);
      return;
    }

    try {
      let response = await editAvailability({
        variables: {
          carId: props.carId!,
          input: {
            advance_book_period: values?.advance_book_period!,
            // car_has_other_use: values?.car_has_other_use!,
            // available: values?.available!,
            custom_availability: values?.custom_availability!,
            custom_availability_data: values?.custom_availability_data!,
            can_rent_hourly: values.can_rent_hourly!,
            fuel_policy: values.fuel_policy!,
            fuel_efficiency: values.fuel_efficiency!,
            trip_type: values.trip_type!,
            // driver_mode: values?.driver_mode!,
            // manual_transmission_test: values?.manual_transmission_test!,
          },
        },
      });

      if (response.data?.editCarAvailability.error) {
        console.log(
          "response.data?.editCarAvailability.error :>> ",
          response.data?.editCarAvailability.error
        );
      } else if (response.data?.editCarAvailability.carId) {
        props.setCompData(response.data.editCarAvailability.car!);

        if (props.isManage) {
          setShowSaveToast(true);
        } else {
          props.setActiveSlide && props.setActiveSlide(props.activeSlide! + 1);
        }
      }
    } catch (error) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("errorMessage :>> ", errorMessage);
      return;
      // setError("Network Error!");
    }
  };

  const createDateValue = (date: Date) => {
    if (date) {
      return `${date.getFullYear()}-${
        date.getMonth().toString().length === 1
          ? `0${date.getMonth() + 1}`
          : date.getMonth()
      }-${date.getDate()}`;
    }
  };

  const getMinDate = (val: string) => {
    if (val) {
      return createDateValue(new Date(val));
    } else {
      return createDateValue(new Date());
    }
  };

  const handleFocus = () => {
    if (invalidAdvanceData) {
      setInvalidAdvanceData(false);
    }
  };

  return (
    <div>
      {showSaveToast && (
        <ToastWrapper
          setShow={setShowSaveToast}
          show={showSaveToast}
          message={"Updated successfully!"}
          position="bottom-end"
        />
      )}
      <h3>Availability & Fueling</h3>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-5">
          <p className="mb-2">Which type of trips is this car elligible for?</p>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="trip_type"
              id="trip_type_leisure"
              value={"leisure"}
              checked={values?.trip_type === "leisure"}
              onChange={handleChange}
              // required
            />
            <label className="form-check-label" htmlFor="trip_type_leisure">
              Leisure Trips
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="trip_type"
              id="trip_type_business"
              value={"business"}
              checked={values?.trip_type === "business"}
              onChange={handleChange}
              // required
            />
            <label className="form-check-label" htmlFor="trip_type_business">
              Business trips
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="trip_type"
              id="both_trip_types"
              value={"both"}
              checked={values?.trip_type === "both"}
              onChange={handleChange}
              // required
            />
            <label className="form-check-label" htmlFor="both_trip_types">
              Both leisure and business trips
            </label>
          </div>
        </div>
        {/* <div className="mb-5">
          <p className="mb-2">
            This is how you want guests to drive your car. Some guests want to
            drive the car themselves while others want to be driven. Select the
            preferred mode of driving for your car.
          </p>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="driver_mode"
              id="self_drive_only"
              value={1}
              checked={values?.driver_mode === 1}
              onChange={handleChange}
              // required
            />
            <label className="form-check-label" htmlFor="self_drive_only">
              Self Drive Only (Guest will have to be the driver)
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="driver_mode"
              id="private_driver_only"
              value={2}
              checked={values?.driver_mode === 2}
              onChange={handleChange}
              // required
            />
            <label className="form-check-label" htmlFor="private_driver_only">
              My Driver/Chauffeur Only ( This driver can be you)
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="driver_mode"
              id="both_self_drive_and_private_driver"
              value={3}
              checked={values?.driver_mode === 3}
              onChange={handleChange}
              // required
            />
            <label
              className="form-check-label"
              htmlFor="both_self_drive_and_private_driver"
            >
              Both Self Drive and Private Driver
            </label>
          </div>
          {(values?.driver_mode === 1 || values?.driver_mode === 3) &&
            props.manual && (
              <div className="px-3">
                <p className="mb-2">
                  Some drivers are not that proficient with manual cars. Check
                  the box below if you want to test the guest's gear shift
                  skills before handing them your car.
                </p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={values?.manual_transmission_test ? "false" : "true"}
                    id="provide-driver"
                    checked={values?.manual_transmission_test}
                    onChange={handleChange}
                    name="manual_transmission_test"
                  />
                  <label className="form-check-label" htmlFor="provide-driver">
                    Yes,I need to test the driver gear shift skills
                  </label>
                </div>
              </div>
            )}
        </div> */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            value={values?.can_rent_hourly ? "false" : "true"}
            id="can_rent_hourly"
            name="can_rent_hourly"
            checked={values?.can_rent_hourly}
            onChange={handleChange}
            // required
          />
          <label className="form-check-label" htmlFor="can_rent_hourly">
            I can rent out this car for a period less than 24hrs
          </label>
        </div>
        {/* <div className="form-check mb-5">
          <input
            className="form-check-input"
            type="checkbox"
            value={values?.car_has_other_use ? "false" : "true"}
            id="car_has_other_use"
            name="car_has_other_use"
            checked={values?.car_has_other_use}
            onChange={handleChange}
            // required
          />
          <label className="form-check-label" htmlFor="car_has_other_use">
            I use this car for personal reasons
          </label>
        </div> */}
        {/* {invalidAdvanceData && (
          <small className="text-danger">
            Please select the advance period to be notified of a booked trip
          </small>
        )} */}

        <div className="mb-3">
          <label>How advance do you want to be notified of a booked trip</label>
          <div>
            <select
              name="advance_book_period"
              onChange={handleChange}
              value={values?.advance_book_period ?? ""}
              // required
              onFocus={handleFocus}
            >
              <option value="">Advance Book Period</option>
              <option value="Anytime">Anytime before the trip</option>
              <option value="3hrs">3hrs before the trip</option>
              <option value="6hrs">6hrs before the trip</option>
              <option value="12hrs">12hrs before the trip</option>
              <option value="24hrs">24hrs before the trip</option>
            </select>
          </div>
          <div className="mt-2">
            <small>
              Enough advance time will help you prepare your car for the guest.
              eg Cleaning it,fueling it etc
            </small>
          </div>
        </div>

        <div className="mb-3">
          <label>What is your preferred car fuel policy?</label>
          <div>
            <select
              name="fuel_policy"
              onChange={handleChange}
              value={values?.fuel_policy}
              // required
              onFocus={handleFocus}
            >
              <option value="">Select fuel policy</option>
              <option value="full_to_full">Full to Full</option>
              <option value="pre_purchase_full_to_empty">
                Pre-purchase full to empty
              </option>
              <option value="pre_purchase_refund">Pre-purchase refund</option>
            </select>
          </div>
          <div className="mt-2">
            <small>To learn more about these fuel policies go here.</small>
          </div>
        </div>

        <label htmlFor="fuel_efficiency">Fuel Efficiency</label>
        <div>
          <small>
            As guests will fuel the car,they want fuel efficient cars. Add your
            car fuel efficiency below.
          </small>
        </div>
        <div className="input-group mb-3" style={{ width: "300px" }}>
          <input
            type="number"
            name="fuel_efficiency"
            className="form-control"
            value={values?.fuel_efficiency!}
            // required
            onChange={handleChange}
            placeholder="eg 22"
          />
          <span className="input-group-text">Ltrs/100 Km</span>
        </div>

        {/* <div className="form-check form-switch mb-5">
          <input
            className="form-check-input"
            type="checkbox"
            id="mySwitch"
            name="available"
            value={props.booked ? "false" : "true"}
            checked={props.booked}
            // onChange={handleChange}
            disabled={props.booked}
            // required
          />
          <label className="form-check-label" htmlFor="mySwitch">
            {props.booked
              ? "This car is booked. It's hence unavailable."
              : "This car is available now"}
          </label>
        </div> */}
        {/*<small>
           Add custom availability date and time.{" "}
          <b>
            Note: not adding custom date and time means your car can be rented
            any date and time
          </b>
        </small>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="check1"
            name="custom_availability"
            value="something"
            checked={values?.custom_availability ?? false}
            onChange={handleChange}
          />
          <label className="form-check-label">Custom Date</label>
        </div>

        {values?.custom_availability && (
          <div>
            <p className="mb-3">
              The date and time you select here is the time your car will be
              available for hire.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <div className="d-flex">
                  <div className="w-50">
                    <input
                      type="date"
                      className="w-100 car-date-time-input-location"
                      name="startDate"
                      onChange={handleChange}
                      value={values?.custom_availability_data?.startDate ?? ""}
                      required
                    />
                  </div>

                  <div className="w-50">
                    <select
                      className="w-100"
                      name="startTime"
                      onChange={handleChange}
                      value={values?.custom_availability_data?.startTime ?? ""}
                      required
                    >
                      <option value={""}>Start Time</option>
                      {time24hrs.map((t, idx) => (
                        <option key={idx} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div className="w-50">
                    <input
                      type="date"
                      className="w-100 car-date-time-input-location"
                      name="endDate"
                      onChange={handleChange}
                      value={values?.custom_availability_data?.endDate ?? ""}
                      required
                      min={getMinDate(
                        values?.custom_availability_data?.startDate ?? ""
                      )}
                    />
                  </div>

                  <div className="w-50">
                    <select
                      className="w-100"
                      name="endTime"
                      onChange={handleChange}
                      value={values?.custom_availability_data?.endTime ?? ""}
                      required
                    >
                      <option value={""}>End Time</option>
                      {time24hrs.map((t, idx) => (
                        <option key={idx} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {props.isManage ? (
          <UpdateBtn
            loading={loading}
            // disabled={props.verificationInProgress}
          />
        ) : (
          <FormNextPrevButton
            loading={loading}
            disabled={loading}
            setActiveSlide={props.setActiveSlide!}
            activeSlide={props.activeSlide!}
          />
        )}
      </form>
    </div>
  );
};
