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
  CarLocationAndDeliveryInput,
  useEditCarLocationAndDeliveryMutation,
} from "../../graphql_types/generated/graphql";
import { AutoComplete } from "../Location/AutoComplete";
import { FormNextPrevButton } from "./FormNextPrevButton";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface LocationAndDeliveryProps {
  value: CarLocationAndDeliveryInput;
  // setData: Dispatch<SetStateAction<string>>;
  carId: number | undefined;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  isManage?: boolean;
  verificationInProgress: boolean;
}

export const Location: FC<LocationAndDeliveryProps> = (props) => {
  const [editLocationAndDelivery, { loading }] =
    useEditCarLocationAndDeliveryMutation();
  const [values, setValues] = useState<CarLocationAndDeliveryInput>();

  console.log("props.value :>> ", props.value);

  useEffect(() => {
    if (props.value) {
      setValues({
        location: props.value.location!,
        delivery: props.value.delivery!,
      });
    }
  }, [props.value]);

  const handleLocationChange = (data: any) => {
    setValues({ ...values!, location: data.formatted_address });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "delivery") {
      const tempDelivery = e.target.value === "true" ? true : false;
      setValues({ ...values!, delivery: tempDelivery! });
    }
  };

  // const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        ...values!,
        delivery: values!.delivery === undefined ? false : values!.delivery,
      };
      let response = await editLocationAndDelivery({
        variables: { carId: props.carId!, input: { ...payload! } },
      });
      if (response.data?.editCarLocationAndDelivery.error) {
      } else if (response.data?.editCarLocationAndDelivery.carId) {
        props.setCompData(response.data.editCarLocationAndDelivery.car!);
        props.setActiveSlide && props.setActiveSlide(props.activeSlide! + 1);
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
      <h3>Location</h3>
      <p className="mb-2">
        This is the location of your car. If guests search for cars that match
        this location,it will appear in their search .
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mileage">Where is your car located?</label>
          <AutoComplete
            placeholder="Car location"
            handler={handleLocationChange}
            inputRef={inputRef}
            name="location"
            value={values?.location!}
            required={true}
          />
        </div>
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            value={values?.delivery ? "false" : "true"}
            id="provide-delivery"
            checked={values?.delivery}
            name="delivery"
            onChange={handleChange}
            // required
          />
          <label className="form-check-label" htmlFor="provide-delivery">
            I will deliver car to requested location
          </label>
        </div>

        {props.isManage ? (
          <UpdateBtn
            loading={loading}
            disabled={props.verificationInProgress}
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
