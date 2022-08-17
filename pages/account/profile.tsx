import { useRouter } from "next/router";
import {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import { useRole } from "../../components/hooks/useRole";
import AccountLayout from "../../components/layouts/AccountLayout";
import { ButtonLoading } from "../../components/Loading/ButtonLoading";
import { ToastWrapper } from "../../components/Toast/ToastWrapper";
import {
  EditProfileInput,
  FileInput,
  useDeleteFileMutation,
  useEditProfileMutation,
  useUploadFileMutation,
} from "../../graphql_types/generated/graphql";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUser } from "../../redux/userSlice";
import { fileSizeChecker } from "../../utils/file_size_checker";

interface ProfileProps {}

const uploadButton = (
  uploadHandler: any,
  loading: boolean,
  isChange = false
) => (
  <>
    <input
      type="file"
      accept=".jpg, .jpeg, .png"
      // required
      onChange={uploadHandler}
      className="mt-3"
      id="actual-btn"
      hidden
    />
    <label htmlFor="actual-btn" id="upload-btn-label" className="btn">
      {loading ? "Uploading..." : isChange ? "Change Photo" : "Choose Photo"}
    </label>
  </>
);

const Profile: FC<ProfileProps> = (props) => {
  const [values, setValues] = useState<EditProfileInput>({
    user_name: "",
    first_name: "",
    last_name: "",
    phone: "",
    business_name: "",
  });
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
  const [deleteFile, { loading: deletingPhoto }] = useDeleteFileMutation();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("");
  const [isInitial, setIsInitial] = useState<boolean>();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (router.query && router.query.initial) {
      setIsInitial(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (user) {
      const tempData = { ...user };
      delete tempData.__typename;
      delete tempData.id;
      delete tempData.email_verified;

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
      setPhone(tempData.phone ?? "");
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "phone") {
      setValues({
        ...values,
        [e.target.name]: e.target.value.replace(/\D/g, ""),
      });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) {
        throw new Error("Please select a file!");
      }
      const isFileSizeValid = fileSizeChecker(5, file);
      if (!isFileSizeValid.fileOk) {
        const errorMsg = `Maximum file size is ${isFileSizeValid.maxFileSize} mbs!`;
        throw new Error(errorMsg);
      }
      setSecondaryLoading(true);
      const response = await uploadFile({ variables: { file } });
      if (response.data?.singleUpload.error) {
        throw new Error(response.data?.singleUpload.error);
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
      if (error instanceof Error) {
        if (error.message.includes("Maximum file size is")) {
          setToastBg("warning");
        } else {
          setToastBg("danger");
        }
        setShowToast(true);
        setToastMessage(error.message);
      }
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload;

    if (avatar) {
      payload = { ...values, phone, avatar };
    } else {
      payload = { ...values, phone };
    }

    try {
      let response = await editProfile({ variables: { input: payload } });

      if (response.data?.editProfile.error) {
        throw new Error(response.data?.editProfile.error);
      } else {
        if (response.data?.editProfile.user) {
          dispatch(setUser(response.data?.editProfile.user));
          setShowToast(true);
          setToastMessage("Profile updated successfully!");
          setToastBg("success");

          if (isInitial) {
            await router.push({
              pathname: "/account",
            });
          }
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

  const handleDeletePhoto = async (e: MouseEvent<HTMLButtonElement>) => {
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
      if (error instanceof Error) {
        setShowToast(true);
        setToastMessage(error.message);
        setToastBg("danger");
      }
    }
  };

  return (
    <>
      <CustomHead title="Account - Personal Details" />
      <AuthWrapper>
        <AccountLayout>
          {/* {mainLoading ? (
            <Loading />
          ) : ( */}
          <div className="p-2 my-4">
            {" "}
            {showToast && (
              <ToastWrapper
                setShow={setShowToast}
                message={toastMessage}
                show={showToast}
                position="bottom-end"
                bg={toastBg}
              />
            )}
            <h3 className="text-center my-3">My Profile</h3>
            <div className="container my-5">
              <form className="form-group profile-form" onSubmit={handleSubmit}>
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
                        style={{ objectFit: "cover" }}
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
                      {/* <input
                        onChange={handleChange}
                        value={values.phone ?? ""}
                        id="phone"
                        type="text"
                        name="phone"
                        className="form-control"
                        // required
                      /> */}

                      <PhoneInput
                        country={"ke"}
                        value={phone}
                        onChange={(val) => setPhone(val)}
                        inputProps={{
                          name: "phone",
                          required: true,
                          autoFocus: true,
                        }}
                        placeholder="+2547123456789"
                        disableDropdown={true}
                        regions={"africa"}
                        inputStyle={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  {/* editLoading */}
                  <button
                    type="submit"
                    className="btn bgOrange"
                    style={{ width: "100px" }}
                  >
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
          {/* )} */}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Profile;
