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
    <div className="page-section customContainer">
      <div className="text-center">
        <small className="text-uppercase section-heading-top-heading">
          Available Cars
        </small>
      </div>
      <div className="d-flex justify-content-center">
        <div className="section-heading-hr" />
      </div>
      <div className="text-center">
        <h2 className="mb-5 section-heading">Explore the Top Cars</h2>
      </div>

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
