import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
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
  setData: Dispatch<SetStateAction<CarAvailabilityInput>>;
  carId: number | undefined;
  booked: boolean;
  setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
}

/**
 * @author
 * @function @Availability
 **/

export const Availability: FC<AvailabilityProps> = (props) => {
  const [editAvailability, { loading }] = useEditCarAvailabilityMutation();
  const [saved, setSaved] = useState(false);

  const handleChange = (e: any) => {
    if (
      e.target.name === "startDate" ||
      e.target.name === "endDate" ||
      e.target.name === "startTime" ||
      e.target.name === "endTime"
    ) {
      props.setData({
        ...props.value,
        custom_availability_data: {
          ...props.value.custom_availability_data,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.name === "custom_availability") {
      props.setData({
        ...props.value,
        [e.target.name]: !props.value.custom_availability,
      });
    } else if (e.target.name === "advance_book_period") {
      props.setData({
        ...props.value,
        [e.target.name]: e.target.value,
      });
    } else {
      props.setData({
        ...props.value,
        [e.target.name]: e.target.value === "true" ? true : false,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let response;

    try {
      response = await editAvailability({
        variables: {
          carId: props.carId!,
          input: {
            advance_book_period: props.value.advance_book_period,
            car_has_other_use: props.value.car_has_other_use,
            available: props.value.available,
            custom_availability: props.value.custom_availability,
            custom_availability_data: props.value.custom_availability_data,
          },
        },
      });

      if (response.data?.editCarAvailability.error) {
      } else if (response.data?.editCarAvailability.carId) {
        props.setResponseCar(response.data.editCarAvailability.car!);
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 3000);
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
            value={props.value.car_has_other_use ? "false" : "true"}
            id="car_has_other_use"
            name="car_has_other_use"
            checked={props.value.car_has_other_use}
            onChange={handleChange}
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
              value={props.value?.advance_book_period ?? ""}
              required
            >
              <option value="">Advance Duration</option>
              <option value="3hrs">3hrs Before The Trip</option>
              <option value="6hrs">6hrs Before The Trip</option>
              <option value="12hrs">12hrs Before The Trip</option>
              <option value="24hrs">24hrs Before The Trip</option>
            </select>
          </div>
        </div>
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="mySwitch"
            name="available"
            value={props.value.available ? "false" : "true"}
            checked={props.value.available}
            onChange={handleChange}
            disabled={props.booked}
          />
          <label className="form-check-label" htmlFor="mySwitch">
            {props.booked
              ? "This car is booked. It's hence unavailable."
              : "Available"}
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
            checked={props.value.custom_availability ?? false}
            onChange={handleChange}
            disabled={props.booked}
          />
          <label className="form-check-label">Custom Date</label>
        </div>

        {props.value.custom_availability && (
          <div className="row">
            <div className="col-lg-6">
              <div className="d-flex">
                <div className="w-50">
                  <input
                    type="date"
                    className="w-100 car-date-time-input-location"
                    name="startDate"
                    onChange={handleChange}
                    value={
                      props.value.custom_availability_data?.startDate ?? ""
                    }
                    required
                  />
                </div>

                <div className="w-50">
                  <select
                    className="w-100"
                    name="startTime"
                    onChange={handleChange}
                    value={
                      props.value.custom_availability_data?.startTime ?? ""
                    }
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
                    value={props.value.custom_availability_data?.endDate ?? ""}
                    required
                    min={getMinDate(
                      props.value.custom_availability_data?.startDate ?? ""
                    )}
                  />
                </div>

                <div className="w-50">
                  <select
                    className="w-100"
                    name="endTime"
                    onChange={handleChange}
                    value={props.value.custom_availability_data?.endTime ?? ""}
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

        <FormSaveButton
          loading={loading}
          saved={saved}
          isEdit={false}
          carId={props.carId!}
        />
      </form>
    </div>
  );
};
