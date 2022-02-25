import { useRouter } from "next/router";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Car } from "../../graphql_types/generated/graphql";
import { useAppDispatch } from "../../redux/hooks";
import { showMoreFilters } from "../../redux/searchSlice";
import { CarBox } from "../Home/CarBox";
import { Loading } from "../Loading";

interface SearchContentProps {
  loading: boolean;
  cars: Car[];
  showModifyFilters: boolean;
}

export function SearchContent(props: SearchContentProps) {
  const [searching, setSearching] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query) {
      if (Object.keys(router.query).length > 0) {
        setSearching(true);
      }
    }
  }, [router.query]);

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

  return (
    <>
      <div className="customBrowseCarContainer">
        {props.loading && <Loading />}
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
        <div className="cars-wrapper my-4 pt-4">
          {!props.loading &&
            props.cars?.map((car) => <CarBox data={car} key={car.id} />)}
        </div>
      </div>
    </>
  );
}
