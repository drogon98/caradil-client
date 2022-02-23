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
import { carMakes } from "../../data";
import {
  Car,
  CarGeneralInfoInput,
  useAddEditCarGeneralInfoMutation,
} from "../../graphql_types/generated/graphql";
import { ToastWrapper } from "../Toast/ToastWrapper";
import { FormNextPrevButton } from "./FormNextPrevButton";
import RequestEditModal from "./ManageCar/RequestEditModal";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface GeneralInfoProps {
  value: CarGeneralInfoInput;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  isResume?: boolean;
  setCarId?: Dispatch<SetStateAction<number | undefined>>;
  carId: number | undefined;
  isManage?: boolean;
  isEdit?: boolean; // Under Manage
  booked?: boolean;
  hasEditRequest?: boolean;
  // verificationInProgress?: boolean;
}

export const GeneralInfo: FC<GeneralInfoProps> = (props) => {
  const [addEditCarGeneralInfo, { loading }] =
    useAddEditCarGeneralInfoMutation();
  const [invalidOdoReading, setInvalidOdReading] = useState(false);
  const [showRequestEditModal, setShowRequestEditModal] = useState(false);
  const [invalidCarName, setInvalidCarName] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [values, setValues] = useState<CarGeneralInfoInput>();
  const [duplicateRegNo, setDuplicateRegNo] = useState(false);

  useEffect(() => {
    let tempData = {
      name: props.value.name,
      reg_no: props.value.reg_no,
      id_or_passport_no: props.value.id_or_passport_no,
      make: props.value.make,
      odometer_reading: props.value.odometer_reading,
      end_user_type: props.value.end_user_type,
      is_gps_enabled: props.value.is_gps_enabled,
    };

    setValues({ ...tempData });
  }, [props.value]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "reg_no") {
      setValues({
        ...values!,
        [e.target.name]: e.target.value.trim().toUpperCase(),
      });
    } else if (e.target.name === "odometer_reading") {
      setValues({ ...values!, [e.target.name]: parseInt(e.target.value, 10) });
    } else if (e.target.name === "is_gps_enabled") {
      setValues({
        ...values!,
        [e.target.name]: e.target.value === "true" ? true : false,
      });
    } else {
      setValues({ ...values!, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values?.odometer_reading === 0) {
      setInvalidOdReading(true);
      return;
    }

    let nameSections = values?.name.split(" ");
    if (nameSections?.length !== 3) {
      setInvalidCarName(true);
    }

    if (invalidCarName) {
      return;
    }

    try {
      let response = await addEditCarGeneralInfo({
        variables: {
          options: {
            ...values!,
            name: values?.name.trim()!,
            // has_driver:
            //   values?.has_driver === undefined ? false : values.has_driver,
          },
          isEdit: props.isResume || props.isManage ? true : false,
          carId: props.carId,
        },
      });

      if (response?.data?.addEditCarGeneralInfo.error) {
        console.log(
          "response?.data?.addEditCarGeneralInfo.error :>> ",
          response?.data?.addEditCarGeneralInfo.error
        );
      } else if (response?.data?.addEditCarGeneralInfo.carId) {
        props.setCompData(response.data.addEditCarGeneralInfo.car!);
        if (!props.isResume && !props.isManage) {
          sessionStorage.setItem(
            "carId",
            response.data.addEditCarGeneralInfo.car?.id?.toString()!
          );
        }

        if (props.isManage) {
          setShowSaveToast(true);
        } else {
          props.setCarId!(response.data.addEditCarGeneralInfo.car?.id!);
          props.setActiveSlide && props.setActiveSlide(props.activeSlide! + 1);
        }
      }
    } catch (error) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (errorMessage && errorMessage.includes("duplicate key")) {
        setDuplicateRegNo(true);
      }
      console.log("errorMessage :>> ", errorMessage);
      return;
      // setError("Network Error!");
    }
  };

  const handleOdoFocus = () => {
    if (invalidOdoReading) {
      setInvalidOdReading(false);
    }
  };

  const handleNameFocus = () => {
    if (invalidCarName) {
      setInvalidCarName(false);
    }
  };

  const handleRegNoFocus = () => {
    if (duplicateRegNo) {
      setDuplicateRegNo(false);
    }
  };

  const handleRequestEditClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (props.hasEditRequest) {
      return;
    }
    setShowRequestEditModal(true);
  };

  const handleCarNameBlur = (e: any) => {
    try {
      if (values?.name) {
        let nameSections = values?.name.split(" ");
        if (nameSections) {
          setInvalidCarName(nameSections.length < 3);
        } else {
          throw new Error("");
        }
      }
    } catch (error) {
      setInvalidCarName(true);
    }
  };

  const handleNameType = () => {
    try {
      let nameSections = values?.name.split(" ");
      if (nameSections) {
        setInvalidCarName(nameSections.length < 3);
        return;
      } else {
        throw new Error("");
      }
    } catch (error) {
      setInvalidCarName(true);
    }
  };

  // console.log("values :>> ", values);

  return (
    <>
      {showRequestEditModal && (
        <RequestEditModal
          booked={props.booked!}
          showModal={showRequestEditModal}
          handleClose={() => setShowRequestEditModal(false)}
          carId={props.carId!}
          setCarData={props.setCompData}
        />
      )}
      {showSaveToast && (
        <ToastWrapper
          setShow={setShowSaveToast}
          show={showSaveToast}
          message={"Updated successfully!"}
          position="bottom-end"
        />
      )}
      <h4>General Info</h4>
      <p className="mb-3">
        Add your car name. Make it unique with minimum and maximum of three
        words long eg. <b>Subaru Forester 2016</b>.
      </p>
      <form
        className="form-group mb-3"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {invalidOdoReading && (
          <small className="text-danger">
            Odometer reading must be a value greater than 0!
          </small>
        )}
        {duplicateRegNo && (
          <small className="text-danger">
            A car with this registration no. already exists!
          </small>
        )}
        <div className="row m-0">
          <div className="col-6 p-0">
            <div>
              {invalidCarName && (
                <small className="text-danger">
                  Name should be 3 words long!
                </small>
              )}
            </div>
            <label>Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control car-general-info-input-width"
              value={values?.name}
              required
              onChange={handleChange}
              placeholder="eg Subaru Forester 2016"
              onBlur={handleCarNameBlur}
              onKeyUp={handleNameType}
              onFocus={handleNameFocus}
              // disabled={props.isManage && !props.isEdit}
            />
          </div>
          <div className="col-6 p-0">
            <label>Make</label>
            <select
              className="form-select form-control car-general-info-input-width"
              aria-label="Default select example"
              onChange={handleChange}
              value={values?.make}
              name="make"
              // disabled={props.isManage && !props.isEdit}
              required
            >
              <option value={""}>Select Make</option>
              {carMakes.map((make, idx) => (
                <option key={idx} value={make.toLowerCase()}>
                  {make}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row m-0 mt-3">
          <div className="col-6 p-0">
            <label>Owner Id/Passport No.</label>
            <input
              type="text"
              name="id_or_passport_no"
              className="form-control car-general-info-input-width"
              value={values?.id_or_passport_no}
              required
              onChange={handleChange}
              placeholder="eg 11111111"
              onFocus={handleRegNoFocus}
              // disabled={props.isManage && !props.isEdit}
            />
          </div>
          <div className="col-6 p-0">
            <label>Registration No.</label>
            <input
              type="text"
              name="reg_no"
              className="form-control car-general-info-input-width"
              value={values?.reg_no}
              required
              onChange={handleChange}
              placeholder="eg KBA111C"
              onFocus={handleRegNoFocus}
              // disabled={props.isManage && !props.isEdit}
            />
          </div>
        </div>

        <div className="row m-0 mt-3">
          <div className="container p-0">
            <label>Which driving mode is this car elligible for?</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value={"self_driven"}
                id="end_user_type_self"
                checked={values?.end_user_type === "self_driven"}
                name="end_user_type"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Self Driven (Guest will have to drive the car)
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value={"chauffeur_driven"}
                id="end_user_type_chauffeur"
                checked={values?.end_user_type === "chauffeur_driven"}
                name="end_user_type"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Chauffer Driven (This is your driver or you)
              </label>
            </div>
          </div>
        </div>
        {/* </div> */}

        <div className="row m-0 mt-3">
          <div className="container p-0">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={values?.is_gps_enabled ? "false" : "true"}
                id="gps-enabled"
                checked={values?.is_gps_enabled}
                name="is_gps_enabled"
                onChange={handleChange}
                // disabled={props.isManage && !props.isEdit}
              />
              <label className="form-check-label" htmlFor="gps-enabled">
                Is GPS enabled
              </label>
            </div>
            {!values?.is_gps_enabled && (
              <div className="text-danger">
                <small>
                  Listing a car that is not gps enabled is at your own risk. GPS
                  will help us track the car if there are any issues.
                </small>
              </div>
            )}
          </div>
        </div>

        {/* {!props.isEdit && props.isManage && (
          <div className="mt-3">
            <small>
              This information is only editable with permisson from the admin.{" "}
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
        )} */}

        {props.isManage ? (
          <UpdateBtn loading={loading} disabled={loading} />
        ) : (
          <FormNextPrevButton
            loading={loading}
            disabled={loading}
            setActiveSlide={props.setActiveSlide!}
            activeSlide={props.activeSlide!}
          />
        )}
      </form>
    </>
  );
};
