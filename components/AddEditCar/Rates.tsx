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
import { FormNextPrevButton } from "./FormNextPrevButton";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface RatesProps {
  value: CarRatesInput;
  // setData: Dispatch<SetStateAction<CarRatesInput>>;
  carId: number | undefined;
  // car: Car;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;

  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  compData: Car;
  isManage?: boolean;
}

/**
 * @author @CodeYourEmpire
 * @function @Rates
 **/

export const Rates: FC<RatesProps> = (props) => {
  const [editRates, { loading }] = useEditCarRatesMutation();
  const [values, setValues] = useState<CarRatesInput>();
  const [invalidDailyRate, setInvalidDailyRate] = useState(false);

  const handleFocus = () => {
    if (invalidDailyRate) {
      setInvalidDailyRate(false);
    }
  };

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
    if (values?.daily_rate === 0) {
      setInvalidDailyRate(true);
      return;
    }
    try {
      let response = await editRates({
        variables: { carId: props.carId!, input: values! },
      });

      if (response.data?.editCarRates.error) {
      } else if (response.data?.editCarRates.carId) {
        props.setCompData(response.data.editCarRates.car!);
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
  };

  return (
    <div>
      <h3>Rates</h3>
      <p className="mb-2">
        You are here to make money. Set your rates below. You can edit them
        based on market and your preference.
      </p>
      <form onSubmit={handleSubmit}>
        {invalidDailyRate && (
          <small className="text-danger">
            Daily rate should be a value greater than zero!
          </small>
        )}

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
        <div className="mb-4">
          <label htmlFor="mileage">Daily Rate</label>
          <div>
            <small>This is amount guest will pay for your car in a day</small>
          </div>
          <input
            type="number"
            name="daily_rate"
            className="form-control"
            value={values?.daily_rate}
            required
            onChange={handleChange}
            min={0}
            // placeholder="eg John Doe"
            onFocus={handleFocus}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discount">Discount (Optional)</label>
          <div>
            <small>
              You may want to give discount to your guests based on various
              things. eg. No. of days they rent your car
            </small>
          </div>
          <input
            type="text"
            name="discount"
            className="form-control"
            value={values?.discount!}
            // required
            onChange={handleChange}
            placeholder="eg 2"
            id="discount"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discount_days">Discount Days (Optional)</label>
          <div>
            <small>
              Add the minimum number of days which you will give the guest
              discount above. eg 7 days. This means that if a guest rents your
              car for 7+ days, the discount above will be applied.
            </small>
          </div>
          <input
            type="number"
            name="discount_days"
            className="form-control"
            value={values?.discount_days!}
            // required
            onChange={handleChange}
            // placeholder="eg 200"
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
          <div className="mb-4">
            <label htmlFor="discount_days">Driver Daily Rate</label>
            <div>
              <small>
                You selected that you will provide a driver if a guest requires
                one. Add the rate for the driver below.
                <b>Note: This rate is daily.</b>
              </small>
            </div>
            <input
              type="number"
              name="driver_daily_rate"
              className="form-control"
              value={values?.driver_daily_rate!}
              required
              onChange={handleChange}
              // placeholder="eg 200"
            />
          </div>
        )}

        {props.compData?.delivery && (
          <div className="mb-4">
            <label htmlFor="discount_days">Delivery Rate</label>
            <div>
              <small>
                You selected that you will provide delivery if a guest requires
                the car in a specific location. Add the rate for the delivery
                below.
              </small>
            </div>
            <input
              type="number"
              name="delivery_rate"
              className="form-control"
              value={values?.delivery_rate!}
              required
              onChange={handleChange}
              // placeholder="eg 200"
            />
          </div>
        )}

        {props.isManage ? (
          <UpdateBtn loading={loading} />
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
