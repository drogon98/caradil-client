import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  CarDistanceInput,
  useEditCarDistanceMutation,
} from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface DistanceProps {
  value: CarDistanceInput;
  setData: Dispatch<SetStateAction<CarDistanceInput>>;
  carId: number | undefined;
}

/**
 * @author
 * @function @Miles
 **/

export const Distance: FC<DistanceProps> = (props) => {
  const [editDistance, { loading }] = useEditCarDistanceMutation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setData({ distance_per_day: parseInt(e.target.value.trim()) });
  };
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    try {
      response = await editDistance({
        variables: {
          carId: props.carId!,
          input: { distance_per_day: props.value.distance_per_day },
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

    if (response.data?.editCarDistance.error) {
    } else if (response.data?.editCarDistance.carId) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  };

  return (
    <div>
      <p>This is the distance your car should cover in one day of a trip.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="distance_per_day">Distance (KM)</label>
          <input
            type="number"
            name="distance_per_day"
            className="form-control"
            value={props.value.distance_per_day}
            required
            onChange={handleChange}
            placeholder="eg 800"
            id="distance_per_day"
          />
        </div>
        <FormSaveButton
          saved={saved}
          loading={loading}
          isEdit={false}
          carId={props.carId!}
        />
      </form>
    </div>
  );
};
