import React, { ReactElement } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  activeSection: number;
  handleClick: any;
  setShowBurgerDropdown?: any;
}

export default function Menu(props: Props): ReactElement {
  return (
    <>
      <div>
        <button
          className={`btn m-0 p-0 d-flex justify-content-between w-100 align-items-center ${
            props.activeSection === 1 && `fw-bold`
          }`}
          onClick={(e) => props.handleClick(e, 1, props.setShowBurgerDropdown)}
        >
          <span>General</span>{" "}
          <span>
            <MdKeyboardArrowRight
              size={props.activeSection === 1 ? `22px` : ``}
            />
          </span>
        </button>
      </div>
      <div>
        <button
          className={`btn m-0 p-0 d-flex justify-content-between w-100 align-items-center ${
            props.activeSection === 2 && `fw-bold`
          }`}
          onClick={(e) => props.handleClick(e, 2, props.setShowBurgerDropdown)}
        >
          <span>Features</span>
          <span>
            <MdKeyboardArrowRight
              size={props.activeSection === 2 ? `22px` : ``}
            />
          </span>
        </button>
      </div>
      <div>
        <button
          className={`btn m-0 p-0 d-flex justify-content-between w-100 align-items-center ${
            props.activeSection === 3 && `fw-bold`
          }`}
          onClick={(e) => props.handleClick(e, 3, props.setShowBurgerDropdown)}
        >
          <span>Description</span>
          <span>
            <MdKeyboardArrowRight
              size={props.activeSection === 3 ? `22px` : ``}
            />
          </span>
        </button>
      </div>
      <div>
        <button
          className={`btn m-0 p-0 d-flex justify-content-between w-100 align-items-center ${
            props.activeSection === 4 && `fw-bold`
          }`}
          onClick={(e) => props.handleClick(e, 4, props.setShowBurgerDropdown)}
        >
          <span>Photos</span>
          <span>
            <MdKeyboardArrowRight
              size={props.activeSection === 4 ? `22px` : ``}
            />
          </span>
        </button>
      </div>
      <div>
        <button
          className={`btn m-0 p-0 d-flex justify-content-between w-100 align-items-center ${
            props.activeSection === 5 && `fw-bold`
          }`}
          onClick={(e) => props.handleClick(e, 5, props.setShowBurgerDropdown)}
        >
          <span>Documents</span>
          <span>
            <MdKeyboardArrowRight
              size={props.activeSection === 5 ? `22px` : ``}
            />
          </span>
        </button>
      </div>
      <div>
        <button
          className={`btn m-0 p-0 d-flex justify-content-between w-100 align-items-center ${
            props.activeSection === 6 && `fw-bold`
          }`}
          onClick={(e) => props.handleClick(e, 6, props.setShowBurgerDropdown)}
        >
          <span>Availability</span>
          <span>
            <MdKeyboardArrowRight
              size={props.activeSection === 6 ? `22px` : ``}
            />
          </span>
        </button>
      </div>
      <div>
        <button
          className={`btn m-0 p-0 d-flex justify-content-between w-100 align-items-center ${
            props.activeSection === 7 && `fw-bold`
          }`}
          onClick={(e) => props.handleClick(e, 7, props.setShowBurgerDropdown)}
        >
          <span>Location</span>
          <span>
            <MdKeyboardArrowRight
              size={props.activeSection === 7 ? `22px` : ``}
            />
          </span>
        </button>
      </div>
      <div>
        <button
          className={`btn m-0 p-0 d-flex justify-content-between w-100 align-items-center ${
            props.activeSection === 8 && `fw-bold`
          }`}
          onClick={(e) => props.handleClick(e, 8, props.setShowBurgerDropdown)}
        >
          <span>Categories</span>
          <span>
            <MdKeyboardArrowRight
              size={props.activeSection === 8 ? `22px` : ``}
            />
          </span>
        </button>
      </div>{" "}
      <div>
        <button
          className={`btn m-0 p-0 d-flex justify-content-between w-100 align-items-center ${
            props.activeSection === 9 && `fw-bold`
          }`}
          onClick={(e) => props.handleClick(e, 9, props.setShowBurgerDropdown)}
        >
          <span>Distance</span>
          <span>
            <MdKeyboardArrowRight
              size={props.activeSection === 9 ? `22px` : ``}
            />
          </span>
        </button>
      </div>{" "}
      <div>
        <button
          className={`btn m-0 p-0 d-flex justify-content-between w-100 align-items-center ${
            props.activeSection === 10 && `fw-bold`
          }`}
          onClick={(e) => props.handleClick(e, 10, props.setShowBurgerDropdown)}
        >
          <span>Rates</span>
          <span>
            <MdKeyboardArrowRight
              size={props.activeSection === 10 ? `22px` : ``}
            />
          </span>
        </button>
      </div>
    </>
  );
}
