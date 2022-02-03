import React, { LegacyRef } from "react";
import { usePlacesWidget } from "react-google-autocomplete";

export interface AutoCompleteProps {
  placeholder: string;
  handler: any;
  name: string;
  value: string;
  inputRef: any;
  required?: any;
}

export function AutoComplete(props: AutoCompleteProps) {
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyArIv424bNBpfMVIWSnie8aX1WGDI4wTDk",
    onPlaceSelected: (place) => props.handler(place),
    options: {
      // types: ["(cities)"],
      types: ["geocode"],
      componentRestrictions: { country: "ke" },
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <input
        type="text"
        ref={ref as unknown as LegacyRef<HTMLInputElement>}
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        // value={props.value}
        // onChange={handleChange}
        defaultValue={props.value}
        onKeyPress={handleKeyDown}
        required={props.required ?? false}
      />
    </>
  );
}
