import React, { ReactElement, useEffect, useState } from "react";
import {
  Car,
  CarAvailabilityInput,
  DocumentInput,
  FeatureInput,
  FileInput,
  useGetPrivateCarQuery,
} from "../../graphql_types/generated/graphql";
import { Availability } from "../AddEditCar/Availability";
import { Categories } from "../AddEditCar/Categories";
import { Description } from "../AddEditCar/Description";
import { Distance } from "../AddEditCar/Distance";
import { Documents } from "../AddEditCar/Documents";
import { GeneralInfo } from "../AddEditCar/GeneralInfo";
import { Location } from "../AddEditCar/LocationAndDelivery";
import { Photos } from "../AddEditCar/Photos";
import { Features } from "../AddEditCar/Features";
import { Rates } from "../AddEditCar/Rates";
import { useRouter } from "next/router";
import { Loading } from "../Loading";
import Finish from "../AddEditCar/Finish";
import { BsArrowLeft } from "react-icons/bs";

interface Props {
  data?: any;
  carId?: number;
  isResume?: boolean;
}

export default function CarDataStepForm(props: Props): ReactElement {
  const [slides, setSlides] = useState(10);
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [compData, setCompData] = useState<Car>();
  const [carId, setCarId] = useState<number>();
  const [mainLoading, setMainLoading] = useState(true);
  const router = useRouter();
  const [skip, setSkip] = useState(true);
  const [photosData, setPhotosData] = useState<FileInput[]>();
  const [documentsData, setDocumentsData] = useState<DocumentInput[]>();
  const [availabilityData, setAvailabilityData] =
    useState<CarAvailabilityInput>();
  const [featuresData, setFeaturesData] = useState<FeatureInput[]>();

  const { data, loading } = useGetPrivateCarQuery({
    variables: { carId: carId! },
    skip,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (router.query) {
      if (props.isResume) {
        setCarId(parseInt(router.query.id as string, 10));
        sessionStorage.removeItem("carId");
      } else {
        let tempId = parseInt(sessionStorage.getItem("carId")!, 10);

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
      const tempCustomAvailabilityData = {
        startDate: compData?.custom_availability_data?.startDate,
        startTime: compData?.custom_availability_data?.startTime,
        endDate: compData?.custom_availability_data?.endDate,
        endTime: compData?.custom_availability_data?.endTime,
      };
      const tempAvailableData = {
        car_has_other_use: compData?.car_has_other_use ?? false,
        advance_book_period: compData?.advance_book_period ?? "",
        available: compData?.available ?? false,
        custom_availability: compData?.custom_availability ?? false,
        custom_availability_data: tempCustomAvailabilityData,
        driver_mode: compData.driver_mode ?? 3,
        manual_transmission_test: compData.manual_transmission_test ?? true,
      };

      setAvailabilityData({ ...tempAvailableData });
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
        console.log("x");
        setActiveSlide(0);
        return;
      }

      if (!initialData?.gas) {
        console.log("o");
        setActiveSlide(1);
        return;
      }

      if (!initialData?.description) {
        console.log("f");
        setActiveSlide(2);
        return;
      }

      if (initialData?.photos && initialData?.photos.length < 5) {
        console.log("q");
        setActiveSlide(3);
        return;
      }

      if (initialData?.documents && initialData?.documents.length < 2) {
        console.log("b");
        setActiveSlide(4);
        return;
      }

      if (!initialData.location) {
        console.log("t");
        setActiveSlide(5);
        return;
      }

      if (initialData.categories?.length === 0) {
        console.log("c");
        setActiveSlide(6);
        return;
      }

      let bools = [true, false];

      if (
        !initialData.has_unlimited_distance &&
        initialData.distance_per_day === 0
      ) {
        console.log("l");
        setActiveSlide(7);
        return;
      }

      if (!initialData.advance_book_period) {
        setActiveSlide(8);
        console.log("m");
        return;
      }

      if (!initialData.daily_rate) {
        console.log("k");
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
    const step = 100 / slides;

    setProgress(step * activeSlide);
  }, [activeSlide]);

  if (mainLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <button
          className="btn m-0 p-0 pl-2 mb-3"
          onClick={() => {
            router.replace("/account/listings");
          }}
        >
          <BsArrowLeft size={"30px"} />
        </button>
      </div>

      <div className="col-md-10 mx-auto">
        <div className="progress w-100">
          <div
            className="progress-bar bg-success"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* When a component updates compData, it should also update the activeSlide */}
      {/* On posting first car replace the url to edit car,with the respective id */}
      {/* Or store the id in session storage and look it up there */}
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
              make: compData?.make ?? "",
              odometer_reading: compData?.odometer_reading ?? 0,
              is_gps_enabled: compData?.is_gps_enabled ?? true,
            }}
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
            carVerified={compData?.verified ?? false}
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
            carVerified={compData?.verified ?? false}
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
          <Location
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              location: compData?.location ?? "",
              delivery: compData?.delivery ?? false,
            }}
          />
        </div>
      )}
      {activeSlide === 6 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Categories
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              categories: compData?.categories ?? [],
              luxury_and_vip_services: compData?.luxury_vip_services ?? [],
            }}
          />
        </div>
      )}
      {activeSlide === 7 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Distance
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              has_unlimited_distance: compData?.has_unlimited_distance ?? false,
              distance_per_day: compData?.distance_per_day ?? 0,
              charge_extra_distance_travelled:
                compData?.charge_extra_distance_travelled ?? false,
            }}
          />
        </div>
      )}
      {activeSlide === 8 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Availability
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              ...availabilityData!,
            }}
            manual={compData?.transmission === "manual"}
          />
        </div>
      )}

      {activeSlide === 9 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Rates
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            value={{
              daily_rate: compData?.daily_rate ?? 0,
              delivery_rate: compData?.delivery_rate ?? 0,
              discount: compData?.discount ?? "",
              discount_days: compData?.discount_days ?? 0,
              driver_daily_rate: compData?.driver_daily_rate ?? 0,
              hourly_rate: compData?.hourly_rate ?? 0,
            }}
            compData={compData!}
          />
        </div>
      )}

      {activeSlide === 10 && (
        <div className="col-md-7 col-lg-6 mx-auto mt-5">
          <Finish carId={carId} />
        </div>
      )}
    </div>
  );
}
