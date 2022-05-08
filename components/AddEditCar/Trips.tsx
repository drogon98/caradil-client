import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Car,
  CarTripSettingsInput,
  useEditCarTripSettingsMutation,
} from "../../graphql_types/generated/graphql";
import { ToastWrapper } from "../Toast/ToastWrapper";
import { FormNextPrevButton } from "./FormNextPrevButton";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface TripsProps {
  value: CarTripSettingsInput;
  // setData: Dispatch<SetStateAction<CarAvailabilityInput>>;
  carId: number | undefined;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  manual: boolean;
  isSelfDriven: boolean;
  isManage?: boolean;
  isActive?: boolean;

  // booked?: boolean;
  // verificationInProgress?: boolean;
}

export const Trips: FC<TripsProps> = (props) => {
  const [editTripSettings, { loading }] = useEditCarTripSettingsMutation();
  // const [saved, setSaved] = useState(false);
  const [values, setValues] = useState<CarTripSettingsInput>();
  const [invalidAdvanceData, setInvalidAdvanceData] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  useEffect(() => {
    if (props.value) {
      setValues({ ...props.value });
    }
  }, [props.value]);

  const handleChange = (e: any) => {
    if (e.target.name === "book_and_trip_days") {
      // Initially the array will be empty
      let arr;
      if (values?.book_and_trip_days.length === 0) {
        arr = [10, 10, 10, 10, 10, 10, 10]; // If a day is not selected default val is 10
      } else {
        arr = [...(values?.book_and_trip_days ?? [])];
      }

      let selectedDay = parseInt(e.target.value, 10);
      let dayAlreadySelected = arr[selectedDay] !== 10;

      if (dayAlreadySelected) {
        arr[selectedDay] = 10;
      } else {
        arr[selectedDay] = selectedDay;
      }

      setValues({ ...values!, book_and_trip_days: [...arr] });
    } else if (e.target.name === "advance_book_period") {
      setValues({
        ...values!,
        [e.target.name]: parseInt(e.target.value, 10),
      });
    } else if (
      e.target.name === "trip_type" ||
      e.target.name === "car_market_class"
    ) {
      setValues({
        ...values!,
        [e.target.name]: e.target.value,
      });
    } else {
      setValues({
        ...values!,
        [e.target.name]: e.target.value === "true" ? true : false,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values?.advance_book_period) {
      setInvalidAdvanceData(true);
      return;
    }

    try {
      let response = await editTripSettings({
        variables: {
          carId: props.carId!,
          input: {
            advance_book_period: values?.advance_book_period!,
            book_and_trip_days: values.book_and_trip_days,
            car_market_class: values.car_market_class,
            can_rent_hourly: values.can_rent_hourly!,
            trip_type: values.trip_type!,
            manual_transmission_test: values?.manual_transmission_test!,
          },
        },
      });

      if (response.data?.editCarTripSettings.error) {
        console.log(
          "response.data?.editTripSettings.error :>> ",
          response.data?.editCarTripSettings.error
        );
      } else if (response.data?.editCarTripSettings.carId) {
        props.setCompData(response.data.editCarTripSettings.car!);

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
    if (invalidAdvanceData) {
      setInvalidAdvanceData(false);
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
      <h3>Trips Settings</h3>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-4">
          <p className="mb-2">
            Select days your car can be booked and be involved in a trip eg If
            you select only SUN,your car can only be booked on sunday and be on
            a trip on sunday. Neither of these can happen on another day.
          </p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="book_and_trip_days_0"
              value={0}
              onChange={handleChange}
              name="book_and_trip_days"
              checked={values?.book_and_trip_days?.[0] === 0 ?? false}
            />
            <label className="form-check-label" htmlFor="book_and_trip_days_0">
              SUN
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="book_and_trip_days_1"
              value={1}
              onChange={handleChange}
              name="book_and_trip_days"
              checked={values?.book_and_trip_days?.[1] === 1 ?? false}
            />
            <label className="form-check-label" htmlFor="book_and_trip_days_1">
              MON
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="book_and_trip_days_2"
              value={2}
              onChange={handleChange}
              name="book_and_trip_days"
              checked={values?.book_and_trip_days?.[2] === 2 ?? false}
            />
            <label className="form-check-label" htmlFor="book_and_trip_days_2">
              TUE
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="book_and_trip_days_3"
              value={3}
              onChange={handleChange}
              name="book_and_trip_days"
              checked={values?.book_and_trip_days?.[3] === 3 ?? false}
            />
            <label className="form-check-label" htmlFor="book_and_trip_days_3">
              WED
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="book_and_trip_days_4"
              value={4}
              onChange={handleChange}
              name="book_and_trip_days"
              checked={values?.book_and_trip_days?.[4] === 4 ?? false}
            />
            <label className="form-check-label" htmlFor="book_and_trip_days_4">
              THU
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="book_and_trip_days_5"
              value={5}
              onChange={handleChange}
              name="book_and_trip_days"
              checked={values?.book_and_trip_days?.[5] === 5 ?? false}
            />
            <label className="form-check-label" htmlFor="book_and_trip_days_5">
              FRI
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="book_and_trip_days_6"
              value={6}
              onChange={handleChange}
              name="book_and_trip_days"
              checked={values?.book_and_trip_days?.[6] === 6 ?? false}
            />
            <label className="form-check-label" htmlFor="book_and_trip_days_6">
              SAT
            </label>
          </div>
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            value={values?.can_rent_hourly ? "false" : "true"}
            id="can_rent_hourly"
            name="can_rent_hourly"
            checked={values?.can_rent_hourly}
            onChange={handleChange}
            // required
          />
          <label className="form-check-label" htmlFor="can_rent_hourly">
            I can rent out this car for trips lasting less than 24hrs
          </label>
        </div>

        <div className="mb-4">
          <label className="mb-2">
            Which type of trips is this car elligible for?
          </label>
          <div className="form-check mb-1">
            <input
              className="form-check-input"
              type="radio"
              name="trip_type"
              id="trip_type_leisure"
              value={"leisure"}
              checked={values?.trip_type === "leisure"}
              onChange={handleChange}
              // required
            />
            <p className="form-check-label">
              <small>Leisure trips</small>
            </p>
          </div>
          <div className="form-check mb-1">
            <input
              className="form-check-input"
              type="radio"
              name="trip_type"
              id="trip_type_business"
              value={"business"}
              checked={values?.trip_type === "business"}
              onChange={handleChange}
              // required
            />
            <p className="form-check-label">
              <small>Business trips</small>
            </p>
          </div>
          <div className="form-check mb-1">
            <input
              className="form-check-input"
              type="radio"
              name="trip_type"
              id="both_trip_types"
              value={"both"}
              checked={values?.trip_type === "both"}
              onChange={handleChange}
              // required
            />
            <p className="form-check-label">
              <small>Both leisure and business trips</small>
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label>Which is your car market class?</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="car_market_class"
              id="car_market_class_budget"
              value={"budget_car"}
              onChange={handleChange}
              checked={values?.car_market_class === "budget_car"}
            />

            <p className="form-check-label">
              <small>Budget Car</small>
            </p>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="car_market_class"
              id="car_market_class_luxury"
              value={"luxury_car"}
              onChange={handleChange}
              checked={values?.car_market_class === "luxury_car"}
            />

            <p className="form-check-label">
              <small>Luxury Car</small>
            </p>
          </div>
        </div>

        {props.isSelfDriven && props.manual && (
          <div className="mb-3">
            <p className="mb-1">
              Some drivers are not that proficient with manual cars. Check the
              box below if you want to test the guest's gear shift skills before
              handing them your car.
            </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={values?.manual_transmission_test ? "false" : "true"}
                id="provide-driver"
                checked={values?.manual_transmission_test ?? false}
                onChange={handleChange}
                name="manual_transmission_test"
              />
              <label className="form-check-label" htmlFor="provide-driver">
                Yes,I need to test the driver gear shift skills
              </label>
            </div>
          </div>
        )}

        {invalidAdvanceData && (
          <small className="text-danger">
            Please select the advance period to be notified of a booked trip
          </small>
        )}

        <div className="mb-3">
          <label>How advance do you want to be notified of a booked trip</label>
          <div>
            <select
              name="advance_book_period"
              onChange={handleChange}
              value={values?.advance_book_period ?? 1}
              // required
              onFocus={handleFocus}
            >
              <option value="">Choose...</option>
              <option value={1}>1 day before the trip</option>
              <option value={2}>2 days before the trip</option>
              <option value={3}>3 days before the trip</option>
              <option value={4}>Anytime before the trip</option>
            </select>
          </div>
          <div className="mt-2">
            <small>
              Enough advance time will help you prepare your car for the guest.
              eg Cleaning it,fueling it etc
            </small>
          </div>
        </div>

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
