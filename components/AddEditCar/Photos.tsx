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
import { ButtonLoading } from "../Loading/ButtonLoading";
import { FormSaveButton } from "./FormSaveButton";
import { PhotoBox } from "./PhotoBox";

interface PhotosProps {
  value: CarPhotosInput;
  carId: number | undefined;
  carVerified: boolean;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  activeSlide: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
}

export const Photos: FC<PhotosProps> = (props) => {
  const [uploadFile, { loading: uploading }] = useUploadFileMutation();
  const [editPhotos, { loading }] = useEditCarPhotosMutation();
  const [deleteFile, { loading: deleteLoading }] = useDeleteFileMutation();
  const [secondaryLoading, setSecondaryLoading] = useState(false);
  const [values, setValues] = useState<CarPhotosInput>();

  console.log("props.value.photos :>> ", props.value.photos);

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

  console.log("photos :>> ", values);

  const deletePhoto = async (id: string) => {
    console.log("Great :>> ");
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
        props.setActiveSlide(props.activeSlide + 1);
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
      <h3>Photos</h3>
      <p className="mb-3">
        We prefer <b>5+</b> photos. Ensure these photos are clear and your car
        is the main subject.
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
                // carVerified={props.carVerified}
              />
            ))}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button onClick={() => props.setActiveSlide(props.activeSlide - 1)}>
            Prev
          </button>
          <button type="submit">Next</button>
        </div>
        {/* <FormSaveButton
          loading={loading && !secondaryLoading}
          saved={saved}
          isEdit={props.isEdit}
          carId={props.carId!}
          disabled={props.value.photos.length === 0}
        /> */}
      </form>
    </>
  );
};
