import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { carColors, features } from "../../data";
import {
  Car,
  CarFeaturesInput,
  useEditCarFeaturesMutation,
} from "../../graphql_types/generated/graphql";

interface FeaturesProps {
  value: CarFeaturesInput;
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  carId: number | undefined;
}

export const Features: FC<FeaturesProps> = (props) => {
  const [editFeatures, { loading, error }] = useEditCarFeaturesMutation();

  const [values, setValues] = useState<CarFeaturesInput>();

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
        // props.setCompData(response.data.editCarFeatures.car!);
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

    // console.log("response :>> ", response);
  };

  return (
    <div>
      {" "}
      <h3>Features</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label htmlFor="gas">Gas</label>
            <select
              className="form-select form-control"
              aria-label="Default select example"
              onChange={handleChange}
              value={values?.gas}
              name="gas"
              required
            >
              <option value={""}>Select Gas</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="carName">Transmission</label>
            <select
              className="form-select form-control"
              aria-label="Default select example"
              onChange={handleChange}
              value={values?.transmission}
              name="transmission"
              required
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
              className="form-select form-control"
              aria-label="Default select example"
              onChange={handleChange}
              value={values?.color}
              name="color"
              required
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
              className="form-control"
              value={values?.seats}
              required
              onChange={handleChange}
              min={0}
              // placeholder="eg KBA765K"
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6">
            <label htmlFor="carName">Doors</label>
            <input
              type="number"
              name="doors"
              className="form-control"
              value={values?.doors}
              required
              onChange={handleChange}
              min={0}
              // placeholder="eg KBA765K"
            />
          </div>
        </div>

        {features.map((feature, idx) => {
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

        <div className="d-flex justify-content-between mt-4">
          <button onClick={() => props.setActiveSlide(props.activeSlide - 1)}>
            Prev
          </button>
          <button type="submit">Next</button>
        </div>

        {/* <FormSaveButton
          saved={saved}
          loading={loading}
          isEdit={props.isEdit}
          carId={props.carId!}
        /> */}
      </form>
    </div>
  );
};
