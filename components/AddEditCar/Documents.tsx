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
  CarDocumentsInput,
  DocumentInput,
  FileInput,
  useDeleteFileMutation,
  useEditCarDocumentsMutation,
  useUploadFileMutation,
} from "../../graphql_types/generated/graphql";
import { ButtonLoading } from "../Loading/ButtonLoading";
import DocumentContent from "./DocumentContent";
import { FormNextPrevButton } from "./FormNextPrevButton";

interface DocumentsProps {
  value: CarDocumentsInput;
  // setData: Dispatch<SetStateAction<CarDocumentsInput>>;
  carId: number | undefined;
  carVerified?: boolean;
  isEdit?: boolean;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  activeSlide?: number;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
}

/**
 * @author @CodeYourEmpire
 * @function @Documents
 **/

export const Documents: FC<DocumentsProps> = (props) => {
  const [uploadFile, { loading: uploading }] = useUploadFileMutation();
  const [editDocuments, { loading }] = useEditCarDocumentsMutation();
  const [deleteFile] = useDeleteFileMutation();
  // const [toDelete, setToDelete] = useState<DocumentInput>();
  const [secondaryLoading, setSecondaryLoading] = useState(false);

  // const [saved, setSaved] = useState(false);
  const [id, setId] = useState<string>();
  const [documents, setDocuments] = useState<CarDocumentsInput>({
    documents: [],
  });

  useEffect(() => {
    if (props.value) {
      console.log("  props.value :>> ", props.value);
      setDocuments({ ...props.value });
    }
  }, [props.value]);

  // console.log("props.carVerified :>> ", props.carVerified);

  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    try {
      const file = e.target.files?.[0];
      setId(title);
      const response = await uploadFile({
        variables: { file },
        fetchPolicy: "no-cache",
      });
      if (response.data?.singleUpload.error) {
        console.log("error :>> ", response.data?.singleUpload.error);
      } else {
        const newDocumentFile = response.data?.singleUpload.file;
        delete newDocumentFile?.__typename;
        const newDocument: DocumentInput = {
          title,
          file: newDocumentFile as FileInput,
        };
        const tempDocuments = [...documents.documents];

        let tempToDelete: DocumentInput = {
          title: "",
          file: { public_id: "", url: "", secure_url: "" },
        };

        if (title === "national_id") {
          if (!tempDocuments[0]) {
            tempDocuments[0] = newDocument;
          } else {
            // setToDelete(tempDocuments[0]);
            tempToDelete = tempDocuments[0];
            tempDocuments[0] = newDocument;
            // Delete here
          }
        } else if (title === "logbook") {
          if (!tempDocuments[1]) {
            tempDocuments[1] = newDocument;
          } else {
            // setToDelete(tempDocuments[1]);
            tempToDelete = tempDocuments[1];
            tempDocuments[1] = newDocument;
            // Delete here
            // deleteFile({ variables: { id: toDelete.file.public_id } });
          }
        }
        // else if (title === "purchase_receipt") {
        //   if (!tempDocuments[2]) {
        //     tempDocuments[2] = newDocument;
        //   } else {
        //     // setToDelete(tempDocuments[2]);
        //     tempToDelete = tempDocuments[2];
        //     tempDocuments[2] = newDocument;
        //     // Delete here
        //     // deleteFile({ variables: { id: toDelete.file.public_id } });
        //   }
        // }
        setDocuments({ documents: tempDocuments });
        setSecondaryLoading(true);
        const response2 = await editDocuments({
          variables: {
            carId: props.carId!,
            input: { documents: tempDocuments },
          },
          fetchPolicy: "no-cache",
        });
        setSecondaryLoading(false);

        if (
          !response2?.data?.editCarDocuments.error &&
          tempToDelete.file.public_id
        ) {
          deleteFile({
            variables: { id: tempToDelete?.file.public_id! },
            fetchPolicy: "no-cache",
          });
        }
      }

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
    try {
      let response = await editDocuments({
        variables: {
          carId: props.carId!,
          input: { documents: documents.documents },
        },
      });
      if (response?.data?.editCarDocuments.error) {
        console.log("error :>> ", response?.data?.editCarDocuments.error);
        // deleteFile({ variables: { id: toDelete?.file.public_id! } });
      } else if (response.data?.editCarDocuments.carId) {
        props.setCompData(response.data.editCarDocuments.car!);
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

    // if (!response?.data?.editCarDocuments.error && toDelete) {
  };

  const getFile = (title: string) => {
    if (title === "national_id") {
      return documents.documents[0];
    } else if (title === "logbook") {
      return documents.documents[1];
    }
    // else if (title === "purchase_receipt") {
    //   return documents.documents[2];
    // }
  };

  const handleDeleteDoc = async (
    e: SyntheticEvent<HTMLButtonElement>,
    title: string
  ) => {
    e.preventDefault();

    try {
      const response = await deleteFile({
        variables: { id: getFile(title)!.file.public_id! },
        fetchPolicy: "no-cache",
      });
      if (response.data?.deleteUpload) {
        let tempDocuments = documents.documents.map((doc) => {
          if (doc.title === title) {
            return {
              title: "",
              file: { public_id: "", url: "", secure_url: "" },
            };
          }
          return doc;
        });
        setDocuments({ documents: [...tempDocuments] });
        setSecondaryLoading(true);
        await editDocuments({
          variables: {
            carId: props.carId!,
            input: { documents: tempDocuments },
          },
          fetchPolicy: "no-cache",
        });
        setSecondaryLoading(false);
      }
    } catch (error) {}
  };

  // console.log("props.value :>> ", props.value);

  return (
    <>
      <h3>Documents</h3>
      <p className="mb-3">
        These documents will help us verify this car is yours. Ensure they are
        clear and original copies. Otherwise, your car will be rejected.
      </p>

      <form
        onSubmit={(e) => {
          handleSave(e);
        }}
      >
        <label>Car Owner National Id</label>
        <div>
          {props.carVerified ? (
            <DocumentContent
              isVerified={props.carVerified}
              deleteHandler={handleDeleteDoc}
              docUrl={documents.documents[0]?.file?.secure_url}
              title="national_id"
            />
          ) : (
            <div className="d-flex align-items-start flex-column">
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
              <DocumentContent
                isVerified={props.carVerified!}
                deleteHandler={handleDeleteDoc}
                docUrl={documents.documents[0]?.file?.secure_url}
                title="national_id"
              />
            </div>
          )}
        </div>
        <br />
        <label>Car Logbook</label>
        <div>
          {props.carVerified ? (
            <DocumentContent
              isVerified={props.carVerified}
              deleteHandler={handleDeleteDoc}
              docUrl={documents.documents[1]?.file?.secure_url}
              title="logbook"
            />
          ) : (
            <div className="d-flex align-items-start flex-column">
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
              <DocumentContent
                isVerified={props.carVerified!}
                deleteHandler={handleDeleteDoc}
                docUrl={documents.documents[1]?.file?.secure_url}
                title="logbook"
              />
            </div>
          )}
        </div>

        {/* <br />
        <label>Car Purchase Receipt (Optional)</label>
        <div>
          {!props.isEdit ? (
            <div className="d-flex align-items-start flex-column">
              {" "}
              <div className="d-flex align-items-center">
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
              <DocumentContent
                isVerified={props.carVerified}
                deleteHandler={handleDeleteDoc}
                docUrl={documents.documents[2]?.file?.secure_url}
                title="purchase_receipt"
              />
            </div>
          ) : (
            <>
              {documents.documents[2] ? (
                <>
                  {props.carVerified ? (
                    <DocumentContent
                      isVerified={props.carVerified}
                      deleteHandler={handleDeleteDoc}
                      docUrl={documents.documents[2]?.file?.secure_url}
                      title="purchase_receipt"
                    />
                  ) : (
                    <div className="d-flex align-items-start flex-column">
                      <div className="d-flex align-items-center">
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
                      <DocumentContent
                        isVerified={props.carVerified}
                        deleteHandler={handleDeleteDoc}
                        docUrl={documents.documents[2]?.file?.secure_url}
                        title="purchase_receipt"
                      />
                    </div>
                  )}
                </>
              ) : (
                <p>Not provided</p>
              )}
            </>
          )}
        </div> */}

        <FormNextPrevButton
          loading={loading}
          disabled={loading}
          setActiveSlide={props.setActiveSlide!}
          activeSlide={props.activeSlide!}
        />
      </form>
    </>
  );
};
