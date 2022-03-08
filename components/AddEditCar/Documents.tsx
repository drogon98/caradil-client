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
import { ToastWrapper } from "../Toast/ToastWrapper";
import DocumentContent from "./DocumentContent";
import { FormNextPrevButton } from "./FormNextPrevButton";
import RequestEditModal from "./ManageCar/RequestEditModal";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface DocumentsProps {
  value: CarDocumentsInput;
  carId: number | undefined;
  carVerified?: boolean;
  isEdit?: boolean;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  activeSlide?: number;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  isManage?: boolean;
  booked?: boolean;
  hasEditRequest?: boolean;
  // verificationInProgress?: boolean;
}

export const Documents: FC<DocumentsProps> = (props) => {
  const [uploadFile, { loading: uploading }] = useUploadFileMutation();
  const [editDocuments, { loading }] = useEditCarDocumentsMutation();
  const [deleteFile, { loading: deleteLoading }] = useDeleteFileMutation();
  // const [toDelete, setToDelete] = useState<DocumentInput>();
  const [secondaryLoading, setSecondaryLoading] = useState(false);
  const [showRequestEditModal, setShowRequestEditModal] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  // const [saved, setSaved] = useState(false);
  const [id, setId] = useState<string>();
  const [documents, setDocuments] = useState<CarDocumentsInput>({
    documents: [],
  });

  useEffect(() => {
    if (props.value) {
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
        if (props.isManage) {
          setShowSaveToast(true);
        } else {
          props.setActiveSlide && props.setActiveSlide(props.activeSlide! + 1);
        }
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
      setId(title);
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

  const handleRequestEditClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (props.hasEditRequest) {
      return;
    }
    setShowRequestEditModal(true);
  };

  // console.log("props.value :>> ", props.value);

  return (
    <>
      {showRequestEditModal && (
        <RequestEditModal
          booked={props.booked!}
          showModal={showRequestEditModal}
          handleClose={() => setShowRequestEditModal(false)}
          carId={props.carId!}
          setCarData={props.setCompData}
        />
      )}
      {showSaveToast && (
        <ToastWrapper
          setShow={setShowSaveToast}
          show={showSaveToast}
          message={"Updated successfully!"}
          position="bottom-end"
          bg="success"
        />
      )}
      <h3>Documents</h3>
      <p className="mb-3">
        These documents are important to make it possible to verify this car.
      </p>

      <form
        onSubmit={(e) => {
          handleSave(e);
        }}
        className="mb-3"
      >
        <label>Car Owner National Id</label>
        <div>
          {props.carVerified ? (
            <DocumentContent
              // isVerified={props.carVerified}
              deleteHandler={handleDeleteDoc}
              docUrl={documents.documents[0]?.file?.secure_url}
              title="national_id"
              // verificationInProgress={props.verificationInProgress}
              isEdit={props.isEdit}
              isManage={props.isManage}
              deleteLoading={deleteLoading}
            />
          ) : (
            <div className="d-flex align-items-start flex-column">
              <div className="d-flex align-items-center">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleUpload(e, "national_id")}
                  // disabled={props.isManage && !props.isEdit}
                  // disabled={saving}
                />
                <span>
                  {(uploading || deleteLoading) && id === "national_id" && (
                    <ButtonLoading
                      spinnerColor="orange"
                      dimensions={{ height: "18px", width: "18px" }}
                    />
                  )}
                </span>
              </div>
              <DocumentContent
                // isVerified={props.carVerified!}
                // verificationInProgress={props.verificationInProgress}
                isEdit={props.isEdit}
                isManage={props.isManage}
                deleteHandler={handleDeleteDoc}
                docUrl={documents.documents[0]?.file?.secure_url}
                title="national_id"
                deleteLoading={deleteLoading}
              />
            </div>
          )}
        </div>
        <br />
        <label>Car Logbook(Optional)</label>
        <div>
          {props.carVerified ? (
            <DocumentContent
              // isVerified={props.carVerified}
              // verificationInProgress={props.verificationInProgress}
              isEdit={props.isEdit}
              isManage={props.isManage}
              deleteHandler={handleDeleteDoc}
              deleteLoading={deleteLoading}
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
                  // disabled={props.isManage && !props.isEdit}
                  // disabled={saving}
                />
                <span>
                  {(uploading || deleteLoading) && id === "logbook" && (
                    <ButtonLoading
                      spinnerColor="orange"
                      dimensions={{ height: "18px", width: "18px" }}
                    />
                  )}
                </span>
              </div>
              <DocumentContent
                // isVerified={props.carVerified!}
                // verificationInProgress={props.verificationInProgress}
                isEdit={props.isEdit}
                isManage={props.isManage}
                deleteHandler={handleDeleteDoc}
                docUrl={documents.documents[1]?.file?.secure_url}
                title="logbook"
                deleteLoading={deleteLoading}
              />
            </div>
          )}
        </div>

        {/* {!props.isEdit && props.isManage && (
          <div className="mt-3">
            <small>
              This information is only editable with permisson from the admin.{" "}
              <button
                className="btn colorOrange p-0"
                onClick={handleRequestEditClick}
              >
                {props.hasEditRequest ? (
                  <small className="text-success fw-bold">
                    Edit Request Sent!
                  </small>
                ) : (
                  <small>Request Edit</small>
                )}
              </button>
            </small>
          </div>
        )} */}

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

        {props.isManage ? (
          <UpdateBtn
            loading={loading && !secondaryLoading}
            disabled={!documents.documents[0]}
          />
        ) : (
          <FormNextPrevButton
            loading={loading && !secondaryLoading}
            disabled={(loading && !secondaryLoading) || !documents.documents[0]}
            setActiveSlide={props.setActiveSlide!}
            activeSlide={props.activeSlide!}
          />
        )}
      </form>
    </>
  );
};
