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
import { FormNextPrevButton } from "./FormNextPrevButton";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface AvailabilityProps {
  value: CarAvailabilityInput;
  // setData: Dispatch<SetStateAction<CarAvailabilityInput>>;
  carId: number | undefined;
  // booked: boolean;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  manual: boolean;
  isManage?: boolean;
  booked?: boolean;
  verificationInProgress: boolean;
}

export const Availability: FC<AvailabilityProps> = (props) => {
  const [editAvailability, { loading }] = useEditCarAvailabilityMutation();
  // const [saved, setSaved] = useState(false);
  const [values, setValues] = useState<CarAvailabilityInput>();

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
    } else if (e.target.name === "advance_book_period") {
      setValues({
        ...values!,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "driver_mode") {
      if (e.target.value === "2") {
        setValues({
          ...values!,
          manual_transmission_test: false,
          [e.target.name]: parseInt(e.target.value, 10),
        });
      } else {
        setValues({
          ...values!,
          [e.target.name]: parseInt(e.target.value, 10),
          manual_transmission_test: true,
        });
      }
    } else {
      setValues({
        ...values!,
        [e.target.name]: e.target.value === "true" ? true : false,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response = await editAvailability({
        variables: {
          carId: props.carId!,
          input: {
            advance_book_period: values?.advance_book_period!,
            car_has_other_use: values?.car_has_other_use!,
            available: values?.available!,
            custom_availability: values?.custom_availability!,
            custom_availability_data: values?.custom_availability_data!,
            driver_mode: values?.driver_mode!,
            manual_transmission_test: values?.manual_transmission_test!,
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
        props.setActiveSlide && props.setActiveSlide(props.activeSlide! + 1);
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

  return (
    <div>
      <h3>Availability</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
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
        </div>
        <div className="form-check mb-5">
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
        </div>
        <div className="mb-5">
          <label>How advance do you want to be notified of a trip</label>
          <div>
            <select
              name="advance_book_period"
              onChange={handleChange}
              value={values?.advance_book_period ?? ""}
              // required
            >
              <option value="">Advance Duration</option>
              <option value="3hrs">3hrs before the trip</option>
              <option value="6hrs">6hrs before the trip</option>
              <option value="12hrs">12hrs before the trip</option>
              <option value="24hrs">24hrs before the trip</option>
            </select>
          </div>
        </div>
        <div className="form-check form-switch mb-5">
          <input
            className="form-check-input"
            type="checkbox"
            id="mySwitch"
            name="available"
            value={values?.available ? "false" : "true"}
            checked={values?.available}
            onChange={handleChange}
            // disabled={props.booked}
            // required
          />
          <label className="form-check-label" htmlFor="mySwitch">
            {props.booked
              ? "This car is booked. It's hence unavailable."
              : "This car is available now"}
          </label>
        </div>
        <small>
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
            // disabled={props.booked}
            // required
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
        )}

        {props.isManage ? (
          <UpdateBtn
            loading={loading}
            disabled={props.verificationInProgress}
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
