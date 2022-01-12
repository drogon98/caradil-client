import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useEditCarLocationMutation } from "../../graphql_types/generated/graphql";
import { AutoComplete } from "../Location/AutoComplete";
import { FormSaveButton } from "./FormSaveButton";

interface LocationProps {
  value: string;
  setData: Dispatch<SetStateAction<string>>;
  carId: number | undefined;
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
    } catch (error) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("errorMessage :>> ", errorMessage);
      return;
      // setError("Network Error!");
    }

    if (response.data?.editCarLocation.error) {
    } else if (response.data?.editCarLocation.carId) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }

    // console.log("response :>> ", response);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mileage">Location</label>
          {/* <input
            type="text"
            name="location"
            className="form-control"
            value={props.value}
            required
            onChange={handleChange}
            placeholder="eg Ruiru Kamakis"
          /> */}
          <AutoComplete
            placeholder="Car location or pickup location"
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
