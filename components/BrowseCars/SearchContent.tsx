import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Car, SearchInput } from "../../graphql_types/generated/graphql";
import { SearchData } from "../../pages/browse-cars";
import { CarBox } from "../Home/CarBox";
import { Loading } from "../Loading";
import { Search } from "./Search";

interface SearchContentProps {
  loading: boolean;
  isSearch: boolean;
  cars: Car[];
  setValues: Dispatch<SetStateAction<SearchInput | undefined>>;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  payload: SearchData;
  setPayload: Dispatch<SetStateAction<SearchData | undefined>>;
}

export function SearchContent(props: SearchContentProps) {
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query) {
      if (Object.keys(router.query).length > 1) {
        console.log("Hey :>> ");
        setSearching(true);
      }
    }
  }, [router.query]);

  return (
    <>
      {/* {!props.loading && (
        <div className="py-4 mb-3" style={{ backgroundColor: "#eaecee" }}>
          <div className="customBrowseCarContainer">
            <Search
              setValues={props.setValues}
              setIsSearch={props.setIsSearch}
              payload={props.payload!}
              setPayload={props.setPayload}
            />
          </div>
        </div>
      )} */}
      <div className="customBrowseCarContainer my-4 pt-4">
        {(props.loading || props.isSearch) && <Loading />}
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
