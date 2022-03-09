import React, {
  ChangeEvent,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useOutsideClickHandler } from "../hooks/useOutsideClickHandler";

export interface AutoCompleteProps {
  placeholder: string;
  handler: any;
  name: string;
  value: string;
  inputRef: any;
  required?: any;
  geocodeEstablishments?: boolean;
}

export function AutoComplete(props: AutoCompleteProps) {
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyArIv424bNBpfMVIWSnie8aX1WGDI4wTDk",
    onPlaceSelected: (place) => props.handler(place),
    options: {
      types: props.geocodeEstablishments
        ? ["establishment", "geocode"]
        : ["(cities)"],
      // types: ["(regions)"],
      // types: ["geocode"],
      componentRestrictions: { country: "ke" },
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // console.log("autocompleteRef", autocompleteRef);

  return (
    <>
      <input
        type="text"
        ref={ref as unknown as LegacyRef<HTMLInputElement>}
        className="form-control m-0 h-100"
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

export const Debounce = () => {
  const [value, setValue] = useState("");

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyArIv424bNBpfMVIWSnie8aX1WGDI4wTDk"
        selectProps={{
          value,
          onChange: setValue,
        }}
      />
    </div>
  );
};

//https://hackernoon.com/create-your-reactjs-address-autocomplete-component-in-10-minutes-ws2j33ej

export const PlacesAutocomplete = (props: {
  setLocation: any;
  location: string;
}) => {
  const [initial, setInitial] = useState(false);
  const {
    // ready,
    // value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["establishment", "geocode"],
      componentRestrictions: { country: "ke" },
    },
    debounce: 300,
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setInitial(true);
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   setValue(props.location);
  //   clearSuggestions();
  // }, [props.location]);

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionWrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClickHandler(
    suggestionWrapperRef,
    () => {
      clearSuggestions();
    },
    inputRef
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setInitial(true);
    setValue(e.target.value);
    props.setLocation(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: any }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      props.setLocation(description);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng });
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div
          className="gp-location-suggestion cursor-pointer"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <small style={{ color: "rgba(0,0,0,.7)" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 20 20"
              style={{ width: "20px", height: "20px" }}
            >
              <path
                fill="#d4d4d4"
                d="M10 2.009c-2.762 0-5 2.229-5 4.99c0 4.774 5 11 5 11s5-6.227 5-11c0-2.76-2.238-4.99-5-4.99zm0 7.751a2.7 2.7 0 1 1 0-5.4a2.7 2.7 0 0 1 0 5.4z"
              />
            </svg>
            <strong>{main_text}</strong> , <small>{secondary_text}</small>
          </small>
        </div>
      );
    });

  return (
    <div ref={ref} className="h-100">
      <input
        value={props.location}
        onChange={handleInput}
        // disabled={!ready}
        placeholder="Where?"
        className="form-control h-100"
        ref={inputRef}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && initial && (
        <div
          ref={suggestionWrapperRef}
          className="gp-suggestions-container shadow"
        >
          {renderSuggestions()}
        </div>
      )}
    </div>
  );
};
