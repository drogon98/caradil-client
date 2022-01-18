import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  Car,
  CarDistanceInput,
  useEditCarDistanceMutation,
} from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface DistanceProps {
  value: CarDistanceInput;
  setData: Dispatch<SetStateAction<CarDistanceInput>>;
  carId: number | undefined;
  setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
}

/**
 * @author
 * @function @Miles
 **/

export const Distance: FC<DistanceProps> = (props) => {
  const [editDistance, { loading }] = useEditCarDistanceMutation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "has_unlimited_distance") {
      if (e.target.value === "true") {
        props.setData({
          distance_per_day: 0,
          [e.target.name]: true,
        });
      } else {
        props.setData({
          ...props.value,
          [e.target.name]: false,
        });
      }
    } else {
      props.setData({
        ...props.value,
        [e.target.name]: parseInt(e.target.value.trim()),
      });
    }
  };
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    try {
      response = await editDistance({
        variables: {
          carId: props.carId!,
          input: { ...props.value },
        },
      });

      if (response.data?.editCarDistance.error) {
      } else if (response.data?.editCarDistance.carId) {
        props.setResponseCar(response.data.editCarDistance.car!);
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

  // console.log("props.value :>> ", props.value);

  return (
    <div>
      <p className="mb-2">
        This is the distance your car should cover in one day of a trip.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="has_unlimited_distance"
            value={props.value.has_unlimited_distance ? "false" : "true"}
            id="has_unlimited_distance_input"
            checked={props.value.has_unlimited_distance}
            onChange={handleChange}
            // required
          />
          <label
            className="form-check-label"
            htmlFor="has_unlimited_distance_input"
          >
            Unlimited Distance
          </label>
        </div>
        <div>
          <label htmlFor="distance_per_day">Distance (KM)</label>
          <input
            type="number"
            name="distance_per_day"
            className="form-control"
            value={props.value.distance_per_day}
            // required
            onChange={handleChange}
            placeholder="eg 800"
            id="distance_per_day"
            disabled={props.value.has_unlimited_distance}
            min={0}
          />
        </div>
        <FormSaveButton
          saved={saved}
          loading={loading}
          isEdit={false}
          carId={props.carId!}
          // disabled={
          //   ![true, false].some(
          //     (b) => b === props.value.has_unlimited_distance
          //   ) || props.value.distance_per_day === 0
          // }
        />
      </form>
    </div>
  );
};
