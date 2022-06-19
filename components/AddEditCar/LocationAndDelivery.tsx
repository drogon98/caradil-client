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
  CarLocationAndDeliveryInput,
  useEditCarLocationAndDeliveryMutation,
} from "../../graphql_types/generated/graphql";
import { getLongLat, PlacesAutocomplete } from "../Location/AutoComplete";
import { ToastWrapper } from "../Toast/ToastWrapper";
import { FormNextPrevButton } from "./FormNextPrevButton";
import UpdateBtn from "./ManageCar/UpdateBtn";

interface LocationAndDeliveryProps {
  value: CarLocationAndDeliveryInput;
  // setData: Dispatch<SetStateAction<string>>;
  carId: number | undefined;
  // setResponseCar: Dispatch<SetStateAction<Car | undefined>>;
  setActiveSlide?: Dispatch<SetStateAction<number>>;
  activeSlide?: number;
  setCompData: Dispatch<SetStateAction<Car | undefined>>;
  isManage?: boolean;
  isActive?: boolean;
  // verificationInProgress?: boolean;
}

interface LocationCords {
  longitude: string;
  latitude: string;
}

export const Location: FC<LocationAndDeliveryProps> = (props) => {
  const [editLocationAndDelivery, { loading }] =
    useEditCarLocationAndDeliveryMutation();
  const [values, setValues] = useState<CarLocationAndDeliveryInput>();
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [location, setLocation] = useState<string>();
  const [pickUpLocation, setPickUpLocation] = useState<string>();
  const [locationCords, setLocationCords] = useState<LocationCords>();
  const [pickUpLocationCords, setPickUpLocationCords] =
    useState<LocationCords>();

  useEffect(() => {
    if (props.value) {
      setValues({
        location: props.value.location!,
        pick_up_location: props.value.pick_up_location,

        longitude: props.value.longitude,
        latitude: props.value.latitude,
        pick_up_latitude: props.value.pick_up_latitude,
        pick_up_longitude: props.value.pick_up_longitude,

        delivery: props.value.delivery!,
      });
      setLocation(props.value.location!);
      setPickUpLocation(props.value.pick_up_location!);

      setLocationCords({
        longitude: props.value.longitude,
        latitude: props.value.latitude,
      });
      setPickUpLocationCords({
        longitude: props.value.pick_up_longitude,
        latitude: props.value.pick_up_latitude,
      });
    }
  }, [props.value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "delivery") {
      const tempDelivery = e.target.value === "true" ? true : false;
      setValues({ ...values!, delivery: tempDelivery! });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let tempMainLocCords;
      let tempPickUpLocCords;

      if (!locationCords) {
        let cords = await getLongLat(location!);
        tempMainLocCords = cords;
      } else {
        tempMainLocCords = locationCords;
      }

      if (!pickUpLocationCords) {
        let cords = await getLongLat(pickUpLocation!);
        tempPickUpLocCords = cords;
      } else {
        tempPickUpLocCords = pickUpLocationCords;
      }

      if (
        !(
          Object.keys(tempMainLocCords!).length > 0 &&
          Object.keys(tempPickUpLocCords!).length > 0
        )
      ) {
        throw new Error("Something wrong");
      }
      const payload: CarLocationAndDeliveryInput = {
        ...values!,
        location: location!,
        pick_up_location: pickUpLocation!,
        longitude: tempMainLocCords.longitude,
        latitude: tempMainLocCords.latitude,
        pick_up_latitude: tempPickUpLocCords.latitude,
        pick_up_longitude: tempPickUpLocCords.longitude,
        delivery: values!.delivery === undefined ? false : values!.delivery,
      };
      let response = await editLocationAndDelivery({
        variables: { carId: props.carId!, input: { ...payload! } },
      });
      if (response.data?.editCarLocationAndDelivery.error) {
      } else if (response.data?.editCarLocationAndDelivery.carId) {
        props.setCompData(response.data.editCarLocationAndDelivery.car!);

        if (props.isManage) {
          setShowSaveToast(true);
        } else {
          props.setActiveSlide && props.setActiveSlide(props.activeSlide! + 1);
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

    // console.log("response :>> ", response);
  };
  return (
    <div>
      {showSaveToast && (
        <ToastWrapper
          setShow={setShowSaveToast}
          show={showSaveToast}
          message={"Updated successfully!"}
          position="bottom-end"
          bg="success"
        />
      )}
      <h3>Location</h3>
      <p className="mb-2">
        This is the location of your car. If guests search for cars that match
        this location,it will appear in their search. To give you a wider search
        we suggest this location to be your nearest town or city.
      </p>
      <form onSubmit={handleSubmit} className="mb-3">
        <div>
          <label htmlFor="mileage">Where is your car located?</label>

          <PlacesAutocomplete
            setLocation={setLocation}
            location={location!}
            setLocationCords={setLocationCords}
          />
        </div>

        <div className="my-3">
          <p className="mb-1">
            Some guests may not require you to deliver the car to them. They
            prefer picking it up from its pick up point. The pickup location
            unlike car location should not be general. It should be a place like
            a hotel,petrol station,airport etc
          </p>
          <label htmlFor="mileage">Where should your car be picked?</label>

          <PlacesAutocomplete
            setLocation={setPickUpLocation}
            location={pickUpLocation!}
            setLocationCords={setPickUpLocationCords}
            geocodeEstablishments={true}
            placeholder="Enter pick-up location"
          />
        </div>

        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            value={values?.delivery ? "false" : "true"}
            id="provide-delivery"
            checked={values?.delivery}
            name="delivery"
            onChange={handleChange}
            // required
          />
          <label className="form-check-label" htmlFor="provide-delivery">
            I will deliver this car to the requested location
          </label>
        </div>

        {props.isManage ? (
          <UpdateBtn loading={loading} disabled={props.isActive} />
        ) : (
          <FormNextPrevButton
            loading={loading}
            disabled={loading}
            setActiveSlide={props.setActiveSlide!}
            activeSlide={props.activeSlide!}
          />
        )}
      </form>
    </div>
  );
};
