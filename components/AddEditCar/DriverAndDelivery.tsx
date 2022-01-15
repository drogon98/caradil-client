import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
import {
  CarDriverAndDeliveryInput,
  useEditCarDriverAndDeliveryMutation,
} from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface Props {
  value: CarDriverAndDeliveryInput;
  setData: Dispatch<SetStateAction<CarDriverAndDeliveryInput>>;
  carId: number | undefined;
}

export default function DriverAndDelivery(props: Props): ReactElement {
  //   console.log("props.value :>> ", props.value);
  const [saved, setSaved] = useState(false);
  const [editCardDriverAndDelivery, { loading }] =
    useEditCarDriverAndDeliveryMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    try {
      response = await editCardDriverAndDelivery({
        variables: {
          carId: props.carId!,
          input: props.value,
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

    if (response.data?.editCarDriverAndDelivery.error) {
    } else if (response.data?.editCarDriverAndDelivery.carId) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setData({
      ...props.value,
      [e.target.name]: e.target.value === "false" ? false : true,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={props.value.has_driver ? "false" : "true"}
            id="provide-driver"
            checked={props.value.has_driver}
            onChange={handleChange}
            name="has_driver"
          />
          <label className="form-check-label" htmlFor="provide-driver">
            I will provide a driver
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={props.value.delivery ? "false" : "true"}
            id="provide-delivery"
            checked={props.value.delivery}
            name="delivery"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="provide-delivery">
            I will deliver car to requested location
          </label>
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
}
