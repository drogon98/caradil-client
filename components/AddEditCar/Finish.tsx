import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useEditCarVerificationInProgressMutation } from "../../graphql_types/generated/graphql";
import { ButtonLoading } from "../Loading/ButtonLoading";

interface Props {
  carId: number | undefined;
}

export default function Finish(props: Props): ReactElement {
  const [editCarVerificationInProgress, { loading }] =
    useEditCarVerificationInProgressMutation();
  const router = useRouter();
  // / account / listings;

  const handleClick = async (e: any) => {
    try {
      const response = await editCarVerificationInProgress({
        variables: { carId: props.carId! },
      });

      if (response.data?.editCarVerificationInProgress.car?.id) {
        sessionStorage.removeItem("carId");
        await router.replace("/account/listings");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <div>
      <h3 className="text-success">Hooray!!!!!</h3>

      <div>
        <p>
          Your car data is now in our system. Leave it to us now to do what we
          do. We will get back to you in a short while via sms notifying you of
          the status of your listing. If everything is okay,your car will be
          published and made public. Otherwise, we will let you know why your
          car was not a fit for our marketplace.
        </p>
      </div>

      <div className="d-grid gap-2 mt-4">
        <button
          className="btn bgOrange"
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? (
            <ButtonLoading
              spinnerColor="white"
              dimensions={{ height: "24px", width: "24px" }}
            />
          ) : (
            "Manage My Listings"
          )}
        </button>
      </div>
    </div>
  );
}
