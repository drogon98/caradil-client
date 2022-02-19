import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Car } from "../../graphql_types/generated/graphql";
import { CarBox } from "../Home/CarBox";
import { Loading } from "../Loading";

interface SearchContentProps {
  loading: boolean;
  cars: Car[];
}

export function SearchContent(props: SearchContentProps) {
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query) {
      if (Object.keys(router.query).length > 1) {
        setSearching(true);
      }
    }
  }, [router.query]);

  return (
    <>
      <div className="customBrowseCarContainer my-4 pt-4">
        {props.loading && <Loading />}
        {!props.loading &&
          props.cars?.length == 0 &&
          (searching ? <p>No car mathcing query</p> : <p>No cars</p>)}
        <div className="cars-wrapper">
          {!props.loading &&
            props.cars?.map((car) => <CarBox data={car} key={car.id} />)}
        </div>
      </div>
    </>
  );
}
