import { useRouter } from "next/router";
import React, {
  ReactElement,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsArrowLeft } from "react-icons/bs";
import { IoIosMenu } from "react-icons/io";
import { Trips } from "../../../../components/AddEditCar/Trips";
import { Categories } from "../../../../components/AddEditCar/Categories";
import { Description } from "../../../../components/AddEditCar/Description";
import { Distance } from "../../../../components/AddEditCar/Distance";
import { Documents } from "../../../../components/AddEditCar/Documents";
import { Features } from "../../../../components/AddEditCar/Features";
import { Fueling } from "../../../../components/AddEditCar/Fueling";
import { GeneralInfo } from "../../../../components/AddEditCar/GeneralInfo";
import { Location } from "../../../../components/AddEditCar/LocationAndDelivery";
import Menu from "../../../../components/AddEditCar/ManageCar/Menu";
import { Photos } from "../../../../components/AddEditCar/Photos";
import { Rates } from "../../../../components/AddEditCar/Rates";
import { AuthWrapper } from "../../../../components/AuthWrapper";
import { CustomHead } from "../../../../components/CustomHead";
import { useOutsideClickHandler } from "../../../../components/hooks/useOutsideClickHandler";
import AccountLayout from "../../../../components/Layouts/AccountLayout";
import { Loading } from "../../../../components/Loading";
import {
  Car,
  CarTripSettingsInput,
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
  const [tripSettingsData, setTripSettingsData] =
    useState<CarTripSettingsInput>();
  const [showBurgerDropdown, setShowBurgerDropdown] = useState(false);
  const [showRequestVerificationModal, setShowRequestVerificationModal] =
    useState(false);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClickHandler(dropdownRef, setShowBurgerDropdown, burgerButtonRef);

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
    if (carData?.id) {
      const tempTripSettingsData = {
        advance_book_period: carData?.advance_book_period ?? 1,
        can_rent_hourly: carData?.can_rent_hourly ?? false,
        book_and_trip_days: carData.book_and_trip_days ?? [],
        car_market_class: carData.car_market_class ?? "",
        trip_type: carData.trip_type!,
        manual_transmission_test: carData.manual_transmission_test ?? false,
      };

      setTripSettingsData({ ...tempTripSettingsData });
    }
    // else {
    // setAvailabilityData();
    // }
  }, [carData]);

  const handleClick = async (e: any, idx: number, hideSidebar: any) => {
    if (activeSection === idx) {
      return;
    }

    if (hideSidebar) {
      hideSidebar(false);
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

  const handleBurgerClick = () => {
    setShowBurgerDropdown(!showBurgerDropdown);
  };

  const handleRequestVerify = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowRequestVerificationModal(true);
  };

  // console.log("carData :>> ", carData);

  // if (mainLoading) {
  //   return <Loading />;
  // }

  return (
    <>
      <CustomHead title="Account - Manage Car" />
      <AccountLayout>
        <AuthWrapper>
          {mainLoading ? (
            <Loading />
          ) : (
            <div>
              {/* {showRequestVerificationModal && (
                <RequestVerificationModal
                  carId={carData?.id!}
                  showModal={showRequestVerificationModal}
                  handleClose={() => setShowRequestVerificationModal(false)}
                  setCarData={setCarData}
                />
              )} */}

              <div className="manage-car-wrapper-top-lg px-2">
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
                {/* <div className="d-flex justify-content-end">
                  {carData?.being_edited && (
                    <button
                      className="btn bgOrange py-0"
                      onClick={handleRequestVerify}
                    >
                      Request Verification
                    </button>
                  )}
                  {carData?.verification_in_progress && (
                    <button
                      className="btn bg-success color-white m-0 py-0"
                      style={{ height: "40px" }}
                      // disabled={true}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Verification In Progress
                    </button>
                  )}
                </div> */}
              </div>
              <div className="manage-car-wrapper-top-sm p-2 py-0">
                <div className="d-flex align-items-center">
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
                  <div className="manage-car-burger-wrapper">
                    <button
                      className="btn py-0"
                      onClick={handleBurgerClick}
                      ref={burgerButtonRef}
                    >
                      <IoIosMenu size={"35px"} />
                    </button>
                    {showBurgerDropdown && (
                      <div
                        className="manage-car-burger-content p-3 py-4 shadow d-flex flex-column justify-content-evenly"
                        ref={dropdownRef}
                      >
                        <Menu
                          activeSection={activeSection!}
                          handleClick={handleClick}
                          setShowBurgerDropdown={setShowBurgerDropdown}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* <div>
                  {carData?.being_edited && (
                    <button
                      className="btn bgOrange"
                      onClick={handleRequestVerify}
                    >
                      Request Verification
                    </button>
                  )}
                  {carData?.verification_in_progress && (
                    <button
                      className="btn bg-success color-white py-0"
                      // disabled={true}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Verification In Progress
                    </button>
                  )}
                </div> */}
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
                          id_or_passport_no: carData?.id_or_passport_no ?? "",
                          make: carData?.make ?? "",
                          odometer_reading: carData?.odometer_reading ?? 0,
                          end_user_type: carData?.end_user_type ?? "",
                          is_gps_enabled: carData?.is_gps_enabled ?? true,
                        }!
                      }
                      setCompData={setCarData}
                      isManage
                      isEdit={carData?.being_edited ?? false}
                      // booked={carData?.booked ?? false}
                      // hasEditRequest={carData?.has_edit_request ?? false}
                      // verificationInProgress={
                      //   carData?.verification_in_progress ?? false
                      // }
                    />
                  )}

                  {activeSection === 2 && (
                    <Features
                      setCompData={setCarData}
                      isManage
                      carId={carId}
                      isEdit={carData?.being_edited ?? false}
                      booked={carData?.booked ?? false}
                      // hasEditRequest={carData?.has_edit_request ?? false}
                      value={{
                        transmission: carData?.transmission ?? "",
                        gas: carData?.gas ?? "",
                        color: carData?.color ?? "",
                        doors: carData?.doors ?? 0,
                        bags: carData?.bags ?? 0,
                        seats: carData?.seats ?? 0,
                        features: featuresData ?? [],
                      }}
                      // verificationInProgress={
                      //   carData?.verification_in_progress ?? false
                      // }
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
                      // verificationInProgress={
                      //   carData?.verification_in_progress ?? false
                      // }
                    />
                  )}

                  {activeSection === 4 && (
                    <Photos
                      setCompData={setCarData}
                      isManage
                      // carVerified={carData?.verified ?? false}
                      carId={carId}
                      isEdit={carData?.being_edited ?? false}
                      booked={carData?.booked ?? false}
                      // hasEditRequest={carData?.has_edit_request ?? false}
                      value={{
                        photos: photosData!,
                      }}
                      // verificationInProgress={
                      //   carData?.verification_in_progress ?? false
                      // }
                    />
                  )}

                  {activeSection === 5 && (
                    <Documents
                      setCompData={setCarData}
                      isManage
                      // carVerified={carData?.verified ?? false}
                      carId={carId}
                      isEdit={carData?.being_edited ?? false}
                      booked={carData?.booked ?? false}
                      // hasEditRequest={carData?.has_edit_request ?? false}
                      value={{
                        documents: documentsData!,
                      }}
                      // verificationInProgress={
                      //   carData?.verification_in_progress ?? false
                      // }
                    />
                  )}

                  {activeSection === 6 && (
                    <Trips
                      setCompData={setCarData}
                      isManage
                      carId={carId}
                      value={{
                        ...tripSettingsData!,
                      }}
                      manual={carData?.transmission === "manual"}
                      isSelfDriven={carData?.end_user_type === "self_driven"}
                      // booked={carData?.booked!}
                      // verificationInProgress={
                      //   carData?.verification_in_progress ?? false
                      // }
                    />
                  )}

                  {activeSection === 7 && (
                    <Fueling
                      isManage
                      setCompData={setCarData}
                      carId={carId}
                      value={{
                        fuel_efficiency: carData?.fuel_efficiency ?? "",
                        fuel_policy: carData?.fuel_policy ?? "",
                      }}
                      // manual={compData?.transmission === "manual"}
                    />
                  )}

                  {activeSection === 8 && (
                    <Location
                      setCompData={setCarData}
                      isManage
                      carId={carId}
                      value={{
                        location: carData?.location ?? "",
                        delivery: carData?.delivery ?? false,
                      }}
                      // verificationInProgress={
                      //   carData?.verification_in_progress ?? false
                      // }
                    />
                  )}

                  {activeSection === 9 && (
                    <Categories
                      isManage
                      setCompData={setCarData}
                      carId={carId}
                      value={{
                        categories: carData?.categories ?? [],
                        luxury_and_vip_services:
                          carData?.luxury_vip_services ?? [],
                      }}
                      // verificationInProgress={
                      //   carData?.verification_in_progress ?? false
                      // }
                    />
                  )}

                  {activeSection === 10 && (
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
                        distance_per_hour: carData?.distance_per_hour ?? 0,
                      }}
                      canRentHourly={carData?.can_rent_hourly!}
                      // verificationInProgress={
                      //   carData?.verification_in_progress ?? false
                      // }
                    />
                  )}

                  {activeSection === 11 && (
                    <Rates
                      setCompData={setCarData}
                      isManage
                      carId={carId}
                      isChauffeurDriven={
                        carData?.end_user_type === "chauffeur_driven"
                      }
                      canRentHourly={carData?.can_rent_hourly!}
                      value={{
                        daily_rate: carData?.daily_rate ?? 0,
                        delivery_rate: carData?.delivery_rate ?? 0,
                        discount: carData?.discount ?? "",
                        discount_days: carData?.discount_days ?? 0,
                        // driver_daily_rate: carData?.driver_daily_rate ?? 0,
                        hourly_rate: carData?.hourly_rate ?? 0,
                      }}
                      compData={carData!}
                      // verificationInProgress={
                      //   carData?.verification_in_progress ?? false
                      // }
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </AuthWrapper>
      </AccountLayout>
    </>
  );
}
