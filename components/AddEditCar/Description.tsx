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
  setData: Dispatch<SetStateAction<CarDescriptionInput>>;
  carId: number | undefined;
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
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(props.value.description ?? "");
  }, [props.value]);

  const handleSaveDescription = async (
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    let response;

    try {
      response = await editCarDescription({
        variables: {
          carId: props.carId!,
          input: { description: value },
        },
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

    if (response?.data?.editCarDescription.error) {
    } else if (response?.data?.editCarDescription.carId) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }

    console.log("response :>> ", response);
  };

  const handleDescriptionChange = (value: any) => {
    setValue(value);
    // props.setData({ description: value });
    // props.setData((prevState) => (prevState += value));
  };

  return (
    <>
      <p>
        Sites usually show images to provide illustration, like photos for
        online stores or news articles Sites usually show images to provide
        illustration, like photos for online stores or news articles Sites
        usually show images to provide illustration, like photos for online
        stores or news articles
      </p>
      <ReactQuill
        value={value}
        // name="description"
        onChange={handleDescriptionChange}
        modules={modules}
        formats={formats}
        placeholder="Type description here"
      />
      <div className="d-flex justify-content-end align-items-center mt-3">
        {saved && (
          <span style={{ width: "calc(100px - 2em)", marginRight: "1em" }}>
            <div>
              <Icon
                icon="teenyicons:tick-circle-solid"
                style={{ color: "green" }}
              />
              <span className="ml-2">Saved</span>
            </div>
          </span>
        )}
        <div className="d-flex justify-content-end">
          <button
            className="btn bgOrange p-0 m-0"
            disabled={loading || !props.carId}
            style={{ height: "35px", minWidth: "60px" }}
            onClick={handleSaveDescription}
          >
            {loading ? (
              <ButtonLoading
                spinnerColor="white"
                dimensions={{ height: "18px", width: "18px" }}
              />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </>
  );
};
