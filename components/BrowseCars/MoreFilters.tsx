import { Icon } from "@iconify/react";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { SearchData } from "../../pages/browse-cars";
import {
  moreFiltersObjToArray,
  MoreFiltersStruct,
} from "../../utils/moreFiltersObjToArray";

import { useOutsideClickHandler } from "../hooks/useOutsideClickHandler";

export interface MoreFiltersProps {
  payload: SearchData;
  setPayload: Dispatch<SetStateAction<SearchData | undefined>>;
}

export function MoreFilters(props: MoreFiltersProps) {
  const [showMoreDropdown, setShowMoreDropdown] = useState<boolean>();
  const moreFilterRef = useRef<HTMLDivElement>(null);
  const moreFilterButtonRef = useRef<HTMLButtonElement>(null);
  const [moreFilters, setMoreFilters] = useState<MoreFiltersStruct>();

  useOutsideClickHandler(
    moreFilterRef,
    setShowMoreDropdown,
    moreFilterButtonRef
  );

  useEffect(() => {
    setMoreFilters(props.payload.more_filters_client);
  }, [props.payload.more_filters_client]);

  const handleClickMore = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (showMoreDropdown === undefined) {
      setShowMoreDropdown(true);
    } else {
      setShowMoreDropdown(!showMoreDropdown);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("e.target.value :>> ", e.target.value);
    props.setPayload({
      ...props.payload,
      more_filters_client: {
        ...props.payload.more_filters_client,
        [e.target.name]: e.target.value,
      },
    });
  };

  // console.log("props.payload :>> ", props.payload);
  // console.log("moreFilters :>> ", moreFilters);

  return (
    <div className="more-filters-wrapper">
      <button
        type="button"
        className="btn bgOrange"
        onClick={handleClickMore}
        ref={moreFilterButtonRef}
      >
        <Icon
          icon="bi:filter-square-fill"
          color="#ffffff"
          style={{ fontSize: "20px" }}
        />
      </button>
      <input
        hidden
        type="text"
        defaultValue={
          moreFilters && JSON.stringify(moreFiltersObjToArray(moreFilters))
        }
        name="more_filters"
      />
      {showMoreDropdown && (
        <div
          className="more-filters-wrapper-content shadow p-2"
          ref={moreFilterRef}
        >
          <div className="d-flex my-2 justify-content-between">
            <button className="btn bgOrange apply-button" type="submit">
              <small className="fw-bold">Apply Filters</small>
            </button>
            <button
              className="btn bgOrange apply-button"
              type="submit"
              onClick={() => {
                props.setPayload({
                  ...props.payload,
                  more_filters_client: {
                    transmission: "",
                    seats: "",
                    doors: "",
                    min_rate: "",
                    max_rate: "",
                    min_miles: "",
                    max_miles: "",
                    chauffeur: "",
                  },
                });
              }}
            >
              {/* Turn Filters to an empty array */}
              <small className="fw-bold">Remove Filters</small>
            </button>
          </div>
          <h6>More Filters</h6>
          {/* <hr /> */}
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="transmission"
              id="morFiltersManual"
              value="manual"
              onChange={handleChange}
              checked={
                props.payload.more_filters_client?.transmission === "manual"
              }
            />
            <label className="form-check-label" htmlFor="morFiltersManual">
              Manual
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="transmission"
              id="moreFiltersAuto"
              value="automatic"
              onChange={handleChange}
              checked={
                props.payload.more_filters_client?.transmission === "automatic"
              }
            />
            <label className="form-check-label" htmlFor="moreFiltersAuto">
              Automatic
            </label>
          </div>

          <div>
            <div className="row align-items-center mb-2">
              <div className="col-3">
                <label htmlFor="moreFilterSeats" className="col-form-label">
                  <span>Seats</span>
                </label>
              </div>
              <div className="col-9">
                <input
                  id="moreFilterSeats"
                  type="number"
                  className="form-control"
                  name="seats"
                  value={props.payload?.more_filters_client?.seats}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="row align-items-center mb-2">
              <div className="col-3">
                <label htmlFor="moreFilterDoors" className="col-form-label">
                  <span>Doors</span>
                </label>
              </div>
              <div className="col-9">
                <input
                  id="moreFilterDoors"
                  type="number"
                  className="form-control"
                  name="doors"
                  value={props.payload?.more_filters_client?.doors}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="col-form-label">
              <span>Daily Rate</span>
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="min_rate"
                value={props.payload?.more_filters_client?.min_rate}
                onChange={handleChange}
                placeholder="Min Rate"
              />
              <input
                type="text"
                className="form-control"
                name="max_rate"
                value={props.payload?.more_filters_client?.max_rate}
                onChange={handleChange}
                placeholder="Max Rate"
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="col-form-label">
              <span>Miles per Day</span>
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="min_miles"
                value={props.payload?.more_filters_client?.min_miles}
                onChange={handleChange}
                placeholder="Min Miles"
              />
              <input
                type="text"
                className="form-control"
                name="max_miles"
                value={props.payload?.more_filters_client?.max_miles}
                onChange={handleChange}
                placeholder="Max Miles"
              />
            </div>
          </div>
          {/* <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="moreFiltersChauffeur"
              name="chauffeur"
              value={
                props.payload?.more_filters_client?.chauffeur === "true"
                  ? "false"
                  : "true"
              }
              checked={
                props.payload?.more_filters_client?.chauffeur === "true"
                  ? true
                  : false
              }
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="moreFiltersChauffeur">
              Chauffeur (Private Driver)
            </label>
          </div> */}
        </div>
        // </OutsideClickHandler>
      )}
    </div>
  );
}
