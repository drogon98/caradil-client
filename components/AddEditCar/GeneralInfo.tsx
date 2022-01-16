import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { carMakes } from "../../data";
import {
  Car,
  CarGeneralInfoInput,
  useAddEditCarGeneralInfoMutation,
} from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface NameAndRegNoProps {
  value: CarGeneralInfoInput;
  setData: Dispatch<SetStateAction<CarGeneralInfoInput>>;
  setCarId: Dispatch<SetStateAction<number | undefined>>;
  isEdit: boolean;
  carId: number | undefined;
  setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
}

/**
 * @author @CodeYourEmpire
 * @function @GeneralInfo
 **/

export const GeneralInfo: FC<NameAndRegNoProps> = (props) => {
  const [addEditCarMakeAndRegNo, { loading }] =
    useAddEditCarGeneralInfoMutation();
  const [saved, setSaved] = useState(false);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "reg_no") {
      props.setData({
        ...props.value,
        [e.target.name]: e.target.value.trim().toUpperCase(),
      });
    } else {
      props.setData({ ...props.value, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    try {
      response = await addEditCarMakeAndRegNo({
        variables: {
          options: props.value,
          isEdit: props.carId ? true : false,
          carId: props.carId,
        },
      });

      if (response?.data?.addEditCarGeneralInfo.error) {
      } else if (response?.data?.addEditCarGeneralInfo.carId) {
        props.setResponseCar(response.data.addEditCarGeneralInfo.car!);
        props.setCarId(response?.data?.addEditCarGeneralInfo.carId);
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

  return (
    <>
      <p className="mb-3">
        Add your car name. Make it unique and only three words long eg.{" "}
        <b>Subaru Forester 2016</b>.
      </p>
      <form
        className="form-group"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="row">
          <div className="col">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              value={props.value.name}
              required
              onChange={handleChange}
              placeholder="eg Subaru Forester 2016"
              disabled={props.isEdit}
            />
          </div>
          <div className="col">
            <label htmlFor="carMake">Make</label>
            <select
              className="form-select form-control"
              aria-label="Default select example"
              onChange={handleChange}
              value={props.value.make}
              name="make"
              disabled={props.isEdit}
              required
            >
              <option value={""}>Select Make</option>
              {carMakes.map((make, idx) => (
                <option key={idx} value={make.toLowerCase()}>
                  {make}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label htmlFor="carName">Registration No.</label>
            <input
              type="text"
              name="reg_no"
              className="form-control"
              value={props.value.reg_no}
              required
              onChange={handleChange}
              placeholder="eg KBA111C"
              disabled={props.isEdit}
            />
          </div>
          <div className="col-6">
            <label htmlFor="carName">Odometer Reading</label>
            <input
              type="text"
              name="odometer_reading"
              className="form-control"
              value={props.value.odometer_reading}
              required
              onChange={handleChange}
              placeholder="eg KBA111C"
              disabled={props.isEdit}
            />
          </div>
        </div>

        <FormSaveButton
          loading={loading}
          saved={saved}
          isEdit={props.isEdit}
          carId={props.carId ?? 1}
          // isGeneralInfo
        />
      </form>
    </>
  );
};
