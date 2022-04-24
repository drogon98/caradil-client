import Link from "next/link";
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/layouts/Layout";
import { ButtonLoading } from "../../components/Loading/ButtonLoading";
import {
  DriverDetailsInput,
  useDeleteFileMutation,
  useGetDriverDetailsQuery,
  useUpdateDriverDetailsMutation,
  useUploadFileMutation,
} from "../../graphql_types/generated/graphql";

interface GetDriverInfoProps {}

const uploadButton = (
  uploadHandler: any,
  loading: boolean,
  isChange = false
) => (
  <>
    <input
      type="file"
      accept="image/*"
      // required
      onChange={uploadHandler}
      className="mt-3"
      id="actual-btn"
      hidden
    />
    <label htmlFor="actual-btn" id="upload-btn-label" className="btn">
      {loading
        ? "Uploading..."
        : isChange
        ? "Change License"
        : "Choose License"}
    </label>
  </>
);

const GetDriverInfo: FC<GetDriverInfoProps> = (props) => {
  const [values, setValues] = useState<DriverDetailsInput>();
  const [mainLoading, setMainLoading] = useState(true);
  const [updateDriverDetails, { loading }] = useUpdateDriverDetailsMutation();
  const [uploadFile, { loading: uploading }] = useUploadFileMutation();
  const [deleteFile, { loading: deletingPhoto }] = useDeleteFileMutation();
  const [secondaryLoading, setSecondaryLoading] = useState(false);
  const [hasLicenseError, setHasLicenseError] = useState(false);
  const { data, loading: fetchingDrivingData } = useGetDriverDetailsQuery();

  console.log("data :>> ", data);

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  useEffect(() => {
    if (hasLicenseError) {
      setTimeout(() => {
        setHasLicenseError(false);
      }, 4000);
    }
  }, [hasLicenseError]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...(values! ?? {}), [e.target.name]: e.target.value });
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      setSecondaryLoading(true);
      const response = await uploadFile({ variables: { file } });
      if (response.data?.singleUpload.error) {
        console.log("error :>> ", response.data?.singleUpload.error);
      } else {
        // if (avatar.public_id) {
        //   await deleteFile({ variables: { id: avatar.public_id } });
        // }
        // const newPhoto = response.data?.singleUpload.file;

        // delete newPhoto?.__typename;
        // setAvatar(newPhoto!);
        // await editProfile({
        //   variables: { input: { ...values, avatar: newPhoto } },
        // });
        setSecondaryLoading(false);
      }
      e.target.value = "";
    } catch (error) {
      console.log("error :>> ", error);
      e.target.value = "";
    }
  };

  const handleDeletePhoto = () => {};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await updateDriverDetails({
        variables: { input: values! },
      });
      console.log("response :>> ", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <CustomHead title="Get driver info" />
      <AuthWrapper>
        <Layout>
          <div className="customContainer my-4">
            <h1>Driving Details</h1>
            <p>
              This is a self-drive car. We need to know you are qualified to
              drive. These are the details in your driving license or
              international driving license. If a friend,relative or spouse will
              drive on your behalf,the details provided below should be his or
              hers.
            </p>
            <form className="form-group my-4" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="email">License First Name</label>

                  <input
                    className="form-control"
                    required
                    id="first_name"
                    //   value={values.email}
                    placeholder="John"
                    onChange={handleChange}
                    name="first_name"
                  />
                </div>
                <div className="col">
                  <label htmlFor="email">License Last Name</label>

                  <input
                    className="form-control"
                    required
                    id="last_name"
                    //   value={values.email}
                    placeholder="John"
                    onChange={handleChange}
                    name="last_name"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="email">License No.</label>

                  <input
                    className="form-control"
                    required
                    id="license_number"
                    //   value={values.email}
                    placeholder="863736892"
                    onChange={handleChange}
                    name="license_number"
                  />
                </div>
                <div className="col">
                  <label htmlFor="email">Driver Age</label>

                  <input
                    className="form-control"
                    required
                    id="age"
                    //   value={values.email}
                    placeholder="28"
                    onChange={handleChange}
                    name="age"
                  />
                </div>
              </div>
              {true ? (
                <div className="d-flex p-0">
                  <div>{uploadButton(handleUpload, uploading, true)}</div>
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <div>
                    <button
                      className="btn bgOrange"
                      onClick={handleDeletePhoto}
                      style={{ width: "100px", fontSize: "10px" }}
                    >
                      {deletingPhoto && !secondaryLoading ? (
                        <ButtonLoading
                          spinnerColor="white"
                          dimensions={{
                            height: "18px",
                            width: "18px",
                          }}
                        />
                      ) : (
                        "Delete License"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex">
                  {uploadButton(handleUpload, uploading)}
                </div>
              )}
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn bgOrange">
                  Save & Continue
                </button>
              </div>
            </form>
          </div>
        </Layout>
      </AuthWrapper>
    </>
  );
};

export default GetDriverInfo;
