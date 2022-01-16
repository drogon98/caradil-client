import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import {
  Car,
  useEditCarLocationMutation,
} from "../../graphql_types/generated/graphql";
import { AutoComplete } from "../Location/AutoComplete";
import { FormSaveButton } from "./FormSaveButton";

interface LocationProps {
  value: string;
  setData: Dispatch<SetStateAction<string>>;
  carId: number | undefined;
  setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
}

/**
 * @author @CodeYourEmpire
 * @function @Location
 **/

export const Location: FC<LocationProps> = (props) => {
  const [editLocation, { loading }] = useEditCarLocationMutation();
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   props.setData(e.target.value);
  // };
  const handleChange = (data: any) => {
    props.setData(data.formatted_address);
  };
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    try {
      response = await editLocation({
        variables: { carId: props.carId!, input: { location: props.value } },
      });
      if (response.data?.editCarLocation.error) {
      } else if (response.data?.editCarLocation.carId) {
        props.setResponseCar(response.data.editCarLocation.car!);
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

    // console.log("response :>> ", response);
  };
  return (
    <div>
      <p className="mb-2">
        This is the location of your car. If guests search for cars that match
        this location,it will appear in their search .
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mileage">Location</label>
          <AutoComplete
            placeholder="Car location"
            handler={handleChange}
            inputRef={inputRef}
            name="location"
            value={props.value}
          />
        </div>
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
