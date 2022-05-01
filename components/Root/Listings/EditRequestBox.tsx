import React, { Dispatch, FC, SetStateAction, MouseEvent } from "react";
import {
  Car,
  // useEditCarBeingEditedMutation
} from "../../../graphql_types/generated/graphql";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface EditRequestBoxProps {
  data: Car;
  cars: Car[];
  setCars: Dispatch<SetStateAction<Car[]>>;
}

export const EditRequestBox: FC<EditRequestBoxProps> = (props) => {
  // const [editBeingEdited, { loading }] = useEditCarBeingEditedMutation();

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // const response = await editBeingEdited({
      //   variables: { carId: props.data.id! },
      // });
      // if (response.data?.editCarBeingEdited) {
      //   let tempCars = props.cars.filter((car) => car.id !== props.data.id);
      //   props.setCars([...tempCars]);
      // }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <div className="shadow p-3 mb- d-flex align-items-center justify-content-between">
      <h6>{props.data.name}</h6>
      <button
        className="btn bgOrange"
        onClick={handleClick}
        // disabled={loading}
      >
        {/* {loading ? (
          <ButtonLoading
            spinnerColor="white"
            dimensions={{ height: "18px", width: "18px" }}
          />
        ) : (
          "Grant"
        )} */}
      </button>
    </div>
  );
};
