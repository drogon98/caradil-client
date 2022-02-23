import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Car,
  CarFuelingInput,
  useEditCarFuelingMutation,
} from "../../graphql_types/generated/graphql";
import { ToastWrapper } from "../Toast/ToastWrapper";
import { FormNextPrevButton } from "./FormNextPrevButton";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface FuelingProps {
  value: CarFuelingInput;
  // setData: Dispatch<SetStateAction<string>>;
  carId: number | undefined;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  isManage?: boolean;
  // verificationInProgress?: boolean;
}

export const Fueling: FC<FuelingProps> = (props) => {
  const [editFueling, { loading }] = useEditCarFuelingMutation();
  const [values, setValues] = useState<CarFuelingInput>();
  const [showSaveToast, setShowSaveToast] = useState(false);

  // console.log("props.value :>> ", props.value);

  useEffect(() => {
    if (props.value) {
      setValues({
        fuel_efficiency: props.value.fuel_efficiency!,
        fuel_policy: props.value.fuel_policy!,
      });
    }
  }, [props.value]);

  // const handleLocationChange = (data: any) => {
  //   setValues({ ...values!, location: data.formatted_address });
  // };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setValues({ ...values!, [e.target.name]: e.target.value });
  };

  // const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await editFueling({
        variables: { carId: props.carId!, input: { ...values! } },
      });
      if (response.data?.editCarFueling.error) {
      } else if (response.data?.editCarFueling.carId) {
        props.setCompData(response.data.editCarFueling.car!);

        if (props.isManage) {
          setShowSaveToast(true);
        } else {
          props.setActiveSlide && props.setActiveSlide(props.activeSlide! + 1);
        }
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
      {showSaveToast && (
        <ToastWrapper
          setShow={setShowSaveToast}
          show={showSaveToast}
          message={"Updated successfully!"}
          position="bottom-end"
        />
      )}
      <h3>Fueling</h3>
      <p className="mb-2">
        For a car to be useful,it needs fuel. Give us your car fuel efficiency
        and consumption efficiency.
      </p>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <label>What is your preferred car fuel policy?</label>
          <div>
            <select
              name="fuel_policy"
              onChange={handleChange}
              value={values?.fuel_policy}
              // required
              //   onFocus={handleFocus}
            >
              <option value="">Select fuel policy</option>
              <option value="full_to_full">Full to Full</option>
              <option value="pre_purchase_full_to_empty">
                Pre-purchase full to empty
              </option>
              <option value="pre_purchase_refund">Pre-purchase refund</option>
            </select>
          </div>
          <div className="mt-2">
            <small>To learn more about these fuel policies go here.</small>
          </div>
        </div>

        <label htmlFor="fuel_efficiency">Fuel Efficiency</label>
        <div>
          <small>
            As guests will fuel the car,they want fuel efficient cars. Add your
            car fuel efficiency below.
          </small>
        </div>
        <div className="input-group mb-3" style={{ width: "300px" }}>
          <input
            type="number"
            name="fuel_efficiency"
            className="form-control"
            value={values?.fuel_efficiency!}
            // required
            onChange={handleChange}
            placeholder="eg 22"
          />
          <span className="input-group-text">Ltrs/100 Km</span>
        </div>
        {props.isManage ? (
          <UpdateBtn
            loading={loading}
            // disabled={props.verificationInProgress}
          />
        ) : (
          <FormNextPrevButton
            loading={loading}
            disabled={loading}
            setActiveSlide={props.setActiveSlide!}
            activeSlide={props.activeSlide!}
          />
        )}
      </form>
    </div>
  );
};
