import dynamic from "next/dynamic";
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
import { ButtonLoading } from "../Loading/ButtonLoading";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface DescriptionProps {
  value: CarDescriptionInput;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;

  carId: number | undefined;
  isManage?: boolean;
  // verificationInProgress?: boolean;
}

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
    // ["link", "image", "video"],
    // ["clean"],
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
  // "image",
  // "video",
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
    props.setActiveSlide && props.setActiveSlide(props.activeSlide! + 1);

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
        props.setActiveSlide!(props.activeSlide! + 1);
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

  // console.log("value :>> ", value);

  return (
    <div className="mb-3">
      <h3>Description</h3>
      <p className="mb-2">
        Describe your car below. This is a chance to make a great impression to
        guests who will rent it. Here are tips to help you have a catchy
        description.
      </p>
      <ul>
        <li>
          <small>Explain why your car is the best.</small>
        </li>
        <li>
          <small>
            State what your guest should expect on getting this car.
          </small>
        </li>
        <li>
          <small>
            State whether you are available for help to the quest in case eny
            help is needed.
          </small>
        </li>
        <li>
          <small>
            List your requirements on how this car should be handled eg. No
            smoking,no pets,cleanliness measures,fueling requirements etc.
          </small>
        </li>

        {/* <li><small></small></li> */}
      </ul>
      <div className="mb-2">
        <small>
          <b>
            {" "}
            Use the editor below to add the description. Make it spacious and
            readable by using bullets and block headings.
          </b>{" "}
        </small>
      </div>
      <div id="car-description-editor">
        <ReactQuill
          value={value}
          // name="description"
          onChange={handleDescriptionChange}
          modules={modules}
          formats={formats}
          placeholder="Type description here"
          bounds={"#car-description-editor"}
          // theme="snow"
        />
      </div>

      {props.isManage ? (
        <div className="d-grid gap-2 mt-4">
          <button
            type="submit"
            className="btn bgOrange"
            disabled={loading || !value}
            onClick={handleSaveDescription}
          >
            {loading ? (
              <ButtonLoading
                spinnerColor="white"
                dimensions={{ height: "24px", width: "24px" }}
              />
            ) : (
              "Update"
            )}
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-between mt-4">
          <div>
            {props.activeSlide !== 0 && (
              <button
                className="btn bgOrange"
                onClick={() => props.setActiveSlide!(props.activeSlide! - 1)}
              >
                Prev
              </button>
            )}
          </div>

          <button
            className="btn bgOrange"
            type="submit"
            disabled={loading || !value}
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
      )}
    </div>
  );
};
