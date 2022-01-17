import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  Car,
  CarDescriptionInput,
  CarDocumentsInput,
  CarSecondaryFeaturesInput,
  CarGeneralInfoInput,
  CarPhotosInput,
  DocumentInput,
  FeatureInput,
  FileInput,
  CarPrimaryFeaturesInput,
  CarRatesInput,
  CarAvailabilityInput,
  CarDistanceInput,
  CarDriverAndDeliveryInput,
  useEditCarVerificationInProgressMutation,
} from "../../graphql_types/generated/graphql";
import { Expandable } from "../Expandable";
import { Availability } from "./Availability";
import { Description } from "./Description";
import { Documents } from "./Documents";
import { SecondaryFeatures } from "./SecondaryFeatures";
import { GeneralInfo } from "./GeneralInfo";
import { Location } from "./Location";
import { Photos } from "./Photos";
import { PrimaryFeatures } from "./PrimaryFeatures";
import { Rates } from "./Rates";
import { Distance } from "./Distance";
import { useRouter } from "next/router";
import { Categories } from "./Categories";
import { LuxuryAndVip } from "./LuxuryAndVipServices";
import DriverAndDelivery from "./DriverAndDelivery";
import { Modal } from "react-bootstrap";
import { ButtonLoading } from "../Loading/ButtonLoading";

interface FormWrapperProps {
  isEdit?: boolean | undefined;
  carId?: number;
  car?: Car | null;
}

/**
 * @author @CodeYourEmpire
 * @function @FormWrapper
 **/

