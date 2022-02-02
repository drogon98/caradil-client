import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import slugify from "slugify";
import {
  Car,
  useEditCarPublishedMutation,
} from "../../graphql_types/generated/graphql";
import { ButtonLoading } from "../Loading/ButtonLoading";

interface Props {
  carId: number | undefined;
  car: Car;
}

export default function Publish(props: Props): ReactElement {
  const [editCarPublished, { loading }] = useEditCarPublishedMutation();
  const router = useRouter();

  const handleClick = async (e: any) => {
    try {
      const response = await editCarPublished({
        variables: { carId: props.carId! },
      });
      if (response.data?.editCarPublished) {
        sessionStorage.removeItem("carId");
        await router.replace("/account/listings");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <div>
        <p>
          Your car is now ready to go public. You can check how it will look
          like{" "}
          <Link
            href={{
              pathname: `/[slug]/[id]?is_car_preview=true`,
              query: {
                slug: slugify(props.car.name!),
                id: props.carId,
              },
            }}
            as={`/${slugify(props.car.name!)}/${
              props.carId
            }?is_car_preview=true`}
          >
            <a target={"_blank"} className="colorOrange">
              here
            </a>
          </Link>{" "}
          when its public. Once okay with its looks, publish it.
        </p>
      </div>

      <div className="d-grid gap-2 mt-4">
        <button
          className="btn bgOrange"
          // disabled={loading}
          onClick={handleClick}
        >
          {loading ? (
            <ButtonLoading
              spinnerColor="white"
              dimensions={{ height: "24px", width: "24px" }}
            />
          ) : (
            "Publish"
          )}
        </button>
      </div>
    </div>
  );
}
