import { useRouter } from "next/router";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Car } from "../../graphql_types/generated/graphql";
import { useAppDispatch } from "../../redux/hooks";
import { showMoreFilters } from "../../redux/searchSlice";
import { CarBox } from "../Home/CarBox";
import { Loading } from "../Loading";
import Spinner from "../Loading/Spinner";

interface SearchContentProps {
  loading: boolean;
  cars: Car[];
  showModifyFilters: boolean;
  hasMore: boolean;
}

export function SearchContent(props: SearchContentProps) {
  const [searching, setSearching] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (router.query) {
      if (Object.keys(router.query).length > 0) {
        setSearching(true);
      } else {
        setSearching(false);
      }
    }
  }, [router.query]);

  useEffect(() => {
    let id: number;
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // if (!id) {
            //   setMainLoading(true);
            //   id = window.requestIdleCallback(() => {
            //     // setTimeout(() => {
            //     getReviews({
            //       variables: { carId: props.carId },
            //     });
            //     // }, 5000);
            //   });
            //   // console.log("id :>> ", id);
            // }
          }
        });
      },
      {
        root: null,
        threshold: 0,
      }
    );

    if (fetchRef) {
      observer.observe(fetchRef.current!);
    }

    return () => {
      window.cancelIdleCallback(id);
    };
  }, []);

  const handleClearFilters = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(showMoreFilters());

    // try {
    //   router.push(
    //     {
    //       pathname: "/browse-cars",
    //       query: {},
    //     },
    //     ``,
    //     { shallow: true }
    //   );
    // } catch (error) {
    //   console.log("error :>> ", error);
    // }
  };

  console.log("props.cars?.length", props.cars?.length);

  return (
    <>
      <div className="customBrowseCarContainer">
        {props.loading && <Loading />}
        <p className="mt-3">
          {props.cars?.length > 0 && searching && (
            <>
              <b>{props.cars.length}</b> car(s) found!
            </>
          )}
        </p>
        {!props.loading && props.cars?.length == 0 && (
          <div
            style={{ marginTop: "100px" }}
            className="d-flex flex-column align-items-center"
          >
            {searching ? (
              <>
                <p>No car matching filters.</p>
                {props.showModifyFilters && (
                  <button
                    className="btn bg-secondary mt-2"
                    onClick={handleClearFilters}
                  >
                    Modify Filters
                  </button>
                )}
              </>
            ) : (
              <p>No cars</p>
            )}
          </div>
        )}
        <div className="cars-wrapper pt-4 mb-5">
          {!props.loading &&
            props.cars?.map((car) => <CarBox data={car} key={car.id} />)}
        </div>
        {props.hasMore && (
          <div className="pb-2" ref={fetchRef}>
            {props.loading && <Spinner />}
          </div>
        )}
      </div>
    </>
  );
}
