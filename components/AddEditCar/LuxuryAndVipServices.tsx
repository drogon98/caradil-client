import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { carVipAndLuxuryServices } from "../../data";
import { useEditCarLuxuryAndVipServicesMutation } from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface LuxuryAndVipProps {
  value: string[];
  setData: Dispatch<SetStateAction<string[] | undefined>>;
  carId: number | undefined;
}

/**
 * @author @CodeYourEmpire
 * @function @Location
 **/

export const LuxuryAndVip: FC<LuxuryAndVipProps> = (props) => {
  const [editLuxuryAndVipServices, { loading }] =
    useEditCarLuxuryAndVipServicesMutation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isAdded = props.value?.find((val) => val === e.target.value);
    if (isAdded) {
      let tempValues = props.value?.filter((val) => val !== e.target.value);
      props.setData([...tempValues]);
    } else {
      props.setData([...(props.value ?? []), e.target.value]);
    }
    console.log("e.target.value :>> ", e.target.value);
    //   props.setData(e.target.value);
  };
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    try {
      response = await editLuxuryAndVipServices({
        variables: { carId: props.carId!, input: { services: props.value } },
      });
    } catch (error) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("errorMessage :>> ", errorMessage);
      return;
      // setError("Network Error!");
    }

    if (response?.data?.editCarLuxuryAndVipServices.error) {
    } else if (response.data?.editCarLuxuryAndVipServices.carId) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }

    // console.log("response :>> ", response);
  };
  console.log("props.value :>> ", props.value);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {carVipAndLuxuryServices.map((service, idx) => {
          const isSelected = props.value?.find((ser) => ser === service);
          return (
            <div className="form-check" key={idx}>
              <input
                className="form-check-input"
                type="checkbox"
                value={service}
                checked={isSelected ? true : false}
                id="flexCheckDefault"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {service}
              </label>
            </div>
          );
        })}
        <FormSaveButton
          loading={loading}
          saved={saved}
          isEdit={false}
          carId={props.carId!}
        />
      </form>
    </div>
  );
};
