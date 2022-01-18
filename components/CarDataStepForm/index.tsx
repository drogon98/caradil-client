import React, { ReactElement, useEffect, useState } from "react";
import {
  Car,
  DocumentInput,
  FeatureInput,
  FileInput,
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

interface Props {
  data?: any;
}

export default function CarDataStepForm(props: Props): ReactElement {
  const [slides, setSlides] = useState(10);
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [compData, setCompData] = useState<Car>();
  const [isResume, setIsResume] = useState(false);
  const [carId, setCarId] = useState<number>();

  useEffect(() => {
    if (props.data) {
      setCompData({ ...props.data });
    }
  }, [props.data]);

  useEffect(() => {
    const step = 100 / slides;

    setProgress(step * activeSlide);
  }, [activeSlide]);

  const getData = () => {
    return {
      startDate: compData?.custom_availability_data?.startDate,
      startTime: compData?.custom_availability_data?.startTime,
      endDate: compData?.custom_availability_data?.endDate,
      endTime: compData?.custom_availability_data?.endTime,
    };
  };

  //   useEffect(() => {
  //     // Have compData here to determine our current step
  //     // The components should perform individual compData validation and update the compData
  //   }, [compData]);

  return (
    <div>
      <div className="col-10 mx-auto">
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
        <div className="col-6 mx-auto mt-5">
          <GeneralInfo
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            setCarId={setCarId}
            carId={carId}
            isResume={isResume}
            value={{
              name: compData?.name ?? "",
              reg_no: compData?.reg_no ?? "",
              make: compData?.make ?? "",
              odometer_reading: compData?.odometer_reading ?? "",
            }}
          />
        </div>
      )}
      {activeSlide === 1 && (
        <div className="col-6 mx-auto mt-5">
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
              features: (compData?.features as FeatureInput[]) ?? [],
            }}
          />
        </div>
      )}
      {activeSlide === 2 && (
        <div className="col-6 mx-auto mt-5">
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
        <div className="col-6 mx-auto mt-5">
          <Photos
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carVerified={compData?.verified ?? false}
            // isEdit={true}
            carId={carId}
            value={{
              photos: (compData?.photos as FileInput[]) ?? [],
            }}
          />
        </div>
      )}

      {activeSlide === 4 && (
        <div className="col-6 mx-auto mt-5">
          <Documents
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carVerified={compData?.verified ?? false}
            isEdit={true}
            carId={carId}
            value={{
              documents: (compData?.documents as DocumentInput[]) ?? [],
            }}
          />
        </div>
      )}

      {activeSlide === 5 && (
        <div className="col-6 mx-auto mt-5">
          <Location
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            // carVerified={compData?.verified ?? false}
            // isEdit={true}
            value={{
              location: compData?.location ?? "",
              delivery: compData?.delivery ?? false,
            }}
          />
        </div>
      )}
      {activeSlide === 6 && (
        <div className="col-6 mx-auto mt-5">
          <Categories
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            // carVerified={compData?.verified ?? false}
            // isEdit={true}
            value={{
              categories: compData?.categories ?? [],
              luxury_and_vip_services: compData?.luxury_vip_services ?? [],
            }}
          />
        </div>
      )}
      {activeSlide === 7 && (
        <div className="col-6 mx-auto mt-5">
          <Distance
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            // carVerified={compData?.verified ?? false}
            // isEdit={true}
            value={{
              has_unlimited_distance: compData?.has_unlimited_distance ?? false,
              distance_per_day: compData?.distance_per_day ?? 0,
            }}
          />
        </div>
      )}
      {activeSlide === 8 && (
        <div className="col-6 mx-auto mt-5">
          <Availability
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            // carVerified={compData?.verified ?? false}
            // isEdit={true}
            value={{
              available: compData?.available ?? false,
              custom_availability: compData?.custom_availability ?? false,
              custom_availability_data: getData() ?? {
                startDate: compData?.custom_availability_data?.startDate,
                startTime: compData?.custom_availability_data?.startTime,
                endDate: compData?.custom_availability_data?.endDate,
                endTime: compData?.custom_availability_data?.endTime,
              },
              advance_book_period: compData?.advance_book_period ?? "",
              car_has_other_use: compData?.car_has_other_use ?? false,
            }}
          />
        </div>
      )}

      {activeSlide === 9 && (
        <div className="col-6 mx-auto mt-5">
          <Rates
            setActiveSlide={setActiveSlide}
            activeSlide={activeSlide}
            setCompData={setCompData}
            carId={carId}
            // carVerified={compData?.verified ?? false}
            // isEdit={true}
            value={{
              daily_rate: compData?.daily_rate ?? 0,
              delivery_rate: compData?.delivery_rate ?? 0,
              discount: compData?.discount ?? "",
              discount_days: compData?.discount_days ?? 0,
              driver_daily_rate: compData?.driver_daily_rate ?? 0,
              hourly_rate: compData?.hourly_rate ?? 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
