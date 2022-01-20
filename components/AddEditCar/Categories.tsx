import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { carCategories, carVipAndLuxuryServices } from "../../data";
import {
  Car,
  CarCategoriesInput,
  useEditCarCategoriesMutation,
} from "../../graphql_types/generated/graphql";
import { FormNextPrevButton } from "./FormNextPrevButton";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface CategoryProps {
  value: CarCategoriesInput;
  // setData: Dispatch<SetStateAction<string[] | undefined>>;
  carId: number | undefined;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;

  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  isManage?: boolean;
}

export const Categories: FC<CategoryProps> = (props) => {
  const [editCategories, { loading }] = useEditCarCategoriesMutation();
  const [values, setValues] = useState<CarCategoriesInput>();
  const [hasVipAndLuxury, setHasVipAndLuxury] = useState(false);

  useEffect(() => {
    if (props.value) {
      setValues({ ...props.value! });
    }
  }, [props.value]);

  useEffect(() => {
    const hasVip = values?.categories.some(
      (cat) => cat === "Luxury & Vip".toLocaleLowerCase()
    );
    if (hasVip) {
      setHasVipAndLuxury(true);
    } else {
      setHasVipAndLuxury(false);
    }
  }, [values?.categories]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isAdded = values?.categories?.find((val) => val === e.target.value);
    if (isAdded) {
      let tempValues = values?.categories?.filter(
        (val) => val !== e.target.value
      );
      setValues({ ...values!, categories: [...tempValues!] });
    } else {
      setValues({
        ...values!,
        categories: [...(values?.categories ?? []), e.target.value],
      });
    }
    // console.log("e.target.value :>> ", e.target.value);
    //   props.setData(e.target.value);
  };

  const handleLuxuryVipChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isAdded = values?.luxury_and_vip_services?.find(
      (val) => val === e.target.value
    );
    if (isAdded) {
      let tempValues = values?.luxury_and_vip_services?.filter(
        (val) => val !== e.target.value
      );
      setValues({ ...values!, luxury_and_vip_services: [...tempValues!] });
    } else {
      setValues({
        ...values!,
        luxury_and_vip_services: [
          ...(values?.luxury_and_vip_services ?? []),
          e.target.value,
        ],
      });
    }
    // console.log("e.target.value :>> ", e.target.value);
    //   props.setData(e.target.value);
  };
  // const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // let response;
    try {
      let response = await editCategories({
        variables: { carId: props.carId!, input: { ...values! } },
      });
      if (response?.data?.editCarCategories.error) {
      } else if (response.data?.editCarCategories.carId) {
        props.setCompData(response.data.editCarCategories.car!);
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
  // console.log("props.value :>> ", props.value);
  return (
    <div>
      <h3>Categories</h3>
      <p className="mb-3">
        Select categories within which your car belong. Your car can belong to
        many categories. eg A subaru forester can belong to sports and 4wd
        category.
      </p>
      <form onSubmit={handleSubmit}>
        {carCategories.map((category, idx) => {
          const isSelected = values?.categories?.find(
            (cat) => cat === category.toLowerCase()
          );
          return (
            <div className="form-check" key={idx}>
              <input
                className="form-check-input"
                type="checkbox"
                value={category.toLowerCase()}
                checked={isSelected ? true : false}
                id="flexCheckDefault"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {category}
              </label>
            </div>
          );
        })}
        {hasVipAndLuxury && (
          <>
            <p className="mt-5">
              You selected vip and luxury. Which other luxury services do you
              offer?
            </p>
            {carVipAndLuxuryServices.map((service, idx) => {
              const isSelected = values?.categories?.find(
                (ser) => ser === service
              );
              return (
                <div className="form-check" key={idx}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={service}
                    checked={isSelected ? true : false}
                    id="flexCheckDefault"
                    onChange={handleLuxuryVipChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {service}
                  </label>
                </div>
              );
            })}
          </>
        )}

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
    </div>
  );
};
