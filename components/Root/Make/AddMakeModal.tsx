import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  MakeInput,
  useAddCarMakeMutation,
  useUploadFileMutation,
} from "../../../graphql_types/generated/graphql";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface Props {
  showModal: boolean;
  handleClose: () => void;
}

export default function AddMakeModal(props: Props): ReactElement {
  const [values, setValues] = useState<MakeInput>({
    title: "",
    photo: { public_id: "", secure_url: "", url: "" },
  });
  const [uploadFile, { loading: uploading }] = useUploadFileMutation();
  const [addMake, { loading: submittingMake }] = useAddCarMakeMutation();

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    try {
      const response = await uploadFile({ variables: { file } });
      const newPhoto = response.data?.singleUpload.file;
      delete newPhoto?.__typename;
      setValues({ ...values, photo: newPhoto! });
    } catch (error) {
      console.log("error :>> ", error);
    }

    // e.target.value = "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, title: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addMake({ variables: { input: values } });
      if (response.data?.addMake.success) {
        props.handleClose();
      }
      console.log("response :>> ", response);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Modal show={props.showModal} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Make</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="d-flex align-items-center">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              required
              onChange={handleUpload}
              disabled={uploading}
            />
            <span>
              {uploading && (
                <ButtonLoading
                  spinnerColor="orange"
                  dimensions={{ height: "18px", width: "18px" }}
                />
              )}
            </span>
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              onChange={handleChange}
              value={values.title}
              id="title"
              type="text"
              name="title"
              className="form-control"
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn bgOrange">
              {submittingMake ? (
                <ButtonLoading
                  spinnerColor="white"
                  dimensions={{ height: "24px", width: "24px" }}
                />
              ) : (
                "Add Make"
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
