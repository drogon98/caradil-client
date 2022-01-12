import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { carColors } from "../../data";
import {
  CarPrimaryFeaturesInput,
  useEditCarPrimaryFeaturesMutation,
} from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface PrimaryFeaturesProps {
  value: CarPrimaryFeaturesInput;
  setData: Dispatch<SetStateAction<CarPrimaryFeaturesInput>>;
  carId: number | undefined;
  isEdit: boolean;
}

/**
 * @author
 * @function @PrimaryFeatures
 **/

export const PrimaryFeatures: FC<PrimaryFeaturesProps> = (props) => {
  const [editPrimaryFeatures, { loading, error }] =
    useEditCarPrimaryFeaturesMutation();
  const [saved, setSaved] = useState(false);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    props.setData({ ...props.value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      transmission: props.value.transmission,
      gas: props.value.gas,
      color: props.value.color,
      doors: parseInt(props.value.doors as unknown as string, 10),
      seats: parseInt(props.value.seats as unknown as string, 10),
    };

    // console.log("payload :>> ", payload);

    // console.log("props.value :>> ", props.value);
    let response;
    try {
      response = await editPrimaryFeatures({
        variables: { carId: props.carId!, input: payload },
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

    if (response.data?.editCarPrimaryFeatures.error) {
    } else if (response.data?.editCarPrimaryFeatures.carId) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }

    // console.log("response :>> ", response);
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label htmlFor="gas">Gas</label>
            <select
              className="form-select form-control"
              aria-label="Default select example"
              onChange={handleChange}
              value={props.value.gas}
              name="gas"
            >
              <option value={""}>Select Gas</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="carName">Transmission</label>
            <select
              className="form-select form-control"
              aria-label="Default select example"
              onChange={handleChange}
              value={props.value.transmission}
              name="transmission"
            >
              <option value={""}>Select Transmission</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <label htmlFor="carName">Color</label>
            <select
              className="form-select form-control"
              aria-label="Default select example"
              onChange={handleChange}
              value={props.value.color}
              name="color"
            >
              <option value={""}>Select Color</option>
              {carColors.map((color, idx) => (
                <option key={idx} value={color.toLowerCase()}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="carName">Seats</label>
            <input
              type="number"
              name="seats"
              className="form-control"
              value={props.value.seats}
              required
              onChange={handleChange}
              // placeholder="eg KBA765K"
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6">
            <label htmlFor="carName">Doors</label>
            <input
              type="number"
              name="doors"
              className="form-control"
              value={props.value.doors}
              required
              onChange={handleChange}
              // placeholder="eg KBA765K"
            />
          </div>
        </div>

        <FormSaveButton
          saved={saved}
          loading={loading}
          isEdit={props.isEdit}
          carId={props.carId!}
        />
      </form>
    </div>
  );
};
