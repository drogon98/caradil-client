import React, { FC, useEffect, useState } from "react";
import { useGetPopularCarsQuery } from "../../graphql_types/generated/graphql";
import FlexibleLoader from "../Loading/FlexibleLoader";
import { CarBox } from "./CarBox";

interface IProps {}

/**
 * @author
 * @function @PopularCars
 **/

export const PopularCars: FC<IProps> = (props) => {
  const [mainLoading, setMainLoading] = useState<boolean>(true);
  const { data, loading } = useGetPopularCarsQuery();
  // console.log("data :>> ", data);

  useEffect(() => {
    if (data && !loading) {
      setMainLoading(false);
    }
  }, [data, loading]);
  return (
    <div className="customContainer my-5">
      <p className="text-center">Popular cars right now</p>
      <h3 className="mb-4 text-center">
        Find great deals from top-rated hosts
      </h3>
      <div className="cars-wrapper popular-cars ">
        {mainLoading ? (
          <FlexibleLoader />
        ) : (
          data?.getPopularCars.map((car, idx) => (
            <CarBox data={car} key={idx} />
          ))
        )}

        {/* Should be available cars */}
      </div>
      {/* <div className="mt-5 my-3 d-flex justify-content-between align-items-center">
        <p className="m-0 font-weight-bold">{data && data.length} results</p>
        <Link to="/cars" className="m-0">
          <Icon icon="bi:arrow-right" className="popular-cars-arrow" />
        </Link>
      </div> */}
    </div>
  );
};
