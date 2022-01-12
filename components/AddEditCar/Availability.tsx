import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  CarAvailabilityInput,
  useEditCarAvailabilityMutation,
} from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface AvailabilityProps {
  value: CarAvailabilityInput;
  setData: Dispatch<SetStateAction<CarAvailabilityInput>>;
  carId: number | undefined;
  booked: boolean;
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
      // if (props.value.custom_availability) {
      //   props.setData({ ...props.value, custom_availability_data: null });
      // }
      props.setData({
        ...props.value,
        [e.target.name]: !props.value.custom_availability,
      });
    } else if (e.target.name === "available") {
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
            available: props.value.available,
            custom_availability: props.value.custom_availability,
            custom_availability_data: props.value.custom_availability_data,
          },
        },
      });
    } catch (error) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("errorMessage :>> ", errorMessage);
      return;
      // setError("Network Error!");
    }

    if (response.data?.editCarAvailability.error) {
    } else if (response.data?.editCarAvailability.carId) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  };

  console.log("props.value :>> ", props.value);

  return (
    <div>
      <p>
        When you list your car, we’ll automatically set your Daily availability
        to “I’m always available.” You can change your Daily availability at any
        time by setting the hours you’re available during each day of the week.
        You’ll only receive trip requests that start and end within the times
        you set. Whatever Daily availability you set, we’ll apply to all your
        vehicle listings.{" "}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-check form-switch">
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
            checked={props.value.custom_availability}
            onChange={handleChange}
            disabled={props.booked}
          />
          <label className="form-check-label">Custom Date</label>
        </div>

        {props.value.custom_availability && (
          <>
            <div className="w-60">
              <input
                type="date"
                className="w-100 car-date-time-input-location"
                name="startDate"
                onChange={handleChange}
                value={props.value.custom_availability_data?.startDate ?? ""}
                required
              />
            </div>

            <div className="w-40">
              <select
                className="w-100"
                name="startTime"
                onChange={handleChange}
                value={props.value.custom_availability_data?.startTime ?? ""}
                required
              >
                <option value="00:00">00:00</option>
                <option value="00:30">00:30</option>
                <option value="01:00">01:00</option>
                <option value="01:30">01:30</option>
                <option value="02:00">02:00</option>
                <option value="02:30">02:30</option>
                <option value="03:00">03:00</option>
                <option value="03:30">03:30</option>
                <option value="04:00">04:00</option>
                <option value="04:30">04:30</option>
                <option value="05:00">05:00</option>
                <option value="05:30">05:30</option>
                <option value="06:00">06:00</option>
                <option value="06:30">06:30</option>
                <option value="07:00">07:00</option>
                <option value="07:30">07:30</option>
                <option value="08:00">08:00</option>
                <option value="08:30">08:30</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
                <option value="23:00">23:00</option>
                <option value="23:30">23:30</option>
              </select>
            </div>

            <div className="w-60">
              <input
                type="date"
                className="w-100 car-date-time-input-location"
                name="endDate"
                onChange={handleChange}
                value={props.value.custom_availability_data?.endDate ?? ""}
                required
              />
            </div>

            <div className="w-40">
              <select
                className="w-100"
                name="endTime"
                onChange={handleChange}
                value={props.value.custom_availability_data?.endTime ?? ""}
                required
              >
                <option value="00:00">00:00</option>
                <option value="00:30">00:30</option>
                <option value="01:00">01:00</option>
                <option value="01:30">01:30</option>
                <option value="02:00">02:00</option>
                <option value="02:30">02:30</option>
                <option value="03:00">03:00</option>
                <option value="03:30">03:30</option>
                <option value="04:00">04:00</option>
                <option value="04:30">04:30</option>
                <option value="05:00">05:00</option>
                <option value="05:30">05:30</option>
                <option value="06:00">06:00</option>
                <option value="06:30">06:30</option>
                <option value="07:00">07:00</option>
                <option value="07:30">07:30</option>
                <option value="08:00">08:00</option>
                <option value="08:30">08:30</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
                <option value="23:00">23:00</option>
                <option value="23:30">23:30</option>
              </select>
            </div>
          </>
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
