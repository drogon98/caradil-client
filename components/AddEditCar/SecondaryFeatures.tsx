import { Icon } from "@iconify/react";
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
import {
  Car,
  CarSecondaryFeaturesInput,
  useEditCarSecondaryFeaturesMutation,
} from "../../graphql_types/generated/graphql";
import { FeatureIconMap } from "../PublicCar/CarDetailsSecondaryFeatures";
import { FormSaveButton } from "./FormSaveButton";

const AllOptionFeatures = [
  "Bluetooth",
  "USB Charger",
  "USB Input",
  "Wifi",
  "Baby Chair",
];

interface SecondaryFeaturesProps {
  value: CarSecondaryFeaturesInput;
  setData: Dispatch<SetStateAction<CarSecondaryFeaturesInput>>;
  carId: number | undefined;
  setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
}

/**
 * @author @CodeYourEmpire
 * @function @SecondaryFeatures
 **/

export const SecondaryFeatures: FC<SecondaryFeaturesProps> = (props) => {
  const [value, setValue] = useState<string>();
  const [features, setFeatures] = useState<CarSecondaryFeaturesInput>({
    features: [],
  });
  const [optionFeatures, setOptionFeatures] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFeatures({ features: [...props.value.features] });
  }, [props.value.features]);

  const [editCarFeatures, { loading }] = useEditCarSecondaryFeaturesMutation();

  useEffect(() => {
    const tempOptionFeatures = AllOptionFeatures.filter((ft) => {
      const selected = features.features.find((ft2) => ft2.title === ft);
      return selected ? false : true;
    });
    setOptionFeatures([...tempOptionFeatures]);
  }, [features]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // console.log("e.target :>> ", e.target.id);
    setValue(e.target.value);
    setFeatures({
      features: [...features?.features, { title: e.target.value! }],
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    try {
      response = await editCarFeatures({
        variables: { carId: props.carId!, input: features! },
      });

      if (response.data?.editCarSecondaryFeatures.error) {
      } else if (response.data?.editCarSecondaryFeatures.carId) {
        props.setResponseCar(response.data.editCarSecondaryFeatures.car!);
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 3000);
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

  const handleRemoveFeature = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    let tempFeatures = features.features.filter((_, idx) => idx !== id);
    setFeatures({ features: [...tempFeatures] });
  };

  // console.log("optionFeatures :>> ", optionFeatures);

  // console.log("props.data :>> ", props.value);

  // console.log("features :>> ", features);
  return (
    <>
      <form className="form-group" onSubmit={handleSubmit}>
        {/* <p>
          Sites usually show images to provide illustration, like photos for
          online stores or news articles Sites usually show images to provide
          illustration, like photos for online stores or news articles Sites
          usually show images to provide illustration, like photos for online
          stores or news articles
        </p> */}
        <div>
          <label>Secondary Features</label>
          {/* <input type="text" name="feature" className="ml-2 " /> */}

          <select
            className="form-select form-control"
            aria-label="Default select example"
            onChange={handleChange}
            value={value}
          >
            <option value={""}>Select Feature</option>
            {optionFeatures.map((optF, idx) => (
              <option key={idx} value={optF}>
                {optF}
              </option>
            ))}

            {/* <option value="Wifi">Wifi</option>
            <option value="Baby Chair">Baby Chair</option>
            <option value="USB Charger">USB Charger</option>
            <option value="USB Input">USB Input</option> */}
          </select>
        </div>
        <div className="secondary-features-wrapper mt-3">
          {features?.features.map((feature, idx) => (
            <div
              key={idx}
              className="w-100 d-flex justify-content-between align-items-center secondary-feature-box"
            >
              <div className="d-flex align-items-center">
                <span className="carFeatureIcon">
                  {" "}
                  {FeatureIconMap.get(feature.title!)}
                </span>
                <h6 className="m-0">{feature.title}</h6>
              </div>

              <button
                className="btn m-0 p-0"
                style={{ border: "none" }}
                onClick={(e) => handleRemoveFeature(e, idx)}
              >
                <Icon
                  icon="gridicons:cross-small"
                  style={{ fontSize: "20px" }}
                />
              </button>
            </div>
          ))}
        </div>
        <FormSaveButton
          saved={saved}
          loading={loading}
          isEdit={false}
          carId={props.carId!}
        />
      </form>
    </>
  );
};
