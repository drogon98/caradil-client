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
      <div className={`${mainLoading && `popular-cars`}`}>
        {mainLoading ? (
          <FlexibleLoader />
        ) : (
          <div className="cars-wrapper">
            {data?.getPopularCars.map((car, idx) => (
              <CarBox data={car} key={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
