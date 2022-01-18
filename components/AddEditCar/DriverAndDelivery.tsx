import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
  useState,
} from "react";
import {
  Car,
  CarDriverAndDeliveryInput,
  useEditCarDriverAndDeliveryMutation,
} from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface Props {
  value: CarDriverAndDeliveryInput;
  setData: Dispatch<SetStateAction<CarDriverAndDeliveryInput>>;
  carId: number | undefined;
  manual: boolean;
  setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
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

      if (response.data?.editCarDriverAndDelivery.error) {
      } else if (response.data?.editCarDriverAndDelivery.carId) {
        props.setResponseCar(response.data.editCarDriverAndDelivery.car!);
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "driver_mode") {
      if (e.target.value === "2") {
        props.setData({
          ...props.value,
          manual_transmission_test: false,
          [e.target.name]: parseInt(e.target.value, 10),
        });
      } else {
        props.setData({
          ...props.value,
          [e.target.name]: parseInt(e.target.value, 10),
        });
      }
    } else {
      props.setData({
        ...props.value,
        [e.target.name]: e.target.value === "false" ? false : true,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <p className="mb-2">
            This is how you want guests to drive your car. Some guests want to
            drive the car themselves while others want to be driven. Select the
            mode of driving for your car.
          </p>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="driver_mode"
              id="self_drive_only"
              value={1}
              checked={props.value.driver_mode === 1}
              onChange={handleChange}
              // required
            />
            <label className="form-check-label" htmlFor="self_drive_only">
              Self Drive Only (Guest will have to be the driver)
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="driver_mode"
              id="private_driver_only"
              value={2}
              checked={props.value.driver_mode === 2}
              onChange={handleChange}
              // required
            />
            <label className="form-check-label" htmlFor="private_driver_only">
              My Driver/Chauffeur Only ( This driver can be you)
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="driver_mode"
              id="both_self_drive_and_private_driver"
              value={3}
              checked={props.value.driver_mode === 3}
              onChange={handleChange}
              // required
            />
            <label
              className="form-check-label"
              htmlFor="both_self_drive_and_private_driver"
            >
              Both Self Drive and Private Driver
            </label>
          </div>
          {(props.value.driver_mode === 1 || props.value.driver_mode === 3) &&
            props.manual && (
              <div className="px-3">
                <p className="mb-2">
                  Some drivers are not that proficient with manual cars. Check
                  the box below if you want to test the guest's gear shift
                  skills before handing them your car.
                </p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={
                      props.value.manual_transmission_test ? "false" : "true"
                    }
                    id="provide-driver"
                    checked={props.value.manual_transmission_test}
                    onChange={handleChange}
                    name="manual_transmission_test"
                  />
                  <label className="form-check-label" htmlFor="provide-driver">
                    Yes,I need to test the driver gear shift skills
                  </label>
                </div>
              </div>
            )}
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
            // required
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