export const FormWrapper: FC<FormWrapperProps> = (props) => {
  const [carId, setCarId] = useState<number | undefined>();
  const [responseCar, setResponseCar] = useState<Car>();
  const [requestVerification, setRequestVerification] = useState(false);
  const requestVerificationBtnRef = useRef<HTMLButtonElement>(null);
  const [showVerificationRequestModal, setShowVerificationRequestModal] =
    useState(false);
  const [
    verificationInProgressEditSuccess,
    setVerificationInProgressEditSuccess,
  ] = useState(false);
  // const [showVerificationStart, setVerificationStart] = useState(false);
  const [carGeneralInfo, setCarGeneralInfo] = useState<CarGeneralInfoInput>({
    name: "",
    reg_no: "",
    make: "",
    odometer_reading: "",
  });
  const [primaryFeatures, setPrimaryFeatures] =
    useState<CarPrimaryFeaturesInput>({
      gas: "",
      color: "",
      transmission: "",
      doors: 0,
      seats: 0,
    });
  const [description, setDescription] = useState<CarDescriptionInput>({
    description: "",
  });
  const [secondaryFeatures, setSecondaryFeatures] =
    useState<CarSecondaryFeaturesInput>({
      features: [],
    });
  const [photos, setPhotos] = useState<CarPhotosInput>({ photos: [] });
  const [categories, setCategories] = useState<string[]>();
  const [luxuryAndVipServices, setLuxuryAndVipServices] = useState<string[]>();
  const [showLuxuryAndVipServices, setShowLuxuryAndVipServices] =
    useState(false);
  const [documents, setDocuments] = useState<CarDocumentsInput>({
    documents: [],
  });
  const [rates, setRates] = useState<CarRatesInput>({
    daily_rate: 0,
    discount: "",
    discount_days: 0,
    extra_distance_rate: 0,
    delivery_rate: 0,
    driver_daily_rate: 0,
    hourly_rate: 0,
  });
  const [location, setLocation] = useState<string>("");
  const [distance, setDistance] = useState<CarDistanceInput>({
    distance_per_day: 0,
    has_unlimited_distance: false,
  });
  const [driverAndDelivery, setDriverAndDelivery] =
    useState<CarDriverAndDeliveryInput>({
      driver_mode: 3,
      manual_transmission_test: false,
      delivery: false,
    });
  const [availabilityData, setAvailabilityData] =
    useState<CarAvailabilityInput>({
      available: false,
      custom_availability: false,
      custom_availability_data: {},
      car_has_other_use: false,
      advance_book_period: "",
    });

  // console.log("props.car :>> ", props.car);

  const [
    editVerificationInProgress,
    { loading: verificationinProgressLoading },
  ] = useEditCarVerificationInProgressMutation();

  const router = useRouter();

  useEffect(() => {
    router.beforePopState((cb): boolean => {
      // Handles back and forward arrow click
      // console.log("cb :>> ", cb);
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  useEffect(() => {
    // Handles page refresh
    const handlePageUnload = (e: BeforeUnloadEvent) => {
      console.log("Helloo");
    };
    window.addEventListener("beforeunload", handlePageUnload);

    return () => {
      window.removeEventListener("beforeunload", handlePageUnload);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: any, { shallow }: any) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (props.isEdit) {
      setCarId(props.carId);
    }
  }, [props.isEdit]);

  useEffect(() => {
    const checkIfVerificationReady = () => {
      if (!responseCar?.name) {
        console.log("x");
        return false;
      }

      if (!responseCar?.gas) {
        console.log("o");
        return false;
      }

      if (responseCar?.description?.length === 0) {
        console.log("f");
        return false;
      }

      if (responseCar?.photos?.length === 0) {
        console.log("q");
        return false;
      }

      if (responseCar?.documents && responseCar?.documents.length < 2) {
        console.log("b");
        return false;
      }

      if (responseCar?.features?.length === 0) {
        console.log("a");
        return false;
      }

      if (responseCar.categories?.length === 0) {
        console.log("c");
        return false;
      }

      if (!responseCar.location) {
        console.log("t");
        return false;
      }

      let bools = [true, false];

      if (
        !bools.some((b) => b === responseCar.has_unlimited_distance) ||
        (responseCar.distance_per_day && responseCar.distance_per_day < 0)
      ) {
        console.log("l");
        return false;
      }

      if (
        !responseCar.driver_mode ||
        !bools.some((b) => b === responseCar.delivery)
        // (
        //   !responseCar.delivery === false && !responseCar.delivery === true
        // )
      ) {
        console.log("j");
        return false;
      }

      if (!responseCar.daily_rate) {
        console.log("k");
        return false;
      }

      if (
        !bools.some((b) => b === responseCar.car_has_other_use) ||
        // (
        //   !responseCar.car_has_other_use === true &&
        //     !responseCar.car_has_other_use === true
        // )

        !responseCar.advance_book_period ||
        !bools.some((b) => b === responseCar.available)
        // (
        //   !responseCar.available === true && !responseCar.available === false
        // )
      ) {
        console.log("m");
        return false;
      }

      return true;
    };

    if (responseCar?.id) {
      console.log(
        "checkIfVerificationReady() :>> ",
        checkIfVerificationReady()
      );
      if (checkIfVerificationReady()) {
        if (!responseCar.verified) {
          if (requestVerificationBtnRef.current) {
            requestVerificationBtnRef.current.click();
          }
        }
      }
    }
  }, [responseCar]);

  useEffect(() => {
    if (props.car) {
      setCarGeneralInfo({
        name: props.car.name!,
        reg_no: props.car.reg_no!,
        make: props.car.make!,
        odometer_reading: props.car.odometer_reading!,
      });
      setPrimaryFeatures({
        gas: props.car.gas ?? "",
        color: props.car.color ?? "",
        transmission: props.car.transmission!,
        doors: props.car.doors ?? 0,
        seats: props.car.seats ?? 0,
      });
      setDescription({ description: props.car.description! });
      setSecondaryFeatures(() => {
        let tempFeatures = props.car?.features?.map((ft) => {
          return { title: ft.title };
        });
        return { features: tempFeatures as FeatureInput[] };
      });

      setCategories(() => {
        const hasLuxuriesAndVip = props.car?.categories?.find(
          (cat) => cat === "Luxury & Vip"
        );
        if (hasLuxuriesAndVip) {
          setShowLuxuryAndVipServices(true);
        }
        return props.car?.categories ?? [];
      });

      setLuxuryAndVipServices(props.car.luxury_vip_services ?? []);

      setPhotos(() => {
        let tempPhotos = props.car?.photos?.map((photo) => {
          return {
            public_id: photo.public_id ?? "",
            secure_url: photo.secure_url ?? "",
            url: photo.secure_url ?? "",
          };
        });
        return { photos: tempPhotos as FileInput[] };
      });
      setDocuments(() => {
        let tempDocuments = props.car?.documents?.map((doc) => {
          return {
            title: doc.title ?? "",
            file: {
              public_id: doc.file?.public_id ?? "",
              secure_url: doc.file?.secure_url ?? "",
              url: doc.file?.secure_url ?? "",
            },
          };
        });
        return { documents: tempDocuments as DocumentInput[] };
      });
      setRates({
        daily_rate: props.car.daily_rate ?? 0,
        discount: props.car.discount ?? "",
        discount_days: props.car.discount_days ?? 0,
        extra_distance_rate: props.car.extra_distance_rate ?? 0,
        delivery_rate: props.car.delivery_rate ?? 0,
        driver_daily_rate: props.car.driver_daily_rate ?? 0,
        hourly_rate: props.car.hourly_rate ?? 0,
      });

      setAvailabilityData(() => {
        const tempCustomAvailabilityData = {
          startDate: props.car?.custom_availability_data?.startDate,
          startTime: props.car?.custom_availability_data?.startTime,
          endDate: props.car?.custom_availability_data?.endDate,
          endTime: props.car?.custom_availability_data?.endTime,
        };
        return {
          car_has_other_use: props.car?.car_has_other_use ?? false,
          advance_book_period: props.car?.advance_book_period ?? "",
          available: props.car?.available ?? false,
          custom_availability: props.car?.custom_availability ?? false,
          custom_availability_data: tempCustomAvailabilityData,
        };
      });
      setLocation(props.car.location ?? "");
      setDistance({
        distance_per_day: props.car.distance_per_day ?? 0,
        has_unlimited_distance: props.car.has_unlimited_distance ?? false,
      });
      setDriverAndDelivery({
        delivery: props.car.delivery ?? false,
        manual_transmission_test: props.car.manual_transmission_test ?? false,
        driver_mode: props.car.driver_mode!,
      });
    }
  }, [props.car]);

  useEffect(() => {
    const hasLuxuriesAndVip = categories?.find((cat) => cat === "Luxury & Vip");
    if (hasLuxuriesAndVip) {
      setShowLuxuryAndVipServices(true);
    } else {
      setShowLuxuryAndVipServices(false);
    }
  }, [categories]);

  const handleEditVerificationInProgress = async (
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    try {
      const response = await editVerificationInProgress({
        variables: { carId: carId! },
      });

      if (response.data?.editCarVerificationInProgress) {
        setVerificationInProgressEditSuccess(true);
        setTimeout(async () => {
          await router.push("/account/listings");
        }, 8000);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // console.log("carId :>> ", carId);

  // A refresh will cause data loss
  return (
    <>
      {showVerificationRequestModal && (
        <Modal
          show={showVerificationRequestModal}
          onHide={() => setShowVerificationRequestModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Request Verification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <LoginForm isModal close={handleClose} /> */}
            {verificationInProgressEditSuccess ? (
              <>
                <h3 className="text-success">Good Luck!</h3>
                <p>The initiate verification was done successfully.</p>
                <b>You will be redirected in 5 seconds...</b>
              </>
            ) : (
              <>
                <p className="mb-3">
                  You have added the required information to list your car. Now
                  we need to do verification to ensure this car meets all the
                  requirements. This takes around 5 minutes. After verification
                  we will reach back to you with the results and the steps to
                  take next. Click the button below to initiate the
                  verification.
                </p>
                <div className="d-grid gap-2">
                  <button
                    className="btn bgOrange"
                    disabled={verificationinProgressLoading}
                    onClick={handleEditVerificationInProgress}
                  >
                    {verificationinProgressLoading ? (
                      <ButtonLoading
                        spinnerColor="white"
                        dimensions={{ height: "24px", width: "24px" }}
                      />
                    ) : (
                      "Initiate Verification"
                    )}
                  </button>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
      )}
      <button
        ref={requestVerificationBtnRef}
        hidden
        onClick={() => setShowVerificationRequestModal(true)}
      />
      <Expandable header="General Info">
        <GeneralInfo
          value={carGeneralInfo}
          setData={setCarGeneralInfo}
          setCarId={setCarId}
          isEdit={props.isEdit ?? false}
          carId={carId}
          setResponseCar={setResponseCar}
        />
      </Expandable>

      <Expandable header="Primary Features">
        <PrimaryFeatures
          value={primaryFeatures}
          carId={carId}
          isEdit={props.isEdit ?? false}
          setData={setPrimaryFeatures}
          setResponseCar={setResponseCar}
        />
      </Expandable>

      <Expandable header="Description">
        <Description
          value={description}
          carId={carId}
          // isEdit={props.isEdit ?? false}
          setData={setDescription}
          setResponseCar={setResponseCar}
        />
      </Expandable>

      <Expandable header="Photos">
        <Photos
          value={photos}
          carId={carId}
          setData={setPhotos}
          isEdit={props.isEdit!}
          carVerified={props.car?.verified!}
          setResponseCar={setResponseCar}
        />
      </Expandable>
      <Expandable header="Documents">
        <Documents
          value={documents}
          carId={carId}
          setData={setDocuments}
          isEdit={props.isEdit ?? false}
          carVerified={props.car?.verified!}
          setResponseCar={setResponseCar}
        />
      </Expandable>
      {/* {props.isEdit && props.car?.verified && ( */}
      <>
        <Expandable header="Secondary Features">
          <SecondaryFeatures
            value={secondaryFeatures}
            carId={carId}
            setData={setSecondaryFeatures}
            setResponseCar={setResponseCar}
          />
        </Expandable>

        <Expandable header="Categories">
          <Categories
            value={categories!}
            carId={carId}
            setData={setCategories}
            setResponseCar={setResponseCar}
          />
        </Expandable>

        {showLuxuryAndVipServices && (
          <Expandable header="VIP & Luxury Services">
            <LuxuryAndVip
              value={luxuryAndVipServices!}
              carId={carId}
              setData={setLuxuryAndVipServices}
              setResponseCar={setResponseCar}
            />
          </Expandable>
        )}

        <Expandable header="Location">
          <Location
            value={location}
            carId={carId}
            setData={setLocation}
            setResponseCar={setResponseCar}
          />
        </Expandable>

        <Expandable header="Distance">
          <Distance
            value={distance}
            carId={carId}
            setData={setDistance}
            setResponseCar={setResponseCar}
          />
        </Expandable>

        <Expandable header="Driver And Delivery">
          <DriverAndDelivery
            value={driverAndDelivery}
            carId={carId}
            setData={setDriverAndDelivery}
            manual={props.car?.transmission === "manual"}
            setResponseCar={setResponseCar}
          />
        </Expandable>

        <Expandable header="Rates">
          <Rates
            value={rates}
            carId={carId}
            setData={setRates}
            car={responseCar!}
            setResponseCar={setResponseCar}
          />
        </Expandable>

        <Expandable header="Availability">
          <Availability
            value={availabilityData}
            carId={carId}
            setData={setAvailabilityData}
            booked={props.car?.booked ?? false}
            setResponseCar={setResponseCar}
          />
        </Expandable>
      </>
      {/* )} */}
    </>
  );
};
