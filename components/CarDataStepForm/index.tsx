import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import {
  Car,
  CarTripSettingsInput,
  DocumentInput,
  FeatureInput,
  FileInput,
  useGetPrivateCarQuery,
} from "../../graphql_types/generated/graphql";
import { AddCarStart } from "../AddEditCar/AddCarStart";
import { Trips } from "../AddEditCar/Trips";
import { Categories } from "../AddEditCar/Categories";
import { Description } from "../AddEditCar/Description";
import { Distance } from "../AddEditCar/Distance";
import { Documents } from "../AddEditCar/Documents";
import { Features } from "../AddEditCar/Features";
import { Fueling } from "../AddEditCar/Fueling";
import { GeneralInfo } from "../AddEditCar/GeneralInfo";
import { Location } from "../AddEditCar/LocationAndDelivery";
import { Photos } from "../AddEditCar/Photos";
import Publish from "../AddEditCar/Publish";
import { Rates } from "../AddEditCar/Rates";
import { Loading } from "../Loading";

interface Props {
  data?: any;
  carId?: number;
  isResume?: boolean;
}

export default function CarDataStepForm(props: Props): ReactElement {
  // const [slides, setSlides] = useState(10);
  const [activeSlide, setActiveSlide] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [compData, setCompData] = useState<Car>();
  const [carId, setCarId] = useState<string>();
  const [mainLoading, setMainLoading] = useState(true);
  const router = useRouter();
  const [skip, setSkip] = useState(true);
  const [photosData, setPhotosData] = useState<FileInput[]>();
  const [documentsData, setDocumentsData] = useState<DocumentInput[]>();
  const [tripSettingsData, setTripSettingsData] =
    useState<CarTripSettingsInput>();
  const [featuresData, setFeaturesData] = useState<FeatureInput[]>();
  const [rentalServicesOffered, setRentalServicesOffered] =
    useState<("general" | "fleets" | "transfers" | "tours" | "weddings")[]>();
  const [isFleetOperator, setIsFleetOperator] = useState(false);

  const { data, loading } = useGetPrivateCarQuery({
    variables: { carId: carId! },
    skip,
    fetchPolicy: "no-cache",
  });

  // console.log("data :>> ", data);

  // console.log("carId :>> ", carId);

  useEffect(() => {
    if (router.query) {
      if (props.isResume) {
        setCarId(router.query.id as string);
        sessionStorage.removeItem("carId");
      } else {
        let tempId = sessionStorage.getItem("carId")!;

        if (tempId) {
          setCarId(tempId);
        } else {
          setMainLoading(false);
        }
      }
    }
  }, [router.query]);

  // console.log("carId :>> ", carId);

  useEffect(() => {
    if (carId) {
      setSkip(false);
    }
  }, [carId]);

  useEffect(() => {
    if (!loading && data?.getCar.car?.id) {
      setMainLoading(false);
    }
  }, [loading, data]);

  useEffect(() => {
    if (data?.getCar.car?.id) {
      setCompData({ ...data.getCar.car });
      setRentalServicesOffered(
        data.getCar.rental_services as (
          | "general"
          | "fleets"
          | "transfers"
          | "tours"
          | "weddings"
        )[]
      );
      setIsFleetOperator(
        data.getCar.rental_services.some((s) => s === "fleets")
      );
    }
  }, [data]);

  useEffect(() => {
    if (compData?.photos) {
      let tempPhotos = compData.photos?.map((photo) => {
        return {
          public_id: photo.public_id ?? "",
          secure_url: photo.secure_url ?? "",
          url: photo.secure_url ?? "",
        };
      });

      setPhotosData([...tempPhotos]);
    } else {
      setPhotosData([]);
    }
  }, [compData]);

  useEffect(() => {
    if (compData?.documents) {
      let tempDocuments = compData.documents?.map((doc) => {
        return {
          title: doc.title ?? "",
          file: {
            public_id: doc.file?.public_id ?? "",
            secure_url: doc.file?.secure_url ?? "",
            url: doc.file?.secure_url ?? "",
          },
        };
      });

      setDocumentsData([...tempDocuments]);
    } else {
      setDocumentsData([]);
    }
  }, [compData]);

  useEffect(() => {
    if (compData?.id) {
      const tempTripSettingsData = {
        advance_book_period: compData?.advance_book_period ?? 1,
        // can_rent_hourly: compData?.can_rent_hourly ?? false,
        book_and_trip_days: compData.book_and_trip_days ?? [],
        car_market_class: compData.car_market_class ?? "",
        trip_type: compData.trip_type!,
        // manual_transmission_test: compData.manual_transmission_test ?? false,
      };

      setTripSettingsData({ ...tempTripSettingsData });
    }
    // else {
    // setAvailabilityData();
    // }
  }, [compData]);

  useEffect(() => {
    if (compData?.features) {
      let tempFeatures = compData?.features?.map((ft) => {
        return { title: ft.title };
      });

      setFeaturesData([...(tempFeatures as FeatureInput[])]);
    } else {
      setFeaturesData([]);
    }
  }, [compData]);

  useEffect(() => {
    const checkProgress = (initialData: Car) => {
      if (!initialData?.name) {
        // console.log("x");
        setActiveSlide(0);
        return;
      }

      if (!initialData?.gas) {
        // console.log("o");
        setActiveSlide(1);
        return;
      }

      if (!initialData?.description) {
        // console.log("f");
        setActiveSlide(2);
        return;
      }

      if (initialData?.photos && initialData?.photos.length < 5) {
        // console.log("q");
        setActiveSlide(3);
        return;
      }

      if (initialData?.documents && initialData?.documents.length < 2) {
        // console.log("b");
        setActiveSlide(4);
        return;
      }

      if (!initialData.location) {
        // console.log("t");
        setActiveSlide(5);
        return;
      }

      if (initialData.categories?.length === 0) {
        // console.log("c");
        setActiveSlide(6);
        return;
      }

      // let bools = [true, false];

      if (
        !initialData.has_unlimited_distance
        // &&
        // initialData.distance_per_day === 0
      ) {
        // console.log("l");
        setActiveSlide(7);
        return;
      }

      if (!initialData.advance_book_period) {
        setActiveSlide(8);
        // console.log("m");
        return;
      }

      if (!initialData.amount) {
        // console.log("k");
        setActiveSlide(9);
        return;
      }

      setActiveSlide(10);
      return;
    };

    if (data?.getCar.car) {
      checkProgress(data?.getCar.car!);
    }
  }, [data]);

  useEffect(() => {
    const step = 100 / 11;
    // const step = 100 / slides;

    setProgress(step * activeSlide);
  }, [activeSlide]);

  if (mainLoading) {
    return <Loading />;
  }

  return (
    <div>
      {activeSlide !== -1 && (
        <div className="col-md-7 mx-auto mt-5">
          <div className="progress w-100">
            <div
              className="progress-bar bg-success"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* When a component updates compData, it should also update the activeSlide */}
      {/* On posting first car replace the url to edit car,with the respective id */}
      {/* Or store the id in session storage and look it up there */}
      {activeSlide === -1 && (
        <div className="col-md-7 mx-auto mt-5">
          <AddCarStart
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
          />
        </div>
      )}
      {activeSlide === 0 && (
        <div className="col-md-7 mx-auto mt-5">
          <GeneralInfo
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            setCarId={setCarId}
            carId={carId}
            isResume={props.isResume!}
            value={{
              name: compData?.name ?? "",
              reg_no: compData?.reg_no ?? "",
              id_or_passport_no: compData?.id_or_passport_no ?? "",
              make: compData?.make ?? "",
              // odometer_reading: compData?.odometer_reading ?? 0,
              end_user_type: compData?.end_user_type ?? "",
              is_gps_enabled: compData?.is_gps_enabled ?? true,
              car_count: compData?.car_count ?? 1,
            }}
            offerFleetServices={isFleetOperator}
          />
        </div>
      )}
      {activeSlide === 1 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Features
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              transmission: compData?.transmission ?? "",
              gas: compData?.gas ?? "",
              color: compData?.color ?? "",
              doors: compData?.doors ?? 0,
              bags: compData?.bags ?? 0,
              seats: compData?.seats ?? 0,
              features: featuresData ?? [],
            }}
          />
        </div>
      )}
      {activeSlide === 2 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Description
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              description: compData?.description ?? "",
            }}
          />
        </div>
      )}

      {activeSlide === 3 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Photos
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            // carVerified={compData?.verified ?? false}
            carId={carId}
            value={{
              photos: photosData!,
            }}
          />
        </div>
      )}

      {activeSlide === 4 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Documents
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            // carVerified={compData?.verified ?? false}
            isEdit={true}
            carId={carId}
            value={{
              documents: documentsData!,
            }}
          />
        </div>
      )}

      {activeSlide === 5 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Trips
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              ...tripSettingsData!,
            }}
            // manual={compData?.transmission === "manual"}
            isSelfDriven={compData?.end_user_type === "self_driven"}
          />
        </div>
      )}

      {activeSlide === 6 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Fueling
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              fuel_efficiency: compData?.fuel_efficiency ?? "",
              fuel_policy: compData?.fuel_policy ?? "",
            }}
            // manual={compData?.transmission === "manual"}
          />
        </div>
      )}

      {activeSlide === 7 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Location
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              location: compData?.location ?? "",
              delivery: compData?.delivery ?? false,
              pick_up_location: compData?.pick_up_location ?? "",
              longitude: compData?.longitude ?? 0,
              latitude: compData?.latitude ?? 0,
              pick_up_latitude: compData?.pick_up_latitude ?? 0,
              pick_up_longitude: compData?.pick_up_longitude ?? 0,
            }}
          />
        </div>
      )}
      {activeSlide === 8 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Categories
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              categories: compData?.categories ?? [],
              // luxury_and_vip_services: compData?.luxury_vip_services ?? [],
            }}
            rentalServicesOffered={rentalServicesOffered ?? []}
          />
        </div>
      )}
      {activeSlide === 9 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Distance
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              distance: compData?.distance ?? 0,
              has_unlimited_distance: compData?.has_unlimited_distance ?? false,
              // distance_per_day: compData?.distance_per_day ?? 0,
              charge_extra_distance_travelled:
                compData?.charge_extra_distance_travelled ?? false,
              // distance_per_hour: compData?.distance_per_hour ?? 0,
            }}
            // canRentHourly={compData?.can_rent_hourly!}
          />
        </div>
      )}

      {activeSlide === 10 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Rates
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            isChauffeurDriven={compData?.end_user_type === "chauffeur_driven"}
            // canRentHourly={compData?.can_rent_hourly!}
            value={{
              // daily_rate: compData?.daily_rate ?? 0,
              delivery_rate: compData?.delivery_rate ?? 0,
              amount: compData?.amount ?? 0,
              // discount: compData?.discount ?? "",
              // discount_days: compData?.discount_days ?? 0,
              // driver_daily_rate: compData?.driver_daily_rate ?? 0,
              // hourly_rate: compData?.hourly_rate ?? 0,
            }}
            compData={compData!}
          />
        </div>
      )}

      {activeSlide === 11 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Publish carId={carId} car={compData!} />
        </div>
      )}

      {/* {activeSlide === 11 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Finish carId={carId} />
        </div>
      )} */}
    </div>
  );
}
