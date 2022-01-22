import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { carColors, carFeatures } from "../../data";
import {
  Car,
  CarFeaturesInput,
  useEditCarFeaturesMutation,
} from "../../graphql_types/generated/graphql";
import { FormNextPrevButton } from "./FormNextPrevButton";
import RequestEditModal from "./ManageCar/RequestEditModal";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface FeaturesProps {
  value: CarFeaturesInput;
  activeSlide?: number;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  carId: number | undefined;
  isManage?: boolean;
  isEdit?: boolean;
  booked?: boolean;
  hasEditRequest?: boolean;
  verificationInProgress: boolean;
}

export const Features: FC<FeaturesProps> = (props) => {
  const [editFeatures, { loading, error }] = useEditCarFeaturesMutation();
  const [values, setValues] = useState<CarFeaturesInput>();
  const [invalidSeats, setInvalidSeats] = useState(false);
  const [invalidDoors, setInvalidDoors] = useState(false);
  const [showRequestEditModal, setShowRequestEditModal] = useState(false);

  useEffect(() => {
    setValues({
      gas: props.value.gas,
      doors: props.value.doors,
      transmission: props.value.transmission,
      seats: props.value.seats,
      color: props.value.color,
      features: props.value.features,
    });
  }, [props.value]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values!, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isAdded = values?.features?.find(
      (val) => val.title === e.target.value
    );
    if (isAdded) {
      let tempValues = values?.features?.filter(
        (val) => val.title !== e.target.value
      );
      setValues({ ...values!, features: [...tempValues!] });
    } else {
      setValues({
        ...values!,
        features: [...(values?.features ?? []), { title: e.target.value }],
      });
    }
    // console.log("e.target.value :>> ", e.target.value);
    //   props.setData(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (parseInt(values?.doors as unknown as string, 10) === 0) {
      setInvalidDoors(true);
      return;
    }

    if (parseInt(values?.seats as unknown as string, 10) === 0) {
      setInvalidSeats(true);
      return;
    }

    const payload = {
      transmission: values?.transmission!,
      gas: values?.gas!,
      color: values?.color!,
      doors: parseInt(values?.doors as unknown as string, 10)!,
      seats: parseInt(values?.seats as unknown as string, 10)!,
      features: values?.features!,
    };

    try {
      // const carId = parseInt(sessionStorage.getItem("carId")!, 10);
      let response = await editFeatures({
        variables: { carId: props.carId!, input: payload! },
      });
      if (response.data?.editCarFeatures.error) {
      } else if (response.data?.editCarFeatures.carId) {
        props.setCompData(response.data.editCarFeatures.car!);
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

  const handleFocus = () => {
    if (invalidDoors || invalidSeats) {
      setInvalidDoors(false);
      setInvalidSeats(false);
    }
  };

  const handleRequestEditClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (props.hasEditRequest) {
      return;
    }
    setShowRequestEditModal(true);
  };

  return (
    <div>
      {showRequestEditModal && (
        <RequestEditModal
          booked={props.booked!}
          showModal={showRequestEditModal}
          handleClose={() => setShowRequestEditModal(false)}
          carId={props.carId!}
          setCarData={props.setCompData}
        />
      )}{" "}
      <h3>Features</h3>
      <p className="mb-3">Add features of your car below</p>
      <form onSubmit={handleSubmit}>
        {invalidDoors && (
          <small className="text-danger">
            Doors must be a value greater than 0!
          </small>
        )}
        {invalidSeats && (
          <small className="text-danger">
            Seats must be a value greater than 0!
          </small>
        )}
        <div className="row">
          <div className="col">
            <label htmlFor="gas">Gas</label>
            <select
              className="form-select form-control car-input-width"
              aria-label="Default select example"
              onChange={handleChange}
              value={values?.gas}
              name="gas"
              required
              disabled={props.isManage && !props.isEdit}
            >
              <option value={""}>Select Gas</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="carName">Transmission</label>
            <select
              className="form-select form-control car-input-width"
              aria-label="Default select example"
              onChange={handleChange}
              value={values?.transmission}
              name="transmission"
              required
              disabled={props.isManage && !props.isEdit}
            >
              <option value={""}>Select Transmission</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <label htmlFor="carName">Color</label>
            <select
              className="form-select form-control car-input-width"
              aria-label="Default select example"
              onChange={handleChange}
              value={values?.color}
              name="color"
              required
              disabled={props.isManage && !props.isEdit}
            >
              <option value={""}>Select Color</option>
              {carColors.map((color, idx) => (
                <option key={idx} value={color.toLowerCase()}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label htmlFor="carName">Seats</label>
            <input
              type="number"
              name="seats"
              className="form-control car-input-width"
              value={values?.seats}
              required
              onChange={handleChange}
              min={0}
              onFocus={handleFocus}
              disabled={props.isManage && !props.isEdit}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6">
            <label htmlFor="carName">Doors</label>
            <input
              type="number"
              name="doors"
              className="form-control car-input-width"
              value={values?.doors}
              required
              onChange={handleChange}
              min={0}
              onFocus={handleFocus}
              disabled={props.isManage && !props.isEdit}
            />
          </div>
        </div>

        {!props.isEdit && (
          <div className="mt-3">
            <small>
              This information above is only editable with permisson from the
              admin.{" "}
              <button
                className="btn colorOrange p-0"
                onClick={handleRequestEditClick}
              >
                {props.hasEditRequest ? (
                  <small className="text-success fw-bold">
                    Edit Request Sent!
                  </small>
                ) : (
                  <small>Request Edit</small>
                )}
              </button>
            </small>
          </div>
        )}

        <div className="mt-3">
          {carFeatures.map((feature, idx) => {
            const isSelected = values?.features?.find(
              (feat) => feat.title === feature
            );
            return (
              <div className="form-check" key={idx}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={feature}
                  checked={isSelected ? true : false}
                  id="flexCheckDefault"
                  onChange={handleFeatureChange}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {feature}
                </label>
              </div>
            );
          })}
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
