import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  CarRatesInput,
  useEditCarRatesMutation,
} from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface RatesProps {
  value: CarRatesInput;
  setData: Dispatch<SetStateAction<CarRatesInput>>;
  carId: number | undefined;
}

/**
 * @author @CodeYourEmpire
 * @function @Rates
 **/

export const Rates: FC<RatesProps> = (props) => {
  const [editRates, { loading }] = useEditCarRatesMutation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "discount") {
      props.setData({
        ...props.value,
        [e.target.name]: e.target.value.trim(),
      });
    } else {
      props.setData({
        ...props.value,
        [e.target.name]: parseInt(e.target.value.trim()),
      });
    }
  };
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let response;
    try {
      response = await editRates({
        variables: { carId: props.carId!, input: props.value },
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

    if (response.data?.editCarRates.error) {
    } else if (response.data?.editCarRates.carId) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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
          {/* Parse the amount to check for valid amounts */}
        </div>
        <div>
          <label htmlFor="mileage">Daily Rate</label>
          <input
            type="number"
            name="daily_rate"
            className="form-control"
            value={props.value.daily_rate}
            required
            onChange={handleChange}
            placeholder="eg John Doe"
          />
          {/* Parse the amount to check for valid amounts */}
        </div>
        <div>
          <label htmlFor="discount">Discount</label>
          <input
            type="text"
            name="discount"
            className="form-control"
            value={props.value.discount!}
            // required
            onChange={handleChange}
            placeholder="eg John Doe"
            id="discount"
          />
          {/* Parse the amount to check for valid amounts */}
        </div>
        <div>
          <label htmlFor="discount_days">Discount Days</label>
          <input
            type="number"
            name="discount_days"
            className="form-control"
            value={props.value.discount_days!}
            required
            onChange={handleChange}
            placeholder="eg 200"
          />
          {/* Parse the amount to check for valid amounts */}
        </div>
        {/* Discount logic here */}
        <div>
          <label htmlFor="mileage">Extra mile Rate</label>
          <input
            type="number"
            name="extra_distance_rate"
            className="form-control"
            value={props.value.extra_distance_rate!}
            required
            onChange={handleChange}
            placeholder="eg 200"
          />
          {/* Parse the amount to check for valid amounts */}
        </div>
        <div>
          <label htmlFor="discount_days">Driver Daily Rate</label>
          <input
            type="number"
            name="driver_daily_rate"
            className="form-control"
            value={props.value.driver_daily_rate!}
            required
            onChange={handleChange}
            placeholder="eg 200"
          />
          {/* Parse the amount to check for valid amounts */}
        </div>
        <div>
          <label htmlFor="discount_days">Delivery Rate</label>
          <input
            type="number"
            name="delivery_rate"
            className="form-control"
            value={props.value.delivery_rate!}
            required
            onChange={handleChange}
            placeholder="eg 200"
          />
          {/* Parse the amount to check for valid amounts */}
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
