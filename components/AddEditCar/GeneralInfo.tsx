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

  const [values, setValues] = useState<CarGeneralInfoInput>();

  useEffect(() => {
    let tempData = {
      name: props.value.name,
      reg_no: props.value.reg_no,
      make: props.value.make,
      odometer_reading: props.value.odometer_reading,
      has_driver: props.value.has_driver,
      // is_gps_enabled: props.value.is_gps_enabled,
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
    } else if (e.target.name === "has_driver") {
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
            has_driver:
              values?.has_driver === undefined ? false : values.has_driver,
          },
          isEdit: props.isResume || props.isManage ? true : false,
          carId: props.carId,
        },
      });

      if (response?.data?.addEditCarGeneralInfo.error) {
      } else if (response?.data?.addEditCarGeneralInfo.carId) {
        props.setCompData(response.data.addEditCarGeneralInfo.car!);
        if (!props.isResume) {
          sessionStorage.setItem(
            "carId",
            response.data.addEditCarGeneralInfo.car?.id?.toString()!
          );
        }

        props.setCarId!(response.data.addEditCarGeneralInfo.car?.id!);
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
        <div className="row m-0">
          <div className="col">
            <div>
              {invalidCarName && (
                <small className="text-danger">
                  Name should be 3 words long!
                </small>
              )}
            </div>
            <label htmlFor="name">Name</label>
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
          <div className="col">
            <label htmlFor="carMake">Make</label>
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
          <div className="col-6">
            <label htmlFor="carName">Registration No.</label>
            <input
              type="text"
              name="reg_no"
              className="form-control car-general-info-input-width"
              value={values?.reg_no}
              required
              onChange={handleChange}
              placeholder="eg KBA111C"
              // disabled={props.isManage && !props.isEdit}
            />
          </div>
          <div className="col-6">
            <label htmlFor="carName">Odometer Reading</label>
            <input
              type="number"
              name="odometer_reading"
              className="form-control car-general-info-input-width"
              value={values?.odometer_reading}
              required
              onChange={handleChange}
              placeholder="eg 80000"
              min={0}
              onFocus={handleOdoFocus}
              // disabled={props.isManage && !props.isEdit}
            />
          </div>
        </div>
        <div className="row m-0">
          <div className="container">
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                value={values?.has_driver ? "false" : "true"}
                id="gps-enabled"
                checked={values?.has_driver}
                name="has_driver"
                onChange={handleChange}
                // disabled={props.isManage && !props.isEdit}
              />
              <label className="form-check-label" htmlFor="gps-enabled">
                I Will Provide a Driver?
              </label>
            </div>
            {!values?.has_driver && (
              <div>
                <small className="text-danger">
                  <b>
                    We are only listings cars that will have drivers on renting.
                  </b>
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
            disabled={loading || !values?.has_driver}
            setActiveSlide={props.setActiveSlide!}
            activeSlide={props.activeSlide!}
          />
        )}
      </form>
    </>
  );
};
