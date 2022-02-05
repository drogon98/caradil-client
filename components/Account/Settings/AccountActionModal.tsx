import { useRouter } from "next/router";
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  SyntheticEvent,
} from "react";
import { Modal } from "react-bootstrap";
import { useUpgradeAccountMutation } from "../../../graphql_types/generated/graphql";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface Props {
  action: string;
  show: boolean;
  hide: () => void;
  setShowSuccessToast: Dispatch<SetStateAction<boolean>>;
  setToastMessage: Dispatch<SetStateAction<string>>;
}

export default function AccountActionModal(props: Props): ReactElement {
  const router = useRouter();
  const [upgradeAccount, { loading: upgradeLoading }] =
    useUpgradeAccountMutation();

  const handleAccountAction = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (props.action === "upgrade") {
        let response = await upgradeAccount();

        if (response.data?.upgradeAccount) {
          props.setToastMessage("Account upgraded successfully!");
          props.setShowSuccessToast(true);
          props.hide();
          setTimeout(async () => {
            await router.push("/login");
          }, 3000);
        } else {
        }
      } else if (props.action === "suspend") {
      } else if (props.action === "delete") {
      }
    } catch (error) {}
  };
  return (
    <Modal show={props.show} onHide={props.hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.action === "delete" && "Delete Account"}
          {props.action === "suspend" && "Suspend Account"}
          {props.action === "upgrade" && "Upgrade Account"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.action === "delete" && "Delete Account"}
        {props.action === "suspend" && "Suspend Account"}
        {props.action === "upgrade" && (
          <>
            <div>
              <p>
                You are about to upgrade your account from guest account to host
                account. With a host account you will be able to list and manage
                your own cars and earn when they are involved in trips. With a
                host account you can also book other hosts cars for your trips.
              </p>
              <small>
                <b>
                  After upgrading account you will be prompted to log in again.
                </b>
              </small>

              <div className="d-grid gap-2 mt-4">
                <button className="btn bgOrange" onClick={handleAccountAction}>
                  {upgradeLoading ? (
                    <ButtonLoading
                      spinnerColor="white"
                      dimensions={{ height: "24px", width: "24px" }}
                    />
                  ) : (
                    "Yes, Upgrade Account"
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
