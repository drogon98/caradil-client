import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
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
import { FormSaveButton } from "./FormSaveButton";
import { PhotoBox } from "./PhotoBox";

interface PhotosProps {
  value: CarPhotosInput;
  setData: Dispatch<SetStateAction<CarPhotosInput>>;
  carId: number | undefined;
  isEdit: boolean;
  carVerified: boolean;
  setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
}

/**
 * @author @CodeYourEmpire
 * @function @Photos
 **/

export const Photos: FC<PhotosProps> = (props) => {
  const [saved, setSaved] = useState(false);
  const [uploadFile, { loading: uploading }] = useUploadFileMutation();
  const [editPhotos, { loading }] = useEditCarPhotosMutation();
  const [deleteFile, { loading: deleteLoading }] = useDeleteFileMutation();
  const [secondaryLoading, setSecondaryLoading] = useState(false);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    let response;
    try {
      response = await uploadFile({ variables: { file } });
      const newPhoto = response?.data?.singleUpload;
      delete newPhoto?.__typename;
      const newPhotoPayload: FileInput = {
        public_id: newPhoto?.file?.public_id ?? "",
        secure_url: newPhoto?.file?.secure_url ?? "",
        url: newPhoto?.file?.secure_url ?? "",
      };
      const photos = [...props.value.photos, newPhotoPayload!];
      props.setData({ photos: [...photos] });
      setSecondaryLoading(true);
      await editPhotos({
        variables: { carId: props.carId!, input: { photos } },
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

  const deletePhoto = async (id: string) => {
    let response;
    try {
      setSecondaryLoading(true);
      response = await deleteFile({ variables: { id } });
      if (response.data?.deleteUpload) {
        const tempPhotos = props.value.photos.filter(
          (photo) => photo.public_id !== id
        );

        props.setData({ photos: [...tempPhotos] });
        await editPhotos({
          variables: {
            carId: props.carId!,
            input: { photos: [...tempPhotos] },
          },
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

    let response;
    try {
      response = await editPhotos({
        variables: {
          carId: props.carId!,
          input: { photos: props.value.photos },
        },
      });
      if (response?.data?.editCarPhotos.error) {
      } else if (response?.data?.editCarPhotos.carId) {
        props.setResponseCar(response.data.editCarPhotos.car!);
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 3000);
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

  // console.log("props.value.photos :>> ", props.value.photos);

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
          handleSubmit(e);
        }}
      >
        <div className="d-flex align-items-center">
          <input type="file" accept="image/*" onChange={handleUpload} />
          <span>
            {(uploading || deleteLoading) && (
              <ButtonLoading
                spinnerColor="orange"
                dimensions={{ height: "18px", width: "18px" }}
              />
            )}
          </span>
        </div>

        {props.value.photos.length === 0 && (
          <p className="pt-3">No photos uploaded!</p>
        )}

        <div className="photoBoxWrapper mt-4">
          {props.value.photos?.length > 0 &&
            props.value.photos.map((photo) => (
              <PhotoBox
                photo={photo}
                deletePhoto={deletePhoto}
                key={photo.public_id}
                carVerified={props.carVerified}
              />
            ))}
        </div>
        <FormSaveButton
          loading={loading && !secondaryLoading}
          saved={saved}
          isEdit={props.isEdit}
          carId={props.carId!}
        />
      </form>
    </>
  );
};
