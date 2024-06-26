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
import { ToastWrapper } from "../Toast/ToastWrapper";
import { FormNextPrevButton } from "./FormNextPrevButton";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface RatesProps {
  value: CarRatesInput;
  // setData: Dispatch<SetStateAction<CarRatesInput>>;
  carId: string | undefined;
  // car: Car;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;

  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  compData: Car;
  isManage?: boolean;
  isChauffeurDriven: boolean;
  canRentHourly: boolean;
  isActive?: boolean;
  // verificationInProgress?: boolean;
}

export const Rates: FC<RatesProps> = (props) => {
  const [editRates, { loading }] = useEditCarRatesMutation();
  const [values, setValues] = useState<CarRatesInput>();
  const [invalidDailyRate, setInvalidDailyRate] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

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
  };

  return (
    <div>
      {showSaveToast && (
        <ToastWrapper
          setShow={setShowSaveToast}
          show={showSaveToast}
          message={"Updated successfully!"}
          position="bottom-end"
          bg="success"
        />
      )}
      <h3>Rates</h3>
      <p className="mb-2">
        You are here to make money. Set your rates below. You can edit them
        based on market and your preference.
      </p>
      <form onSubmit={handleSubmit} className="mb-3">
        {invalidDailyRate && (
          <small className="text-danger">
            Daily rate should be a value greater than zero!
          </small>
        )}
        {props.canRentHourly && (
          <div className="mb-4">
            <label htmlFor="mileage">Hourly Rate</label>
            <div>
              <small>
                This is amount guest will pay for your car in an hour.{" "}
                {props.isChauffeurDriven && "It should include the driver fee"}
              </small>
            </div>

            <div className="input-group car-input-width mb-3">
              <input
                type="number"
                name="hourly_rate"
                className="form-control"
                value={values?.hourly_rate ? values?.hourly_rate : ""}
                required
                onChange={handleChange}
                placeholder="eg 1000"
                min={0}
                onFocus={handleFocus}
              />
              <span className="input-group-text">Ksh</span>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="mileage">Daily Rate</label>
          <div>
            <small>
              This is amount guest will pay for your car in a day.{" "}
              {props.isChauffeurDriven && "It should include the driver fee"}
            </small>
          </div>

          <div className="input-group car-input-width mb-3">
            <input
              type="number"
              name="daily_rate"
              className="form-control"
              value={values?.daily_rate ? values?.daily_rate : ""}
              required
              onChange={handleChange}
              min={0}
              placeholder="eg 5500"
              onFocus={handleFocus}
            />
            <span className="input-group-text">Ksh</span>
          </div>
          {/* <input
            type="number"
            name="daily_rate"
            className="form-control"
            value={values?.daily_rate}
            required
            onChange={handleChange}
            min={0}
            // placeholder="eg John Doe"
            onFocus={handleFocus}
          /> */}
        </div>
        <div className="mb-4">
          <label htmlFor="discount">Discount (Optional)</label>
          <div>
            <small>
              You may want to give discount to your guests based on various
              things. eg. No. of days they rent your car{" "}
              <b>Note: This discount will be applied on the total trip fee</b>
            </small>
          </div>
          <div className="input-group car-input-width mb-3">
            <input
              type="text"
              name="discount"
              className="form-control"
              value={values?.discount!}
              // required
              onChange={handleChange}
              placeholder="eg 1.5"
              id="discount"
            />
            <span className="input-group-text">%</span>
          </div>
          {/* <input
            type="text"
            name="discount"
            className="form-control"
            value={values?.discount!}
            // required
            onChange={handleChange}
            placeholder="eg 2"
            id="discount"
          /> */}
        </div>
        <div className="mb-4">
          <label htmlFor="discount_days">Discount Days (Optional)</label>
          <div>
            <small>
              Add the minimum number of days which you will give the guest the
              discount above. eg 7 days. This means that if a guest rents your
              car for 7+ days, the discount above will be applied.
            </small>
          </div>
          <div className="input-group car-input-width mb-3">
            <input
              type="number"
              name="discount_days"
              className="form-control"
              value={values?.discount_days ? values?.discount_days : ""}
              // required
              onChange={handleChange}
              placeholder="eg 7"
            />
            <span className="input-group-text">days</span>
          </div>
          {/* <input
            type="number"
            name="discount_days"
            className="form-control"
            value={values?.discount_days!}
            // required
            onChange={handleChange}
            // placeholder="eg 200"
          /> */}
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

        {/* {props.compData?.has_driver && (
          <div className="mb-4">
            <label htmlFor="discount_days">Driver Daily Rate</label>
            <div>
              <small>
                You selected that you will provide a driver if a guest requires
                one. Add the rate for the driver below.
                <b>Note: This rate is daily.</b>
              </small>
            </div>
            <div className="input-group car-input-width mb-3">
              <input
                type="number"
                name="driver_daily_rate"
                className="form-control"
                value={values?.driver_daily_rate!}
                required
                onChange={handleChange}
              />
              <span className="input-group-text">Ksh</span>
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
        )} */}

        {props.compData?.delivery && (
          <div className="mb-4">
            <label htmlFor="discount_days">Delivery Rate</label>
            <div>
              <small>
                You selected that you will provide delivery if a guest requires
                the car in a specific location. Add the rate per km for the
                delivery below.
              </small>
            </div>
            <div className="input-group car-input-width mb-3">
              <input
                type="number"
                name="delivery_rate"
                className="form-control"
                value={values?.delivery_rate ? values?.delivery_rate : ""}
                required
                onChange={handleChange}
                placeholder="eg 500"
              />
              <span className="input-group-text">Ksh/Km</span>
            </div>
            {/* <input
              type="number"
              name="delivery_rate"
              className="form-control"
              value={values?.delivery_rate!}
              required
              onChange={handleChange}
              // placeholder="eg 200"
            /> */}
          </div>
        )}

        {props.isManage ? (
          <UpdateBtn loading={loading} disabled={props.isActive} />
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
