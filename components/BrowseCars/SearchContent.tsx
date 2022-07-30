import { useRouter } from "next/router";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { Car } from "../../graphql_types/generated/graphql";
import { useAppDispatch } from "../../redux/hooks";
import { showMoreFilters } from "../../redux/searchSlice";
import { CarBox } from "../Home/CarBox";
import { Loading } from "../Loading";
import Spinner from "../Loading/Spinner";

interface SearchContentProps {
  initialLoading: boolean;
  loadingMore: boolean;
  cars: Car[];
  showModifyFilters: boolean;
  hasMore: boolean;
  fetchCarsOnScroll: any;
}

export function SearchContent(props: SearchContentProps) {
  const [searching, setSearching] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchRef = useRef<HTMLDivElement>(null);
  const carContainerRef = useRef<HTMLDivElement>(null);

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
    if (props.hasMore) {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !props.loadingMore) {
              window.requestIdleCallback(props.fetchCarsOnScroll);
            }
          });
        },
        {
          root: null,
          threshold: 0,
        }
      );
      if (fetchRef && fetchRef.current) {
        console.log("I have my ref...");
        observer.observe(fetchRef.current);
      }
    }
  }, [fetchRef, props.hasMore, props.loadingMore]);

  const handleClearFilters = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(showMoreFilters());
  };

  return (
    <>
      <div className="customBrowseCarContainer" ref={carContainerRef}>
        {props.initialLoading && <Loading />}
        <p className="mt-3">
          {props.cars?.length > 0 && searching && (
            <>
              <b>{props.cars.length}</b> car(s) found!
            </>
          )}
        </p>
        {!props.initialLoading && props.cars?.length == 0 && (
          <div
            style={{ marginTop: "100px" }}
            className="d-flex flex-column align-items-center"
          >
            {searching ? (
              <>
                <p>No car matching your filters.</p>
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
              <p>No cars listed yet!</p>
            )}
          </div>
        )}
        <div className="cars-wrapper pt-4 mb-5">
          {!props.initialLoading &&
            props.cars?.map((car, idx: number) => (
              <CarBox data={car} key={`${car.id}-${idx}`} />
            ))}
        </div>

        {props.hasMore ? (
          <div className="py-2" ref={fetchRef}>
            {props.loadingMore && <Spinner />}
          </div>
        ) : null}
      </div>
    </>
  );
}
