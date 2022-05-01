import React, { ReactChild, MouseEvent, useRef, useState } from "react";
import slugify from "slugify";
import { CgMoreR } from "react-icons/cg";
import Link from "next/link";
import { Car, Trip } from "../../graphql_types/generated/graphql";
import { useOutsideClickHandler } from "../hooks/useOutsideClickHandler";

export interface MoreButtonProps {
  data: Car | Trip;
  children: ReactChild;
  disabled?: boolean;
}

export function MoreButton(props: MoreButtonProps) {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClickHandler(moreDropdownRef, setShowDropDown, moreButtonRef);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="more-wrapper">
      <button
        className="btn m-0 p-0"
        onClick={handleClick}
        ref={moreButtonRef}
        disabled={props.disabled}
      >
        <CgMoreR />
      </button>
      {showDropDown && (
        <div className="more-tooltip shadow p-2" ref={moreDropdownRef}>
          {props.children}
        </div>
      )}
    </div>
  );
}
