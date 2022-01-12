import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { carCategories } from "../../data";
import { useEditCarCategoriesMutation } from "../../graphql_types/generated/graphql";
import { FormSaveButton } from "./FormSaveButton";

interface CategoryProps {
  value: string[];
  setData: Dispatch<SetStateAction<string[] | undefined>>;
  carId: number | undefined;
}

/**
 * @author @CodeYourEmpire
 * @function @Location
 **/

export const Categories: FC<CategoryProps> = (props) => {
  const [editCategories, { loading }] = useEditCarCategoriesMutation();
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
      response = await editCategories({
        variables: { carId: props.carId!, input: { categories: props.value } },
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

    if (response?.data?.editCarCategories.error) {
    } else if (response.data?.editCarCategories.carId) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }

    // console.log("response :>> ", response);
  };
  // console.log("props.value :>> ", props.value);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {carCategories.map((category, idx) => {
          const isSelected = props.value?.find(
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
