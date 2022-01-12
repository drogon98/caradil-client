import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { AiFillFileImage, AiFillFileText } from "react-icons/ai";
import {
  CarDocumentsInput,
  DocumentInput,
  PhotoInput,
  useDeleteFileMutation,
  useEditCarDocumentsMutation,
  useUploadFileMutation,
} from "../../graphql_types/generated/graphql";
import { ButtonLoading } from "../Loading/ButtonLoading";
import { FormSaveButton } from "./FormSaveButton";

interface DocumentsProps {
  value: CarDocumentsInput;
  setData: Dispatch<SetStateAction<CarDocumentsInput>>;
  carId: number | undefined;
  carVerified: boolean;
  isEdit: boolean;
}

/**
 * @author @CodeYourEmpire
 * @function @Documents
 **/

export const Documents: FC<DocumentsProps> = (props) => {
  const [uploadFile, { loading: uploading }] = useUploadFileMutation();
  const [editDocuments, { loading }] = useEditCarDocumentsMutation();
  const [deleteFile] = useDeleteFileMutation();
  const [toDelete, setToDelete] = useState<DocumentInput>();
  const [saved, setSaved] = useState(false);
  const [id, setId] = useState<string>();

  // console.log("props.carVerified :>> ", props.carVerified);

  const processFileName = (url: string) => {
    if (url) {
      const urlSections = url.split("/");
      return `https://res...${urlSections[urlSections.length - 1]}`;
    } else {
      return "";
    }
  };

  const checkFileType = (url: string) => {
    if (url) {
      const urlSections = url.split("/");
      const lastSection = urlSections[urlSections.length - 1];
      const extension = lastSection.split(".")[1];

      if (extension === "pdf") {
        return "pdf";
      } else if (
        extension === "png" ||
        extension === "jpg" ||
        extension === "jpeg"
      ) {
        return "image";
      }
    } else {
      return "";
    }
  };

  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    try {
      const file = e.target.files?.[0];
      setId(title);
      const response = await uploadFile({ variables: { file } });
      const newDocumentFile = response.data?.singleUpload;
      delete newDocumentFile?.__typename;
      const newDocument: DocumentInput = {
        title,
        file: newDocumentFile as PhotoInput,
      };
      const tempDocuments = [...props.value.documents];

      if (title === "national_id") {
        if (!tempDocuments[0]) {
          tempDocuments[0] = newDocument;
        } else {
          setToDelete(tempDocuments[0]);
          tempDocuments[0] = newDocument;
          // Delete here
        }
      } else if (title === "logbook") {
        if (!tempDocuments[1]) {
          tempDocuments[1] = newDocument;
        } else {
          setToDelete(tempDocuments[1]);
          tempDocuments[1] = newDocument;
          // Delete here
          // deleteFile({ variables: { id: toDelete.file.public_id } });
        }
      } else if (title === "purchase_receipt") {
        if (!tempDocuments[2]) {
          tempDocuments[2] = newDocument;
        } else {
          setToDelete(tempDocuments[2]);
          tempDocuments[2] = newDocument;
          // Delete here
          // deleteFile({ variables: { id: toDelete.file.public_id } });
        }
      }
      props.setData({ documents: tempDocuments });

      e.target.value = "";
    } catch (error) {
      e.target.value = "";
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("errorMessage :>> ", errorMessage);
      return;
      // setError("Network Error!");
    }
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    try {
      response = await editDocuments({
        variables: {
          carId: props.carId!,
          input: { documents: props.value.documents },
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

    if (!response?.data?.editCarDocuments.error && toDelete) {
      deleteFile({ variables: { id: toDelete?.file.public_id! } });
    } else if (response.data?.editCarDocuments.carId) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  };

  // console.log("props.value :>> ", props.value);

  return (
    <>
      <p className="mb-3">
        Sites usually show images to provide illustration, like photos for
        online stores or news articles Sites usually show images to provide
        illustration, like photos for online stores or news articles Sites
        usually show images to provide illustration, like photos for online
        stores or news articles
      </p>

      <form
        onSubmit={(e) => {
          handleSave(e);
        }}
      >
        <label>Car Owner National Id</label>
        <div>
          {props.carVerified ? (
            <div>
              <span>
                {checkFileType(props.value.documents[0]?.file?.secure_url) ===
                "image" ? (
                  <AiFillFileImage />
                ) : (
                  <AiFillFileText />
                )}{" "}
                <small>
                  {processFileName(props.value.documents[0]?.file?.secure_url)}
                </small>
              </span>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleUpload(e, "national_id")}
                // disabled={saving}
              />
              <span>
                {uploading && id === "national_id" && (
                  <ButtonLoading
                    spinnerColor="orange"
                    dimensions={{ height: "18px", width: "18px" }}
                  />
                )}
              </span>
            </div>
          )}
        </div>
        <br />
        <label>Car Logbook</label>
        <div>
          {props.carVerified ? (
            <div>
              <span>
                {checkFileType(props.value.documents[1]?.file?.secure_url) ===
                "image" ? (
                  <AiFillFileImage />
                ) : (
                  <AiFillFileText />
                )}
                <small>
                  {processFileName(props.value.documents[1]?.file?.secure_url)}
                </small>
              </span>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleUpload(e, "logbook")}
                // disabled={saving}
              />
              <span>
                {uploading && id === "logbook" && (
                  <ButtonLoading
                    spinnerColor="orange"
                    dimensions={{ height: "18px", width: "18px" }}
                  />
                )}
              </span>
            </div>
          )}
        </div>
        <br />
        <label>Car Purchase Receipt (Optional)</label>
        <div>
          {/* is edit and no receipt */}
          {/* is not edit */}
          {!props.isEdit ? (
            <div className="d-flex align-items-center">
              {" "}
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleUpload(e, "purchase_receipt")}
                // disabled={saving}
              />
              <span>
                {uploading && id === "purchase_receipt" && (
                  <ButtonLoading
                    spinnerColor="orange"
                    dimensions={{ height: "18px", width: "18px" }}
                  />
                )}
              </span>
            </div>
          ) : (
            <>
              {props.value.documents[2] ? (
                <>
                  {props.carVerified ? (
                    <div>
                      <span>
                        {checkFileType(
                          props.value.documents[2]?.file?.secure_url
                        ) === "image" ? (
                          <AiFillFileImage />
                        ) : (
                          <AiFillFileText />
                        )}
                        <small>
                          {processFileName(
                            props.value.documents[2]?.file?.secure_url
                          )}
                        </small>
                      </span>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleUpload(e, "purchase_receipt")}
                      // disabled={saving}
                    />
                  )}
                </>
              ) : (
                <p>Not provided</p>
              )}
            </>
          )}
        </div>

        <FormSaveButton
          loading={loading}
          saved={saved}
          isEdit={props.isEdit}
          carId={props.carId!}
        />
      </form>
    </>
  );
};
