import React from "react";
import DatePicker, { TimePicker } from "sassy-datepicker";

interface BrowseCarsWhenCompProps {
  whenCompRef: any;
}

const BrowseCarsWhenComp = (props: BrowseCarsWhenCompProps): JSX.Element => {
  return (
    <div
      className="browse-cars-nav-when-tooltip shadow p-2"
      ref={props.whenCompRef}
    >
      <div className="d-flex justify-content-between">
        <div>
          <label>Start Date</label>
          <DatePicker
            onChange={() => {}}
            selected={new Date()}
            minDate={new Date()}
          />
        </div>

        <div>
          <label>End Date</label>
          <DatePicker onChange={() => {}} selected={undefined} />
        </div>
      </div>
      <div className="d-flex mt-3">
        <div className="d-flex align-items-center w-50">
          <div>
            <label>Start Time:</label>
          </div>
          <div>
            <TimePicker
              onChange={() => {}}
              selected={{
                minutes: 0,
                hours: 18,
              }}
            />
          </div>
        </div>
        <div className="d-flex align-items-center w-50">
          <div>
            <label>End Time:</label>
          </div>
          <div>
            <TimePicker
              onChange={() => {}}
              selected={{
                minutes: 0,
                hours: 18,
              }}
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-2">
        <button className="btn bg-secondary">Apply</button>
      </div>
    </div>
  );
};

export default BrowseCarsWhenComp;
