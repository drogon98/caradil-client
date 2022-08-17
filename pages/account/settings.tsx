import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Alert } from "react-bootstrap";
import AccountActionModal from "../../components/Account/Settings/AccountActionModal";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import { useRole } from "../../components/hooks/useRole";
import AccountLayout from "../../components/layouts/AccountLayout";
import { Loading } from "../../components/Loading";
import { ButtonLoading } from "../../components/Loading/ButtonLoading";
import { ToastWrapper } from "../../components/Toast/ToastWrapper";
import {
  AccountPaymentInput,
  AccountSettingsInput,
  useEditAccountPaymentMutation,
  useEditAccountSettingsMutation,
  useGetAccountSettingsQuery,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";

interface SettingsProps {}

const Settings = (props: SettingsProps) => {
  const [mainLoading, setMainLoading] = useState(true);
  const [settings, setSettings] = useState<AccountSettingsInput>();
  const [paymentSettings, setPaymentSettings] = useState<AccountPaymentInput>();
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const { data, loading: fetchingSettings } = useGetAccountSettingsQuery();
  const [updateAccountSettings, { loading }] = useEditAccountSettingsMutation();
  const [updateAccountPayment, { loading: loadingPayment }] =
    useEditAccountPaymentMutation();
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [showAccountActionModal, setShowAccountActionModal] = useState(false);
  const [accountAction, setAccountAction] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();
  const [showUpgradeAlert, setShowUpgradeAlert] = useState(false);

  useLayoutEffect(() => {
    const query = router.asPath.split("?")[1];
    const params = new URLSearchParams(query);
    if (params.has("upgrade")) {
      setShowUpgradeAlert(true);
    } else {
      setShowUpgradeAlert(false);
    }
  }, [router]);

  useEffect(() => {
    if (data?.getAccountSettings.accountSettings && !fetchingSettings) {
      setSettings({
        // account_suspended:
        //   data.getAccountSettings.accountSettings.account_suspended!,
        offer_bulk_hire:
          data.getAccountSettings.accountSettings.offer_bulk_hire!,

        receive_marketing_emails:
          data.getAccountSettings.accountSettings.receive_marketing_emails!,
      });
      setPaymentSettings({
        payment_channel:
          data.getAccountSettings.accountSettings.payment_channel!,
        payment_channel_data: {
          subject:
            data.getAccountSettings.accountSettings.payment_channel_data
              ?.subject!,
        },
      });
      setMainLoading(false);
    }
  }, [data, fetchingSettings]);

  // useEffect(() => {
  //   if (router.query) {
  //     console.log("router.query.upgrade :>> ", router.query.upgrade);
  //     if (router.query.upgrade && upgradeAccRef.current) {
  //       console.log("Helloo :>> ");
  //       upgradeAccRef.current.scrollIntoView({
  //         block: "center",
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  // }, [router.query]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let payload;
    if (
      e.target.name === "offer_bulk_hire" ||
      e.target.name === "receive_marketing_emails"
    ) {
      setSettings({
        ...settings!,
        [e.target.name]: e.target.value === "on" ? true : false,
      });
      payload = {
        ...settings,
        [e.target.name]: e.target.value === "on" ? true : false,
      };
    } else if (e.target.name === "payment_channel") {
      setPaymentSettings({
        ...paymentSettings!,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "payment_subject") {
      setPaymentSettings({
        ...paymentSettings!,
        payment_channel_data: {
          ...paymentSettings?.payment_channel_data,
          subject: e.target.value,
        },
      });
    }

    if (
      e.target.name === "offer_bulk_hire" ||
      e.target.name === "receive_marketing_emails"
    ) {
      let response = await updateAccountSettings({
        variables: { input: payload as AccountSettingsInput },
      });

      if (response.data?.editAccountSettings) {
        setToastMessage("Settings updated!");
        setShowSaveToast(true);
      }
    }
  };

  const handleAccountActions = (
    e: MouseEvent<HTMLButtonElement>,
    action: string
  ) => {
    e.preventDefault();
    setAccountAction(action);
    setShowAccountActionModal(true);
  };

  const handlePaymentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await updateAccountPayment({
        variables: { input: paymentSettings! },
      });

      if (response.data?.editAccountPayment) {
        setToastMessage("Payment settings updated!");
        setShowSaveToast(true);
      } else {
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // console.log("settings :>> ", settings);

  return (
    <>
      <CustomHead title="Account - Settings" />
      <AuthWrapper>
        <AccountLayout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="row m-0">
              {showAccountActionModal && (
                <AccountActionModal
                  show={showAccountActionModal}
                  hide={() => setShowAccountActionModal(false)}
                  action={accountAction}
                  setShowSuccessToast={setShowSaveToast}
                  setToastMessage={setToastMessage}
                />
              )}
              {showSaveToast && (
                <ToastWrapper
                  setShow={setShowSaveToast}
                  show={showSaveToast}
                  message={toastMessage}
                  position="bottom-end"
                  bg="success"
                />
              )}
              {/* {showSuccessToast && (
                <ToastWrapper
                  setShow={setShowSuccessToast}
                  show={showSuccessToast}
                  message={toastMessage}
                  position="bottom-end"
                />
              )} */}
              <div className="col-lg-7 my-4 mb-5 mx-auto">
                <h1 style={{ textDecoration: "underline" }}>Manage Account</h1>

                <h3>Settings</h3>
                <hr />

                {showUpgradeAlert ? (
                  <>
                    <Alert
                      variant="info"
                      onClose={() => setShowUpgradeAlert(false)}
                      // dismissible
                    >
                      <small>
                        You are about to upgrade from a guest account to a host
                        account. With a host account you will be able to list
                        cars. To upgrade click the Upgrade Account button below.
                      </small>
                    </Alert>

                    <br />
                  </>
                ) : null}

                <h6>General Settings</h6>
                <div className="mb-5">
                  <div className="settings-row d-flex align-items-start justify-content-between">
                    <div className="d-flex flex-column">
                      <p>I offer bulk car hire.</p>
                      <div>
                        <small>
                          This means that a guest can rent out more than one car
                          at once from you.{" "}
                        </small>
                      </div>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="offerBulkHire"
                        name="offer_bulk_hire"
                        onChange={handleChange}
                        checked={settings?.offer_bulk_hire ?? false}
                        value={settings?.offer_bulk_hire ? "off" : "on"}
                        disabled={loading}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="offerBulkHire"
                        hidden
                      />
                    </div>
                  </div>
                </div>
                <h6>Notification Settings</h6>
                <div className="mb-5">
                  <div className="settings-row d-flex align-items-start justify-content-between">
                    <div className="d-flex flex-column">
                      <p>Receive marketing emails from caradil</p>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="marketingEmails"
                        name="receive_marketing_emails"
                        onChange={handleChange}
                        checked={settings?.receive_marketing_emails ?? false}
                        value={
                          settings?.receive_marketing_emails ? "off" : "on"
                        }
                        disabled={loading}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="marketingEmails"
                        hidden
                      />
                    </div>
                  </div>
                </div>
                {role === 2 && (
                  <>
                    <h6>Payment Settings</h6>
                    <div className="mb-5">
                      {/* <p>Choose payment channel</p> */}
                      <form onSubmit={handlePaymentSubmit}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="payment_channel"
                            id="mpesa"
                            value="mpesa"
                            checked={
                              paymentSettings?.payment_channel === "mpesa"
                            }
                            required
                            onChange={handleChange}
                            disabled
                          />
                          <label className="form-check-label" htmlFor="mpesa">
                            Mpesa
                          </label>
                        </div>
                        <div className="row m-0 p-0">
                          <div className="p-0">
                            <small>
                              Enter a valid mpesa activated phone number to
                              receive payment.
                            </small>
                          </div>
                          <div className="col-6 p-0">
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Phone Number"
                                required
                                name="payment_subject"
                                onChange={handleChange}
                                value={
                                  paymentSettings?.payment_channel_data
                                    ?.subject ?? ""
                                }
                                disabled
                              />
                              <button
                                className="btn bgOrange"
                                type="submit"
                                id="button-addon2"
                                disabled
                                // disabled={loadingPayment}
                              >
                                {loadingPayment ? (
                                  <ButtonLoading
                                    spinnerColor="white"
                                    dimensions={{
                                      height: "18px",
                                      width: "18px",
                                    }}
                                  />
                                ) : (
                                  "Save"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      {/* <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="payment_channel"
                          id="bankAccount"
                          checked={paymentSettings?.payment_channel === "bank"}
                          value="bank"
                          onChange={handleChange}
                      
                        />
                        <label
                          className="form-check-label"
                          htmlFor="bankAccount"
                        >
                          Bank Account
                        </label>
                      </div> */}
                    </div>
                  </>
                )}
                {/* <div style={{ height: "2000px" }} /> */}

                {role === 1 && (
                  <>
                    <h3>Account</h3>
                    <hr />
                    <div>
                      {role === 1 && (
                        <div className="mb-5 settings-row d-flex align-items-start justify-content-between">
                          <div className="d-flex flex-column">
                            <h6>Upgrade Account</h6>
                            <div className="pr-3">
                              <small>
                                To list a car you need to have a host account.
                                There is no need to create two different
                                accounts. You can upgrade from a guest account
                                to a host account.
                              </small>
                            </div>
                          </div>
                          <button
                            className="btn account-action-btn btn-outline-primary"
                            onClick={(e) => handleAccountActions(e, "upgrade")}
                          >
                            Upgrade Account
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* <div className="mt-5 settings-row d-flex align-items-start justify-content-between">
                  <div className="d-flex flex-column">
                    <h6>Delete Account</h6>
                    <div className="pr-3">
                      <small>
                        You may want to delete your account permanently from our
                        system. This takes around 24hrs to wipe all your data.
                        {role === 2 ? (
                          <b>
                            Note: You cannot delete account with an active trip
                            or booking.
                          </b>
                        ) : (
                          <b>
                            Note: You cannot suspend account with an active
                            trip.
                          </b>
                        )}
                      </small>
                    </div>
                  </div>
                  <button
                    className="btn account-action-btn btn-outline-danger"
                    // onClick={(e) => handleAccountActions(e, "delete")}
                  >
                    Delete Account
                  </button>
                </div> */}
              </div>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Settings;
