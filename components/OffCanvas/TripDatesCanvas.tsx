import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { Offcanvas } from "react-bootstrap";
import { time24hrs } from "../../data";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Calendar from "../Calendar/Calendar";

interface ITripDatesCanvasProps {
  show: boolean;
  hide: () => void;
}

export default function TripDatesCanvas(props: ITripDatesCanvasProps) {
  const [startDate, setStartDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const router = useRouter();
  console.log("router :>> ", router);

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "startTime") {
      setStartTime(e.target.value);
    } else if (e.target.name === "endTime") {
      setEndTime(e.target.value);
    }
  };

  const handler = () => {
    // if (router.query.start_date) {
    //     tripDetailsQuery.start_date = router.query.start_date as string;
    //   }
    //   if (router.query.end_date) {
    //     tripDetailsQuery.end_date = router.query.end_date as string;
    //   }
    //   if (router.query.start_time) {
    //     tripDetailsQuery.start_time = router.query.start_time as string;
    //   }
    //   if (router.query.end_time) {
    //     tripDetailsQuery.end_time = router.query.end_time as string;
    //   }
    //   if (router.query.bgs) {
    //     tripDetailsQuery.bgs = router.query.bgs as string;
    //   }
    //   if (router.query.a_trvs) {
    //     tripDetailsQuery.a_trvs = router.query.a_trvs as string;
    //   }
    //   if (router.query.dvr_dist) {
    //     tripDetailsQuery.dvr_dist = router.query.dvr_dist as string;
    //   }
    //   if (router.query.dvr_loc) {
    //     tripDetailsQuery.dvr_loc = router.query.dvr_loc as string;
    //   }
  };

  const handleApplyDateAndTime = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // Do some validation
      let tripDatesQuery: any = {};
      tripDatesQuery.start_time = startTime;
      tripDatesQuery.end_time = endTime;
      tripDatesQuery.start_date = startDate;
      tripDatesQuery.end_date = endDate;

      router.replace({
        pathname: `/[slug]/[id]/book-details`,
        query: {
          slug: router.query.slug as string,
          id: router.query.id as string,
          ...tripDatesQuery,
        },
      });
      //   Set dates in page for calculations
      props.hide();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Offcanvas show={props.show} onHide={props.hide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Trip Dates and Time</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div>
          <p>Select start and end date</p>
          <Calendar
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>

        <div className="row mb-2">
          <div className="col d-flex flex-column w-50">
            <div>
              <label style={{ fontSize: "11px" }}>Start Time</label>
            </div>
            <div>
              <div className="w-100">
                <select
                  className="w-100 form-control"
                  name="startTime"
                  onChange={handleTimeChange}
                  value={startTime ?? ""}
                >
                  <option value={""}>Select...</option>
                  {time24hrs.map((t, idx) => (
                    <option key={idx} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col d-flex flex-column w-50">
            <div>
              <label style={{ fontSize: "11px" }}>End Time</label>
            </div>
            <div>
              <div className="w-100">
                <select
                  className="w-100 form-control"
                  name="endTime"
                  onChange={handleTimeChange}
                  value={endTime ?? ""}
                >
                  <option value={""}>Select...</option>
                  {time24hrs.map((t, idx) => (
                    <option key={idx} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* {} */}
        </div>
        <button onClick={handleApplyDateAndTime}>Apply date and time</button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
