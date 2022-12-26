import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  MouseEvent,
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
import { fileSizeChecker } from "../../utils/file_size_checker";
import { ButtonLoading } from "../Loading/ButtonLoading";
import { ToastWrapper } from "../Toast/ToastWrapper";
import DocumentContent from "./DocumentContent";
import { FormNextPrevButton } from "./FormNextPrevButton";
import RequestEditModal from "./ManageCar/RequestEditModal";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface DocumentsProps {
  value: CarDocumentsInput;
  carId: string | undefined;
  carVerified?: boolean;
  isEdit?: boolean;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  activeSlide?: number;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  isManage?: boolean;
  booked?: boolean;
  hasEditRequest?: boolean;
  isActive?: boolean;
}

export const Documents: FC<DocumentsProps> = (props) => {
  const [uploadFile, { loading: uploading }] = useUploadFileMutation();
  const [editDocuments, { loading }] = useEditCarDocumentsMutation();
  const [deleteFile, { loading: deleteLoading }] = useDeleteFileMutation();
  const [secondaryLoading, setSecondaryLoading] = useState(false);
  const [showRequestEditModal, setShowRequestEditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("");
  const [id, setId] = useState<string>();
  const [documents, setDocuments] = useState<CarDocumentsInput>({
    documents: [],
  });

  useEffect(() => {
    if (props.value) {
      setDocuments({ ...props.value });
    }
  }, [props.value]);

  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    try {
      const file = e.target.files?.[0];
      if (!file) {
        throw new Error("Please select a file!");
      }
      const isFileSizeValid = fileSizeChecker(10, file);
      if (!isFileSizeValid.fileOk) {
        const errorMsg = `Maximum file size is ${isFileSizeValid.maxFileSize} mbs!`;
        throw new Error(errorMsg);
      }
      setId(title);
      const response = await uploadFile({
        variables: { file },
        fetchPolicy: "no-cache",
      });
      if (response.data?.singleUpload.error) {
        throw new Error(response.data?.singleUpload.error);
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
            tempToDelete = tempDocuments[0];
            tempDocuments[0] = newDocument;
          }
        } else if (title === "logbook") {
          if (!tempDocuments[1]) {
            tempDocuments[1] = newDocument;
          } else {
            tempToDelete = tempDocuments[1];
            tempDocuments[1] = newDocument;
          }
        }

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
      if (error instanceof Error) {
        if (error.message.includes("Maximum file size is")) {
          setToastBg("warning");
        } else {
          setToastBg("danger");
        }
        setShowToast(true);
        setToastMessage(error.message);
      }
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
        throw new Error(response?.data?.editCarDocuments.error);
      } else if (response.data?.editCarDocuments.carId) {
        props.setCompData(response.data.editCarDocuments.car!);
        if (props.isManage) {
          setToastBg("success");
          setShowToast(true);
          setToastMessage("Updated successfully");
        } else {
          props.setActiveSlide && props.setActiveSlide(props.activeSlide! + 1);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setToastBg("danger");
        setShowToast(true);
        setToastMessage(error.message);
      }
    }
  };

  const getFile = (title: string) => {
    if (title === "national_id") {
      return documents.documents[0];
    } else if (title === "logbook") {
      return documents.documents[1];
    }
  };

  const handleDeleteDoc = async (
    e: MouseEvent<HTMLButtonElement>,
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
    } catch (error) {
      if (error instanceof Error) {
        setShowToast(true);
        setToastMessage(error.message);
        setToastBg("danger");
      }
    }
  };

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
      {showToast && (
        <ToastWrapper
          setShow={setShowToast}
          show={showToast}
          message={toastMessage}
          position="bottom-end"
          bg={toastBg}
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
              deleteHandler={handleDeleteDoc}
              docUrl={documents.documents[0]?.file?.secure_url}
              title="national_id"
              isEdit={props.isEdit}
              isManage={props.isManage}
              deleteLoading={deleteLoading}
            />
          ) : (
            <div className="d-flex align-items-start flex-column">
              <div className="d-flex align-items-center">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png,.pdf"
                  onChange={(e) => handleUpload(e, "national_id")}
                  disabled={props.isActive}
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
                  accept=".jpg, .jpeg, .png,.pdf"
                  onChange={(e) => handleUpload(e, "logbook")}
                  disabled={props.isActive}
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

        {props.isManage ? (
          <UpdateBtn
            loading={loading && !secondaryLoading}
            disabled={!documents.documents[0] || props.isActive}
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
