import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
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
}

export const GeneralInfo: FC<GeneralInfoProps> = (props) => {
  const [addEditCarGeneralInfo, { loading }] =
    useAddEditCarGeneralInfoMutation();
  const [isValid, setIsValid] = useState(false);
  const [invalidOdoReading, setInvalidOdReading] = useState(false);

  const [values, setValues] = useState<CarGeneralInfoInput>();

  useEffect(() => {
    let tempData = {
      name: props.value.name,
      reg_no: props.value.reg_no,
      make: props.value.make,
      odometer_reading: props.value.odometer_reading,
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

    try {
      let response = await addEditCarGeneralInfo({
        variables: {
          options: { ...values! },
          isEdit: props.isResume ? true : false,
          carId: props.carId,
        },
      });

      if (response?.data?.addEditCarGeneralInfo.error) {
      } else if (response?.data?.addEditCarGeneralInfo.carId) {
        console.log(
          "response.data.addEditCarGeneralInfo.car :>> ",
          response.data.addEditCarGeneralInfo.car
        );
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

  const handleFocus = () => {
    if (invalidOdoReading) {
      setInvalidOdReading(false);
    }
  };

  return (
    <>
      <h4>General Info</h4>
      <p className="mb-3">
        Add your car name. Make it unique with minimum three words a maximum of
        four words long eg. <b>Subaru Forester 2016</b>.
      </p>
      <form
        className="form-group"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {invalidOdoReading && (
          <small className="text-danger">
            Odometer reading must be a value greater than 0!
          </small>
        )}
        <div className="row">
          <div className="col">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              value={values?.name}
              required
              onChange={handleChange}
              placeholder="eg Subaru Forester 2016"
              // disabled={props.isEdit}
            />
          </div>
          <div className="col">
            <label htmlFor="carMake">Make</label>
            <select
              className="form-select form-control"
              aria-label="Default select example"
              onChange={handleChange}
              value={values?.make}
              name="make"
              // disabled={props.isEdit}
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
        <div className="row mt-3">
          <div className="col-6">
            <label htmlFor="carName">Registration No.</label>
            <input
              type="text"
              name="reg_no"
              className="form-control"
              value={values?.reg_no}
              required
              onChange={handleChange}
              placeholder="eg KBA111C"
              // disabled={props.isEdit}
            />
          </div>
          <div className="col-6">
            <label htmlFor="carName">Odometer Reading</label>
            <input
              type="number"
              name="odometer_reading"
              className="form-control"
              value={values?.odometer_reading}
              required
              onChange={handleChange}
              placeholder="eg 80000"
              min={0}
              onFocus={handleFocus}
              // disabled={props.isEdit}
            />
          </div>
        </div>

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
    </>
  );
};
