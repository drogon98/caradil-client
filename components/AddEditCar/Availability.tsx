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
import { FormSaveButton } from "./FormSaveButton";

interface AvailabilityProps {
  value: CarAvailabilityInput;
  // setData: Dispatch<SetStateAction<CarAvailabilityInput>>;
  carId: number | undefined;
  // booked: boolean;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  activeSlide: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
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
        props.setActiveSlide(props.activeSlide + 1);
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
      <p>
        {/* When you list your car, we will automatically set your Daily availability
        to “I’m always available.” You can change your Daily availability at any
        time by setting the hours you’re available during each day of the week.
        You’ll only receive trip requests that start and end within the times
        you set. Whatever Daily availability you set, we’ll apply to all your
        vehicle listings.{" "} */}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-check mb-3">
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
        <div className="mb-3">
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
        <div className="form-check form-switch mb-3">
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
            {/* {props.booked
              ? "This car is booked. It's hence unavailable."
              : "This car is available now"} */}
          </label>
        </div>
        <p>
          Add availability date and time. Note; not filling the fields below
          your car can be rented any date and time
        </p>
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
        )}

        <div className="d-flex justify-content-between mt-4">
          <button onClick={() => props.setActiveSlide(props.activeSlide - 1)}>
            Prev
          </button>
          <button type="submit">Next</button>
        </div>

        {/* <FormSaveButton
          loading={loading}
          saved={saved}
          isEdit={false}
          carId={props.carId!}
        /> */}
      </form>
    </div>
  );
};
