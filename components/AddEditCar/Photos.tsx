import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Car,
  CarPhotosInput,
  FileInput,
  useDeleteFileMutation,
  useEditCarPhotosMutation,
  useUploadFileMutation,
} from "../../graphql_types/generated/graphql";
import { fileSizeChecker } from "../../utils/file_size_checker";
import { ButtonLoading } from "../Loading/ButtonLoading";
import { ToastWrapper } from "../Toast/ToastWrapper";
import { FormNextPrevButton } from "./FormNextPrevButton";
import RequestEditModal from "./ManageCar/RequestEditModal";
import UpdateBtn from "./ManageCar/UpdateBtn";
import { PhotoBox } from "./PhotoBox";

interface PhotosProps {
  value: CarPhotosInput;
  carId: number | undefined;
  carVerified?: boolean;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  isManage?: boolean;
  isEdit?: boolean; // Under Manage
  booked?: boolean;
  hasEditRequest?: boolean;
  isActive?: boolean;
}

export const Photos: FC<PhotosProps> = (props) => {
  const [uploadFile, { loading: uploading }] = useUploadFileMutation();
  const [editPhotos, { loading }] = useEditCarPhotosMutation();
  const [deleteFile, { loading: deleteLoading }] = useDeleteFileMutation();
  const [secondaryLoading, setSecondaryLoading] = useState(false);
  const [values, setValues] = useState<CarPhotosInput>();
  const [showRequestEditModal, setShowRequestEditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("");

  useEffect(() => {
    if (props.value.photos) {
      setValues({ photos: props.value.photos });
    }
  }, [props.value]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
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
      let response = await uploadFile({ variables: { file } });
      if (response.data?.singleUpload.error) {
        throw new Error(response.data?.singleUpload.error);
      } else {
        const newPhoto = response?.data?.singleUpload;
        delete newPhoto?.__typename;
        const newPhotoPayload: FileInput = {
          public_id: newPhoto?.file?.public_id ?? "",
          secure_url: newPhoto?.file?.secure_url ?? "",
          url: newPhoto?.file?.secure_url ?? "",
        };
        const photos = [...(values?.photos ?? []), newPhotoPayload!];
        setValues({ photos: [...photos] });
        setSecondaryLoading(true);
        await editPhotos({
          variables: { carId: props.carId!, input: { photos } },
          fetchPolicy: "no-cache",
        });
        setSecondaryLoading(false);
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

  const deletePhoto = async (id: string) => {
    try {
      setSecondaryLoading(true);
      let response = await deleteFile({
        variables: { id },
        fetchPolicy: "no-cache",
      });
      if (response.data?.deleteUpload) {
        const tempPhotos = values?.photos.filter(
          (photo) => photo.public_id !== id
        );

        setValues({ photos: [...tempPhotos!] });
        await editPhotos({
          variables: {
            carId: props.carId!,
            input: { photos: [...tempPhotos!] },
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response = await editPhotos({
        variables: {
          carId: props.carId!,
          input: { photos: values?.photos! },
        },
      });
      if (response?.data?.editCarPhotos.error) {
        throw new Error(response?.data?.editCarPhotos.error);
      } else if (response?.data?.editCarPhotos.carId) {
        props.setCompData(response.data.editCarPhotos.car!);

        if (props.isManage) {
          setShowToast(true);
          setToastMessage("Updated successfully!");
          setToastBg("success");
        } else {
          props.setActiveSlide && props.setActiveSlide(props.activeSlide! + 1);
        }
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
          message={toastMessage}
          show={showToast}
          position="bottom-end"
          bg={toastBg}
        />
      )}
      <h3>Photos</h3>
      <p className="mb-1">
        <small>
          {" "}
          We prefer <b>5 photos minimum</b>. Photos of your car from all 4 views
          and one inner view are enough. However, you can have as many photos as
          possible.. Ensure these photos are clear and your car is the only
          subject. Photos play an important role for the guests to make a
          decision. <b>Make your car standout</b>.
        </small>
      </p>

      <div className="mb-2">
        <small>
          <b>
            Note:These photos should be exact and match your car.These photos
            should only belong to one car. If you have another car,list it as a
            separate car.
          </b>
        </small>
      </div>

      {/* <div className="mb-2">
        
      </div> */}

      <br />
      <p>Ensure the photos you upload meet the criteria below</p>
      <div>
        <img
          width={"100%"}
          style={{ objectFit: "cover" }}
          src="/images/imagerules.jpg"
        />
      </div>

      {/* <div className="mb-3">
        <small className="text-danger">
          Note:Uploading photos containing your contact info might result to
          your car or account being suspended.
        </small>
      </div> */}

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="mb-3"
      >
        <div className="d-flex align-items-center">
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleUpload}
            disabled={props.isActive}
          />
          <span>
            {(uploading || deleteLoading) && (
              <ButtonLoading
                spinnerColor="orange"
                dimensions={{ height: "18px", width: "18px" }}
              />
            )}
          </span>
        </div>

        {values?.photos.length === 0 && (
          <p className="pt-3">No photos uploaded!</p>
        )}

        <div className="photoBoxWrapper mt-4">
          {values &&
            values?.photos?.length > 0 &&
            values.photos.map((photo) => (
              <PhotoBox
                photo={photo}
                deletePhoto={deletePhoto}
                key={photo.public_id}
                isEdit={props.isEdit}
                isManage={props.isManage}
              />
            ))}
        </div>

        {props.isManage ? (
          <UpdateBtn
            loading={loading && !secondaryLoading}
            disabled={
              (values?.photos && values?.photos?.length < 5) || props.isActive
            }
          />
        ) : (
          <FormNextPrevButton
            loading={loading && !secondaryLoading}
            disabled={
              (loading && !secondaryLoading) ||
              (values?.photos && values?.photos?.length < 5)
            }
            setActiveSlide={props.setActiveSlide!}
            activeSlide={props.activeSlide!}
          />
        )}
      </form>
    </>
  );
};
