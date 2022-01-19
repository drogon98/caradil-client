import React, {
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Car,
  CarDescriptionInput,
  useEditCarDescriptionMutation,
} from "../../graphql_types/generated/graphql";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import { ButtonLoading } from "../Loading/ButtonLoading";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface DescriptionProps {
  value: CarDescriptionInput;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  activeSlide: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  // setData: Dispatch<SetStateAction<CarDescriptionInput>>;
  carId: number | undefined;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
}

/**
 * @author @CodeYourEmpire
 * @function @Description
 **/

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export const Description: FC<DescriptionProps> = (props) => {
  const [editCarDescription, { loading }] = useEditCarDescriptionMutation();
  const [value, setValue] = useState("");
  // const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(props.value.description);
  }, [props.value]);

  const handleSaveDescription = async (
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    props.setActiveSlide(props.activeSlide + 1);

    try {
      let response = await editCarDescription({
        variables: {
          carId: props.carId!,
          input: { description: value },
        },
      });
      if (response?.data?.editCarDescription.error) {
      } else if (response?.data?.editCarDescription.carId) {
        props.setCompData(response.data.editCarDescription.car!);
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
  };

  const handleDescriptionChange = (value: any) => {
    setValue(value);
  };

  return (
    <>
      <h3>Description</h3>
      <p className="mb-2">
        Describe your car in <b>100+</b> words. This is a chance to make a great
        impression to clients who will rent it. Ensure you space your content to
        make it readable to the guests.
      </p>
      <ReactQuill
        value={value}
        // name="description"
        onChange={handleDescriptionChange}
        modules={modules}
        formats={formats}
        placeholder="Type description here"
      />

      <div className="d-flex justify-content-between mt-4">
        <div>
          {props.activeSlide !== 0 && (
            <button
              className="btn bgOrange"
              onClick={() => props.setActiveSlide(props.activeSlide - 1)}
            >
              Prev
            </button>
          )}
        </div>

        <button
          className="btn bgOrange"
          type="submit"
          disabled={loading}
          onClick={handleSaveDescription}
        >
          {loading ? (
            <ButtonLoading
              spinnerColor="white"
              dimensions={{ height: "18px", width: "18px" }}
            />
          ) : (
            "Next"
          )}
        </button>
      </div>
    </>
  );
};
