import React, { ChangeEvent, useEffect, useState } from "react";
import { AuthWrapper } from "../../components/AuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import { useRole } from "../../components/hooks/useRole";
import AccountLayout from "../../components/layouts/AccountLayout";
import { Loading } from "../../components/Loading";
import { ToastWrapper } from "../../components/Toast/ToastWrapper";
import {
  AccountSettings,
  AccountSettingsInput,
  useEditAccountSettingsMutation,
  useGetAccountSettingsQuery,
} from "../../graphql_types/generated/graphql";
import { useAppSelector } from "../../redux/hooks";

interface SettingsProps {}

const Settings = (props: SettingsProps) => {
  const [mainLoading, setMainLoading] = useState(true);
  const [settings, setSettings] = useState<AccountSettings>();
  const token = useAppSelector((state) => state.auth._id);
  const role = useRole(token);
  const { data, loading: fetchingSettings } = useGetAccountSettingsQuery();
  const [updateAccountSettings, { loading }] = useEditAccountSettingsMutation();
  const [showSaveToast, setShowSaveToast] = useState(false);

  useEffect(() => {
    if (data?.getAccountSettings.accountSettings && !fetchingSettings) {
      setSettings({
        account_suspended:
          data.getAccountSettings.accountSettings.account_suspended!,
        offer_bulk_hire:
          data.getAccountSettings.accountSettings.offer_bulk_hire!,
        payment_channel:
          data.getAccountSettings.accountSettings.payment_channel!,
        receive_marketing_emails:
          data.getAccountSettings.accountSettings.receive_marketing_emails!,
      });
      setMainLoading(false);
    }
  }, [data, fetchingSettings]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("e.target.value :>> ", e.target.value);
    let payload;
    if (
      e.target.name === "offer_bulk_hire" ||
      e.target.name === "receive_marketing_emails"
    ) {
      setSettings({
        ...settings,
        [e.target.name]: e.target.value === "on" ? true : false,
      });
      payload = {
        ...settings,
        [e.target.name]: e.target.value === "on" ? true : false,
      };
    }

    let response = await updateAccountSettings({
      variables: { input: payload as AccountSettingsInput },
    });

    if (response.data?.editAccountSettings) {
      setShowSaveToast(true);
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
              {showSaveToast && (
                <ToastWrapper
                  setShow={setShowSaveToast}
                  show={showSaveToast}
                  message={"Settings updated!"}
                  position="bottom-end"
                />
              )}
              <div className="col-lg-7 my-4 mb-5 mx-auto">
                <h1 style={{ textDecoration: "underline" }}>Manage Account</h1>

                <h3>Settings</h3>
                <hr />
                <h6>General Settings</h6>
                <div className="mb-5">
                  <div className="settings-column d-flex align-items-start justify-content-between">
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
                  <div className="settings-column d-flex align-items-start justify-content-between">
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
                <h6>Payment Settings</h6>
                <div className="mb-5">
                  <p>Choose payment channel</p>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="mpesa"
                      value="option1"
                      checked
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="mpesa">
                      Mpesa
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="bankAccount"
                      value="option2"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="bankAccount">
                      Bank Account
                    </label>
                  </div>
                </div>

                <h3>Account</h3>
                <hr />
                {role === 1 && (
                  <div className="mb-5 settings-column d-flex align-items-start justify-content-between">
                    <div className="d-flex flex-column">
                      <h6>Upgrade Account</h6>
                      <div className="pr-3">
                        <small>
                          To list a car you need to have a host account. There
                          is no need to create two different accounts. You can
                          upgrade from a guest account to a host account.
                        </small>
                      </div>
                    </div>
                    <button className="btn account-action-btn btn-outline-primary">
                      Upgrade Account
                    </button>
                  </div>
                )}

                <div className="settings-column d-flex align-items-start justify-content-between">
                  <div className="d-flex flex-column">
                    <h6>Suspend Account</h6>
                    <div className="pr-3">
                      <small>
                        {role === 2 ? (
                          <>
                            {" "}
                            Do you want to take a break while retaining your
                            account. Suspending it will make all your data{" "}
                            <b>ie profile and listings</b>, hidden from the
                            public. You can make it public later.{" "}
                            <b>
                              Note: You cannot suspend account with an active
                              trip or booking.
                            </b>
                          </>
                        ) : (
                          <>
                            {" "}
                            Do you want to take a break while retaining your
                            account. Suspending it will make all your profile
                            data hidden from the public. You can make it public
                            later.
                            <b>
                              Note: You cannot suspend account with an active
                              trip.
                            </b>
                          </>
                        )}
                      </small>
                    </div>
                  </div>
                  <button className="btn account-action-btn btn-outline-secondary">
                    Suspend Account
                  </button>
                </div>

                <div className="mt-5 settings-column d-flex align-items-start justify-content-between">
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
                  <button className="btn account-action-btn btn-outline-danger">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </AccountLayout>
      </AuthWrapper>
    </>
  );
};

export default Settings;
