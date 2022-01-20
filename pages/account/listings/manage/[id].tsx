import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Availability } from "../../../../components/AddEditCar/Availability";
import { Categories } from "../../../../components/AddEditCar/Categories";
import { Description } from "../../../../components/AddEditCar/Description";
import { Distance } from "../../../../components/AddEditCar/Distance";
import { Documents } from "../../../../components/AddEditCar/Documents";
import { Features } from "../../../../components/AddEditCar/Features";
import { GeneralInfo } from "../../../../components/AddEditCar/GeneralInfo";
import { Location } from "../../../../components/AddEditCar/LocationAndDelivery";
import Menu from "../../../../components/AddEditCar/ManageCar/Menu";
import { Photos } from "../../../../components/AddEditCar/Photos";
import { Rates } from "../../../../components/AddEditCar/Rates";
import { AuthWrapper } from "../../../../components/AuthWrapper";
import AccountLayout from "../../../../components/layouts/AccountLayout";
import { Loading } from "../../../../components/Loading";
import {
  Car,
  CarAvailabilityInput,
  DocumentInput,
  FeatureInput,
  FileInput,
  useGetPrivateCarQuery,
} from "../../../../graphql_types/generated/graphql";

interface Props {}

export default function ManageCar(props: Props): ReactElement {
  const [activeSection, setActiveSection] = useState<number>();
  const router = useRouter();
  const [carId, setCarId] = useState<number>();
  const [skip, setSkip] = useState(true);
  const [carData, setCarData] = useState<Car>();
  const [mainLoading, setMainLoading] = useState(true);
  const [featuresData, setFeaturesData] = useState<FeatureInput[]>();
  const [photosData, setPhotosData] = useState<FileInput[]>();
  const [documentsData, setDocumentsData] = useState<DocumentInput[]>();
  const [availabilityData, setAvailabilityData] =
    useState<CarAvailabilityInput>();

  useEffect(() => {
    if (router.query && router.query.active) {
      try {
        let active = parseInt(router.query.active as string, 10);
        if (isNaN(active)) {
          throw new Error("Invalid router active val!");
        }
        setActiveSection(active);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (router.query && router.query.id) {
      try {
        let id = parseInt(router.query.id as string, 10);
        if (isNaN(id)) {
          throw new Error("Invalid car id!");
        }
        setCarId(id);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (carId) {
      setSkip(false);
    }
  }, [carId]);

  const { data, loading } = useGetPrivateCarQuery({
    variables: { carId: carId! },
    skip,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading && data?.getCar.car?.id) {
      setMainLoading(false);
    }
  }, [loading, data]);

  useEffect(() => {
    if (data?.getCar.car?.id) {
      setCarData({ ...data.getCar.car });
    }
  }, [data]);

  useEffect(() => {
    if (carData?.features) {
      let tempFeatures = carData?.features?.map((ft) => {
        return { title: ft.title };
      });

      setFeaturesData([...(tempFeatures as FeatureInput[])]);
    } else {
      setFeaturesData([]);
    }
  }, [carData]);

  useEffect(() => {
    if (carData?.photos) {
      let tempPhotos = carData.photos?.map((photo) => {
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
  }, [carData]);

  useEffect(() => {
    if (carData?.documents) {
      let tempDocuments = carData.documents?.map((doc) => {
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
  }, [carData]);

  useEffect(() => {
    if (carData?.available) {
      const tempCustomAvailabilityData = {
        startDate: carData?.custom_availability_data?.startDate,
        startTime: carData?.custom_availability_data?.startTime,
        endDate: carData?.custom_availability_data?.endDate,
        endTime: carData?.custom_availability_data?.endTime,
      };
      const tempAvailableData = {
        car_has_other_use: carData?.car_has_other_use ?? false,
        advance_book_period: carData?.advance_book_period ?? "",
        available: carData?.available ?? false,
        custom_availability: carData?.custom_availability ?? false,
        custom_availability_data: tempCustomAvailabilityData,
        driver_mode: carData.driver_mode ?? 3,
        manual_transmission_test: carData.manual_transmission_test ?? true,
      };

      setAvailabilityData({ ...tempAvailableData });
    }
    // else {
    // setAvailabilityData();
    // }
  }, [carData]);

  const handleClick = async (e: any, idx: number) => {
    if (activeSection === idx) {
      return;
    }
    setActiveSection(idx);
    await router.push(
      {
        pathname: `/account/listings/manage/[id]`,
        query: { active: idx },
      },
      `/account/listings/manage/${carId}?active=${idx}`,
      { shallow: true }
    );
  };

  if (mainLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Manage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountLayout>
        <AuthWrapper>
          <div>
            <div className="manage-car-wrapper-top">
              <div>
                <button
                  className="btn m-0 p-0 pl-2"
                  onClick={() => {
                    router.replace("/account/listings");
                  }}
                >
                  <BsArrowLeft size={"30px"} />
                </button>
              </div>
              <h3>Manage Car</h3>
            </div>
            <div className="manage-car-wrapper">
              <div className="manage-car-left d-flex flex-column justify-content-evenly p-2">
                <Menu
                  activeSection={activeSection!}
                  handleClick={handleClick}
                />
              </div>
              <div className="manage-car-right p-2">
                {activeSection === 1 && (
                  <GeneralInfo
                    carId={carId}
                    value={
                      {
                        name: carData?.name ?? "",
                        reg_no: carData?.reg_no ?? "",
                        make: carData?.make ?? "",
                        odometer_reading: carData?.odometer_reading ?? 0,
                      }!
                    }
                    setCompData={setCarData}
                    isManage
                  />
                )}

                {activeSection === 2 && (
                  <Features
                    setCompData={setCarData}
                    isManage
                    carId={carId}
                    value={{
                      transmission: carData?.transmission ?? "",
                      gas: carData?.gas ?? "",
                      color: carData?.color ?? "",
                      doors: carData?.doors ?? 0,
                      seats: carData?.seats ?? 0,
                      features: featuresData ?? [],
                    }}
                  />
                )}

                {activeSection === 3 && (
                  <Description
                    setCompData={setCarData}
                    isManage
                    carId={carId}
                    value={{
                      description: carData?.description ?? "",
                    }}
                  />
                )}

                {activeSection === 4 && (
                  <Photos
                    setCompData={setCarData}
                    isManage
                    carVerified={carData?.verified ?? false}
                    carId={carId}
                    value={{
                      photos: photosData!,
                    }}
                  />
                )}

                {activeSection === 5 && (
                  <Documents
                    setCompData={setCarData}
                    isManage
                    carVerified={carData?.verified ?? false}
                    isEdit={true}
                    carId={carId}
                    value={{
                      documents: documentsData!,
                    }}
                  />
                )}

                {activeSection === 6 && (
                  <Location
                    setCompData={setCarData}
                    isManage
                    carId={carId}
                    value={{
                      location: carData?.location ?? "",
                      delivery: carData?.delivery ?? false,
                    }}
                  />
                )}

                {activeSection === 7 && (
                  <Categories
                    isManage
                    setCompData={setCarData}
                    carId={carId}
                    value={{
                      categories: carData?.categories ?? [],
                      luxury_and_vip_services:
                        carData?.luxury_vip_services ?? [],
                    }}
                  />
                )}

                {activeSection === 8 && (
                  <Distance
                    setCompData={setCarData}
                    isManage
                    carId={carId}
                    value={{
                      has_unlimited_distance:
                        carData?.has_unlimited_distance ?? false,
                      distance_per_day: carData?.distance_per_day ?? 0,
                      charge_extra_distance_travelled:
                        carData?.charge_extra_distance_travelled ?? false,
                    }}
                  />
                )}

                {activeSection === 9 && (
                  <Availability
                    setCompData={setCarData}
                    isManage
                    carId={carId}
                    value={{
                      ...availabilityData!,
                    }}
                    manual={carData?.transmission === "manual"}
                  />
                )}

                {activeSection === 10 && (
                  <Rates
                    setCompData={setCarData}
                    isManage
                    carId={carId}
                    value={{
                      daily_rate: carData?.daily_rate ?? 0,
                      delivery_rate: carData?.delivery_rate ?? 0,
                      discount: carData?.discount ?? "",
                      discount_days: carData?.discount_days ?? 0,
                      driver_daily_rate: carData?.driver_daily_rate ?? 0,
                      hourly_rate: carData?.hourly_rate ?? 0,
                    }}
                    compData={carData!}
                  />
                )}
              </div>
            </div>
          </div>
        </AuthWrapper>
      </AccountLayout>
    </>
  );
}
