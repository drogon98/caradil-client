import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { SearchInput } from "../../graphql_types/generated/graphql";
import { SearchData } from "../../pages/browse-cars";
import { MoreFilters } from "./MoreFilters";
import { SearchBottomDropDowns } from "./SearchBottomDropDowns";
import { SearchTop } from "./SearchTop";
import { SmSearch } from "./SmSearch";

interface SearchProps {
  setValues: Dispatch<SetStateAction<SearchInput | undefined>>;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  payload: SearchData;
  setPayload: Dispatch<SetStateAction<SearchData | undefined>>;
}

export function Search(props: SearchProps) {
  const router = useRouter();
  const [isMake, setIsMake] = useState(false);

  useEffect(() => {
    if (router.query) {
      if (router.query.make) {
        setIsMake(true);
      }
    }
  }, [router.query]);

  const handleClickClearAll = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isMake) {
      router.replace(`/browse-cars/${router.query.make}`);
    } else {
      router.replace("/browse-cars");
    }
  };

  return (
    <>
      <div className="mb-2 search-wrapper">
        <form
          onSubmit={() => {
            props.setIsSearch(true);

            // try {
            // const tempPayload = {
            //   car_make: props.payload.car_make,
            //   location: props.payload.location,
            //   categories: props.payload.categories,
            //   color: props.payload.color,
            //   gas: props.payload.gas,
            //   name: props.payload.name,
            //   more_filters: moreFiltersObjToArray(
            //     props.payload.more_filters_client!
            //   ),
            // };
            // props.setValues({ ...tempPayload });
            // } catch (error) {
            //   console.log("error :>> ", error);
            // }
          }}
        >
          <div>
            <SearchTop setPayload={props.setPayload} payload={props.payload} />

            <div style={{ borderBottom: "1px solid #eaecee" }} />
            <div className="container">
              <div className="search-bottom py-2">
                <div className="row align-items-center">
                  <SearchBottomDropDowns
                    setPayload={props.setPayload}
                    payload={props.payload}
                  />
                  <div className="col-2">
                    <MoreFilters
                      setPayload={props.setPayload}
                      payload={props.payload}
                    />
                  </div>
                  <div className="col-1" />
                  <div className="col-1" />
                  <div className="col-1" />
                  <div className="col-2 d-flex justify-content-end">
                    <button className="btn" onClick={handleClickClearAll}>
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <SmSearch
        setValues={props.setValues}
        setPayload={props.setPayload}
        payload={props.payload}
        setIsSearch={props.setIsSearch}
      />
    </>
  );
}
