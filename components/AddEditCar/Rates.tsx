import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Car,
  CarRatesInput,
  useEditCarRatesMutation,
} from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface RatesProps {
  value: CarRatesInput;
  // setData: Dispatch<SetStateAction<CarRatesInput>>;
  carId: number | undefined;
  // car: Car;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;

  setActiveSlide: Dispatch<SetStateAction<number>>;
  activeSlide: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  compData: Car;
}

/**
 * @author @CodeYourEmpire
 * @function @Rates
 **/

export const Rates: FC<RatesProps> = (props) => {
  const [editRates, { loading }] = useEditCarRatesMutation();
  const [values, setValues] = useState<CarRatesInput>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "discount") {
      setValues({
        ...values!,
        [e.target.name]: e.target.value.trim(),
      });
    } else {
      setValues({
        ...values!,
        [e.target.name]: parseInt(e.target.value.trim()),
      });
    }
  };

  useEffect(() => {
    if (props.value) {
      setValues({ ...props.value });
    }
  }, [props.value]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await editRates({
        variables: { carId: props.carId!, input: values! },
      });

      if (response.data?.editCarRates.error) {
      } else if (response.data?.editCarRates.carId) {
        props.setCompData(response.data.editCarRates.car!);
        props.setActiveSlide(props.activeSlide + 1);
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
    <div>
      <h3>Rates</h3>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="mileage">Hourly Rate</label>
          <input
            type="number"
            name="hourly_rate"
            className="form-control"
            value={props.value.hourly_rate}
            required
            onChange={handleChange}
            placeholder="eg John Doe"
          />
        </div> */}
        <div>
          <label htmlFor="mileage">Daily Rate</label>
          <input
            type="number"
            name="daily_rate"
            className="form-control"
            value={values?.daily_rate}
            required
            onChange={handleChange}
            placeholder="eg John Doe"
          />
        </div>
        <div>
          <label htmlFor="discount">Discount</label>
          <input
            type="text"
            name="discount"
            className="form-control"
            value={values?.discount!}
            // required
            onChange={handleChange}
            placeholder="eg John Doe"
            id="discount"
          />
        </div>
        <div>
          <label htmlFor="discount_days">Discount Days</label>
          <input
            type="number"
            name="discount_days"
            className="form-control"
            value={values?.discount_days!}
            // required
            onChange={handleChange}
            placeholder="eg 200"
          />
        </div>
        {/* {values?.has_unlimited_distance === false && (
          <div>
            <label htmlFor="mileage">Extra Distance Rate</label>
            <input
              type="number"
              name="extra_distance_rate"
              className="form-control"
              value={values.extra_distance_rate!}
              required
              // onChange={handleChange}
              placeholder="eg 200"
            />
          </div>
        )} */}

        {props.compData?.has_driver && (
          <div>
            <label htmlFor="discount_days">Driver Daily Rate</label>
            <input
              type="number"
              name="driver_daily_rate"
              className="form-control"
              value={values?.driver_daily_rate!}
              // required
              onChange={handleChange}
              placeholder="eg 200"
            />
          </div>
        )}

        {props.compData?.delivery && (
          <div>
            <label htmlFor="discount_days">Delivery Rate</label>
            <input
              type="number"
              name="delivery_rate"
              className="form-control"
              value={values?.delivery_rate!}
              // required
              onChange={handleChange}
              placeholder="eg 200"
            />
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button onClick={() => props.setActiveSlide(props.activeSlide - 1)}>
            Prev
          </button>
          <button type="submit">Next</button>
        </div>

        {/* <FormSaveButton
          loading={loading}
          saved={saved}
          isEdit={false}
          carId={props.carId!}
        /> */}
      </form>
    </div>
  );
};
