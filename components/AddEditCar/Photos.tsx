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
  CarPhotosInput,
  FileInput,
  useDeleteFileMutation,
  useEditCarPhotosMutation,
  useUploadFileMutation,
} from "../../graphql_types/generated/graphql";
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
  // verificationInProgress?: boolean;
}

export const Photos: FC<PhotosProps> = (props) => {
  const [uploadFile, { loading: uploading }] = useUploadFileMutation();
  const [editPhotos, { loading }] = useEditCarPhotosMutation();
  const [deleteFile, { loading: deleteLoading }] = useDeleteFileMutation();
  const [secondaryLoading, setSecondaryLoading] = useState(false);
  const [values, setValues] = useState<CarPhotosInput>();
  const [showRequestEditModal, setShowRequestEditModal] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  // console.log("props.value.photos :>> ", props.value.photos);

  useEffect(() => {
    if (props.value.photos) {
      setValues({ photos: props.value.photos });
    }
  }, [props.value]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    try {
      let response = await uploadFile({ variables: { file } });
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

  // console.log("photos :>> ", values);

  const deletePhoto = async (id: string) => {
    // console.log("Great :>> ");
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
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("errorMessage :>> ", errorMessage);
      return;
      // setError("Network Error!");
    }

    // Make request to delete file
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
      } else if (response?.data?.editCarPhotos.carId) {
        props.setCompData(response.data.editCarPhotos.car!);

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
  };

  // const handleRequestEditClick = (e: SyntheticEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (props.hasEditRequest) {
  //     return;
  //   }
  //   setShowRequestEditModal(true);
  // };

  // console.log("props.value.photos :>> ", props.value.photos);

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
          <b>Note:These photos should be real and exactly your car.</b>
        </small>
      </div>

      <div className="mb-3">
        <small className="text-danger">
          Note:Uploading photos containing your contact info might result to
          your car or account being suspended.
        </small>
      </div>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="mb-3"
      >
        <div className="d-flex align-items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            // disabled={props.isManage && !props.isEdit}
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
                // verificationInProgress={props.verificationInProgress}
                isEdit={props.isEdit}
                isManage={props.isManage}
              />
            ))}
        </div>
        {/* 
        {!props.isEdit && props.isManage && (
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

        {props.isManage ? (
          <UpdateBtn
            loading={loading && !secondaryLoading}
            disabled={values?.photos && values?.photos?.length < 5}
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
