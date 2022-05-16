import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/layouts/Layout";
import { Loading } from "../../components/Loading";
import { ButtonLoading } from "../../components/Loading/ButtonLoading";
import {
  DriverDetailsInput,
  FileInput,
  useDeleteFileMutation,
  useGetDriverDetailsQuery,
  useUpdateDriverDetailsMutation,
  useUploadFileMutation,
} from "../../graphql_types/generated/graphql";

interface GetDriverInfoProps {}

const agesArray = (): number[] => {
  let output = [];

  for (let i = 20; i < 81; i++) {
    output.push(i);
  }

  return output;
};

export const parseInputDate = (dateString: string): string => {
  try {
    if (dateString) {
      const splitDate = new Date(dateString).toISOString().split("T")[0];
      const spacedDate = splitDate.slice(0, 10);
      console.log("spacedDate :>> ", spacedDate);
      return spacedDate;
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};

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
  const [license, setLicense] = useState<FileInput>({
    public_id: "",
    secure_url: "",
    url: "",
  });
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (data?.getDriverDetails) {
      let tempData = data.getDriverDetails;

      let licenseData: FileInput = {
        public_id: tempData.license?.public_id ?? "",
        secure_url: tempData.license?.secure_url ?? "",
        url: tempData.license?.url ?? "",
      };

      setLicense(licenseData);

      let tempDate = new Date(tempData.license_expiry_date ?? "").toISOString();

      setValues({
        first_name: tempData.first_name ?? "",
        last_name: tempData.last_name ?? "",
        age: tempData.age ?? 0,
        license: licenseData,
        license_expiry_date: parseInputDate(tempDate) ?? "",
        license_number: tempData.license_number ?? "",
      });
      setMainLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (hasLicenseError) {
      setTimeout(() => {
        setHasLicenseError(false);
      }, 4000);
    }
  }, [hasLicenseError]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        const newLicense = response.data?.singleUpload.file;

        delete newLicense?.__typename;

        sessionStorage.setItem("license", JSON.stringify(newLicense));

        setLicense(newLicense!);

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

  const handleDeletePhoto = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const fileId = license.public_id;

      // Delete file here
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Check if license is uploaded

      if (!license.secure_url) {
        setHasLicenseError(true);
        return;
      }

      setUpdating(true);
      let response = await updateDriverDetails({
        variables: {
          input: {
            ...values!,
            license_expiry_date: new Date(values?.license_expiry_date ?? "")
              .getTime()
              .toString(),
            license,
          },
        },
      });

      if (response) {
        await router.push({
          pathname: "/checkout/confirm-order",
          query: { ...router.query },
        });
      } else {
        throw new Error("");
      }
    } catch (error) {
      console.log("error", error);
      setUpdating(false);
    }
  };

  return (
    <>
      <CustomHead title="Get driver info" />
      <AuthWrapper>
        <Layout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="customContainer my-4">
              <h1>Driving Details</h1>
              <p>
                This is a self-drive car. We need to know you are qualified to
                drive. These are the details in your driving license or
                international driving license. If a friend,relative or spouse
                will drive on your behalf,the details provided below should be
                his or hers.
              </p>
              <form className="form-group my-4" onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="first_name">License First Name</label>

                    <input
                      className="form-control"
                      required
                      id="first_name"
                      value={values?.first_name ?? ""}
                      placeholder="eg John"
                      onChange={handleChange}
                      name="first_name"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="last_name">License Last Name</label>

                    <input
                      className="form-control"
                      required
                      id="last_name"
                      value={values?.last_name ?? ""}
                      placeholder="eg Doe"
                      onChange={handleChange}
                      name="last_name"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="license_number">License No.</label>

                    <input
                      className="form-control"
                      required
                      id="license_number"
                      value={values?.license_number ?? ""}
                      placeholder="863736892"
                      onChange={handleChange}
                      name="license_number"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="driver_age">Driver Age</label>
                    <div>
                      <select
                        id="driver_age"
                        name="age"
                        className="form-control"
                        value={values?.age ?? ""}
                        onChange={handleChange}
                      >
                        <option value="">Select age</option>
                        {agesArray().map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="license_expiry_date">
                      License Expiry Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      required
                      id="license_expiry_date"
                      value={values?.license_expiry_date ?? ""}
                      onChange={handleChange}
                      name="license_expiry_date"
                    />
                  </div>
                </div>

                {license.secure_url ? (
                  <div className="d-flex p-0">
                    {/* <div>{uploadButton(handleUpload, uploading, true)}</div>
                  &nbsp; &nbsp; &nbsp; &nbsp; */}
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
          )}
        </Layout>
      </AuthWrapper>
    </>
  );
};

export default GetDriverInfo;
