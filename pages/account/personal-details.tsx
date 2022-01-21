import Head from "next/head";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { useRole } from "../../components/hooks/useRole";
import AccountLayout from "../../components/layouts/AccountLayout";
import { Loading } from "../../components/Loading";
import { ButtonLoading } from "../../components/Loading/ButtonLoading";
import Save from "../../components/Toast/Save";
import {
  EditProfileInput,
  FileInput,
  useDeleteFileMutation,
  useEditProfileMutation,
  useGetAuthUserQuery,
  useUploadFileMutation,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";

interface PersonalDetailsProps {}

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
      {loading ? "Uploading..." : isChange ? "Change File" : "Choose File"}
    </label>
  </>
);

const PersonalDetails: FC<PersonalDetailsProps> = (props) => {
  const [values, setValues] = useState<EditProfileInput>({
    user_name: "",
    first_name: "",
    last_name: "",
    phone: "",
    business_name: "",
  });
  const [mainLoading, setMainLoading] = useState(true);
  const [secondaryLoading, setSecondaryLoading] = useState(false);
  const [avatar, setAvatar] = useState<FileInput>({
    public_id: "",
    secure_url: "",
    url: "",
  });
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const [uploadFile, { loading: uploading }] = useUploadFileMutation();
  const [editProfile, { loading: editLoading }] = useEditProfileMutation();
  const { data, loading } = useGetAuthUserQuery({
    fetchPolicy: "network-only",
  });
  const [deleteFile, { loading: deletingPhoto }] = useDeleteFileMutation();
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [isInitial, setIsInitial] = useState<boolean>();
  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.initial) {
      setIsInitial(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (data?.getUser.user) {
      const tempData = { ...data.getUser.user };
      delete tempData.__typename;
      delete tempData.id;
      if (tempData.avatar?.public_id) {
        const tempAvatar: FileInput = {
          secure_url: tempData.avatar.secure_url!,
          public_id: tempData.avatar.public_id!,
          url: tempData.avatar.url!,
        };
        setAvatar({ ...tempAvatar });
      }
      delete tempData.avatar;
      delete tempData.email;
      setValues({ ...(tempData as EditProfileInput) });
    }
  }, [data]);

  useEffect(() => {
    if (!loading && data?.getUser.user) {
      setMainLoading(false);
    }
  }, [data, loading]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      setSecondaryLoading(true);
      const response = await uploadFile({ variables: { file } });
      if (response.data?.singleUpload.error) {
        console.log("error :>> ", response.data?.singleUpload.error);
      } else {
        if (avatar.public_id) {
          await deleteFile({ variables: { id: avatar.public_id } });
        }
        const newPhoto = response.data?.singleUpload.file;

        delete newPhoto?.__typename;
        setAvatar(newPhoto!);
        await editProfile({
          variables: { input: { ...values, avatar: newPhoto } },
        });
        setSecondaryLoading(false);
      }
      e.target.value = "";
    } catch (error) {
      console.log("error :>> ", error);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload;
    if (avatar) {
      payload = { ...values, avatar };
    } else {
      payload = { ...values };
    }

    try {
      let response = await editProfile({ variables: { input: payload } });
      if (response.data?.editProfile) {
        setShowSaveToast(true);

        if (isInitial) {
          setTimeout(async () => {
            await router.push({
              pathname: "/account",
              query: { to_car: true },
            });
          }, 3200);
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

    // if (response.data?.)
  };

  const handleDeletePhoto = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let response;
    try {
      response = await deleteFile({
        variables: { id: avatar?.public_id! },
      });
      if (response.data?.deleteUpload) {
        const payload = {
          ...values,
          avatar: null,
        };
        setSecondaryLoading(true);
        await editProfile({ variables: { input: payload } });
        setSecondaryLoading(false);
        setAvatar({ public_id: "", secure_url: "", url: "" });
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

  // console.log("data :>> ", data);
  // console.log("avatar :>> ", avatar);

  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="p-2">
              {" "}
              {showSaveToast && (
                <Save
                  setShow={setShowSaveToast}
                  message={"Profile updated successfully!"}
                  show={showSaveToast}
                />
              )}
              <h3 className="text-center my-3">Personal Details</h3>
              <div className="container my-5">
                <form
                  className="form-group profile-form"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-4 d-flex flex-column">
                      <div className="d-flex justify-content-center">
                        <img
                          src={
                            avatar?.secure_url
                              ? avatar.secure_url
                              : "/images/avatar.svg"
                          }
                          className="rounded-circle"
                          height="250px"
                          width="250px"
                        />
                      </div>
                      <div className="col-8 mx-auto mt-3">
                        {avatar?.secure_url ? (
                          <div>
                            <div className="d-flex justify-content-between p-0">
                              <div>
                                {uploadButton(handleUpload, uploading, true)}
                              </div>
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
                                    "Delete Photo"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-center">
                            {uploadButton(handleUpload, uploading)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-8 mt-4 ">
                      <div className="mb-3">
                        <label htmlFor="username">Username</label>
                        <input
                          onChange={handleChange}
                          value={values.user_name ?? ""}
                          id="username"
                          type="text"
                          name="user_name"
                          className="form-control"
                          // required
                        />
                      </div>

                      {role === 2 && (
                        <div className="mb-3">
                          <label htmlFor="businessName">Business Name</label>
                          <input
                            onChange={handleChange}
                            value={values.business_name ?? ""}
                            id="businessName"
                            type="text"
                            name="business_name"
                            className="form-control"
                            // required
                          />
                        </div>
                      )}

                      <div className="mb-3">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          onChange={handleChange}
                          value={values.first_name ?? ""}
                          id="firstName"
                          type="text"
                          name="first_name"
                          className="form-control"
                          // required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          onChange={handleChange}
                          value={values.last_name ?? ""}
                          id="lastName"
                          type="text"
                          name="last_name"
                          className="form-control"
                          // required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone">Phone</label>
                        <input
                          onChange={handleChange}
                          value={values.phone ?? ""}
                          id="phone"
                          type="text"
                          name="phone"
                          className="form-control"
                          // required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    {/* editLoading */}
                    <button type="submit" className="btn bgOrange">
                      {editLoading && !secondaryLoading ? (
                        <ButtonLoading
                          spinnerColor="white"
                          dimensions={{ height: "24px", width: "24px" }}
                        />
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default PersonalDetails;
