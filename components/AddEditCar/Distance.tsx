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
  CarDistanceInput,
  useEditCarDistanceMutation,
} from "../../graphql_types/generated/graphql";
import { ToastWrapper } from "../Toast/ToastWrapper";
import { FormNextPrevButton } from "./FormNextPrevButton";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface DistanceProps {
  value: CarDistanceInput;
  carId: number | undefined;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  isManage?: boolean;
  canRentHourly: boolean;
  // verificationInProgress?: boolean;
}

export const Distance: FC<DistanceProps> = (props) => {
  const [editDistance, { loading }] = useEditCarDistanceMutation();
  const [values, setValues] = useState<CarDistanceInput>();
  const [showExtraDistanceText, setShowExtraDistanceText] = useState(false);
  const [invalidDistanceError, setInvalidDistanceError] = useState(false);

  const [showSaveToast, setShowSaveToast] = useState(false);

  useEffect(() => {
    if (props.value) {
      setValues({ ...props.value! });
    }
  }, [props.value]);

  useEffect(() => {
    if (values?.charge_extra_distance_travelled) {
      setShowExtraDistanceText(true);
    } else {
      setShowExtraDistanceText(false);
    }
  }, [values?.charge_extra_distance_travelled]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "has_unlimited_distance") {
      if (e.target.value === "true") {
        setValues({
          distance_per_day: 0,
          [e.target.name]: true,
          charge_extra_distance_travelled: false,
          distance_per_hour: 0,
        });
      } else {
        setValues({
          ...values!,
          [e.target.name]: false,
        });
      }
    } else if (e.target.name === "charge_extra_distance_travelled") {
      setValues({
        ...values!,
        charge_extra_distance_travelled:
          e.target.value === "true" ? true : false,
      });
    } else {
      setValues({
        ...values!,
        [e.target.name]: parseInt(e.target.value.trim()),
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasHourlyOrDailyDistance =
      values?.distance_per_day || values?.distance_per_hour;
    if (!values?.has_unlimited_distance && !hasHourlyOrDailyDistance) {
      setInvalidDistanceError(true);
      return;
    }

    try {
      let response = await editDistance({
        variables: {
          carId: props.carId!,
          input: { ...values! },
        },
      });

      if (response.data?.editCarDistance.error) {
      } else if (response.data?.editCarDistance.carId) {
        props.setCompData(response.data.editCarDistance.car!);

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

  const handleFocus = () => {
    if (invalidDistanceError) {
      setInvalidDistanceError(false);
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
      <h3>Distance</h3>
      {invalidDistanceError && (
        <small className="text-danger">
          With unlimited distance false,either distance per day or distance per
          hour should be a value greater than 0.
        </small>
      )}

      <p className="mb-2">
        This is the distance your car should cover per day in a trip.
      </p>
      <form onSubmit={handleSubmit} className="mb-3">
        <div>
          <label htmlFor="distance_per_day">Daily Distance (KM)</label>
          <div className="input-group car-input-width mb-3">
            <input
              type="number"
              name="distance_per_day"
              className="form-control "
              value={values?.distance_per_day}
              // required
              onChange={handleChange}
              placeholder="eg 800"
              id="distance_per_day"
              disabled={values?.has_unlimited_distance!}
              min={0}
              onFocus={handleFocus}
            />
            <span className="input-group-text">KM</span>
          </div>

          {props.canRentHourly && (
            <>
              <div>
                By default many of the cars are listed to be rented out on per
                day basis.If you intend to rent out your car on trips lasting
                less than 24 hours then add the maximum distance your car should
                cover in one hour.
              </div>
              <label htmlFor="distance_per_hour">Hourly Distance (KM)</label>
              <div className="input-group car-input-width mb-3">
                <input
                  type="number"
                  name="distance_per_hour"
                  className="form-control "
                  value={values?.distance_per_hour}
                  // required
                  onChange={handleChange}
                  placeholder="eg 80"
                  id="distance_per_hour"
                  disabled={values?.has_unlimited_distance!}
                  min={0}
                  onFocus={handleFocus}
                />
                <span className="input-group-text">KM</span>
              </div>
            </>
          )}
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="charge_extra_distance_travelled"
            value={values?.charge_extra_distance_travelled ? "false" : "true"}
            id="charge_extra_distance_travelled_input"
            checked={values?.charge_extra_distance_travelled}
            onChange={handleChange}
            disabled={values?.has_unlimited_distance!}
            // required
          />
          <label
            className="form-check-label"
            htmlFor="charge_extra_distance_travelled_input"
          >
            I want to charge a fee for extra distance travelled
          </label>
        </div>

        {showExtraDistanceText && (
          <>
            <div className="mt-2 mb-5">
              <small>
                This is how we calculate this fee. If your daily rate is
                ksh.3000 and you have a distance per day of 100km, then the
                extra distance fee is <b>3000/100 = Ksh. 30</b> per km. The same
                calculation applies to distance per hour and hourly rate. This
                fee will be made known to the guest to be aware of it on
                booking. On returning the vehicle, you and the guest will
                determine if there was extra distance travelled. We are not part
                of this transaction. Its between you and the guest.
              </small>
            </div>
          </>
        )}

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="has_unlimited_distance"
            value={values?.has_unlimited_distance ? "false" : "true"}
            id="has_unlimited_distance_input"
            checked={values?.has_unlimited_distance!}
            onChange={handleChange}
            // required
          />
          <label
            className="form-check-label"
            htmlFor="has_unlimited_distance_input"
          >
            This car has Unlimited Distance (Guest can travel any distance.)
          </label>
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
