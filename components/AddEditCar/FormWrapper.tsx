import React, { FC, useEffect, useState } from "react";
import {
  Car,
  CarDescriptionInput,
  CarDocumentsInput,
  CarSecondaryFeaturesInput,
  CarGeneralInfoInput,
  CarPhotosInput,
  DocumentInput,
  FeatureInput,
  PhotoInput,
  CarPrimaryFeaturesInput,
  CarRatesInput,
  CarAvailabilityInput,
  CarMilesInput,
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
import { Miles } from "./Miles";
import { useRouter } from "next/router";
import { Categories } from "./Categories";
import { LuxuryAndVip } from "./LuxuryAndVipServices";

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
  const [nameAndRegNoData, setNameAndRegNoData] = useState<CarGeneralInfoInput>(
    {
      name: "",
      reg_no: "",
      make: "",
    }
  );
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
    discount_days: "",
    extra_mile_rate: 0,
  });
  const [location, setLocation] = useState<string>("");
  const [miles, setMiles] = useState<CarMilesInput>({ miles_per_day: 0 });
  const [availabilityData, setAvailabilityData] =
    useState<CarAvailabilityInput>({
      available: false,
      custom_availability: false,
      custom_availability_data: {},
    });

  // console.log("props.car :>> ", props.car);

  const router = useRouter();

  useEffect(() => {
    router.beforePopState((cb): boolean => {
      // Handles back and forward arrow click
      console.log("cb :>> ", cb);
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
    if (props.car) {
      setNameAndRegNoData({
        name: props.car.name!,
        reg_no: props.car.reg_no!,
        make: props.car.make!,
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
        return { photos: tempPhotos as PhotoInput[] };
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
        discount_days: props.car.discount_days ?? "",
        extra_mile_rate: props.car.extra_mile_rate ?? 0,
      });
      // setAvailabilityData({
      //   available: props.car.available ?? false,
      //   custom_availability: props.car.custom_availability ?? false,
      //   custom_availability_data: props.car.custom_availability_data,
      // });
      setAvailabilityData(() => {
        const tempCustomAvailabilityData = {
          startDate: props.car?.custom_availability_data?.startDate,
          startTime: props.car?.custom_availability_data?.startTime,
          endDate: props.car?.custom_availability_data?.endDate,
          endTime: props.car?.custom_availability_data?.endTime,
        };
        return {
          available: props.car?.available ?? false,
          custom_availability: props.car?.custom_availability ?? false,
          custom_availability_data: tempCustomAvailabilityData,
        };
      });
      setLocation(props.car.location ?? "");
      setMiles({ miles_per_day: props.car.miles_per_day ?? 0 });
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

  // console.log("carId :>> ", carId);

  // A refresh will cause data loss
  return (
    <>
      <Expandable header="General Info">
        <GeneralInfo
          value={nameAndRegNoData}
          setData={setNameAndRegNoData}
          setCarId={setCarId}
          isEdit={props.isEdit ?? false}
          carId={carId}
        />
      </Expandable>

      <Expandable header="Primary Features">
        <PrimaryFeatures
          value={primaryFeatures}
          carId={carId}
          isEdit={props.isEdit ?? false}
          setData={setPrimaryFeatures}
        />
      </Expandable>

      <Expandable header="Description">
        <Description
          value={description}
          carId={carId}
          // isEdit={props.isEdit ?? false}
          setData={setDescription}
        />
      </Expandable>

      <Expandable header="Photos">
        <Photos
          value={photos}
          carId={carId}
          setData={setPhotos}
          isEdit={props.isEdit!}
          carVerified={props.car?.verified!}
        />
      </Expandable>
      <Expandable header="Documents">
        <Documents
          value={documents}
          carId={carId}
          setData={setDocuments}
          isEdit={props.isEdit ?? false}
          carVerified={props.car?.verified!}
        />
      </Expandable>
      {props.isEdit && props.car?.verified && (
        <>
          <Expandable header="Secondary Features">
            <SecondaryFeatures
              value={secondaryFeatures}
              carId={carId}
              setData={setSecondaryFeatures}
            />
          </Expandable>

          <Expandable header="Categories">
            <Categories
              value={categories!}
              carId={carId}
              setData={setCategories}
            />
          </Expandable>

          {showLuxuryAndVipServices && (
            <Expandable header="VIP & Luxury Services">
              <LuxuryAndVip
                value={luxuryAndVipServices!}
                carId={carId}
                setData={setLuxuryAndVipServices}
              />
            </Expandable>
          )}

          <Expandable header="Location">
            <Location value={location} carId={carId} setData={setLocation} />
          </Expandable>

          <Expandable header="Miles">
            <Miles value={miles} carId={carId} setData={setMiles} />
          </Expandable>

          <Expandable header="Rates">
            <Rates value={rates} carId={carId} setData={setRates} />
          </Expandable>

          <Expandable header="Availability">
            <Availability
              value={availabilityData}
              carId={carId}
              setData={setAvailabilityData}
              booked={props.car.booked ?? false}
            />
          </Expandable>
        </>
      )}
    </>
  );
};
