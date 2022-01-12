import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { SearchData } from "../../pages/browse-cars";
import { AutoComplete } from "../Location/AutoComplete";
import { Categories } from "./Categories";
// import { SmSearch } from "./SmSearch";

interface SearchTopProps {
  payload: SearchData;
  setPayload: Dispatch<SetStateAction<SearchData | undefined>>;
}

export function SearchTop(props: SearchTopProps) {
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setPayload({ ...props.payload!, [e.target.name]: e.target.value });
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Cleare the location field default value
    if (inputRef.current) {
      if (Object.keys(router.query).length === 1) {
        inputRef.current.value = "";
      }
    }
  }, [router.query, inputRef]);

  const handleUpdateLocation = (data: any) => {
    if (inputRef && inputRef.current) {
      props.setPayload({ ...props.payload!, location: inputRef.current.value });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="container">
        <div className="row g-0 align-items-center search-top">
          <div className="col-2 categ-wrapper d-flex align-items-center">
            <Categories payload={props.payload} setPayload={props.setPayload} />
          </div>
          <div className="col-9">
            <div className="input-group d-flex search-top-height">
              <div className="d-flex search-car-name" style={{ flex: 1 }}>
                <span className="input-group-text">
                  <Icon icon="akar-icons:search" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Car name"
                  name="name"
                  value={props.payload?.name ?? ""}
                  onChange={handleChange}
                  onKeyPress={handleKeyDown}
                />
              </div>
              <div className="d-flex search-car-location" style={{ flex: 1 }}>
                <span className="input-group-text">
                  <Icon icon="carbon:location-filled" />
                </span>
                <div className="d-flex align-items-center w-100">
                  <AutoComplete
                    placeholder="Car location"
                    handler={handleUpdateLocation}
                    name="location"
                    value={props.payload?.location ?? ""}
                    inputRef={inputRef}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-1 d-flex justify-content-center search-top-height">
            <button className="btn" onClick={handleClearForm}>
              Clear
            </button>
          </div> */}
          <div className="col-1 search-top-height d-flex align-items-center justify-content-end pr-0">
            <button className="btn search-btn py-1" type="submit">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
