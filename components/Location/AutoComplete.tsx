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
}

export function AutoComplete(props: AutoCompleteProps) {
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyArIv424bNBpfMVIWSnie8aX1WGDI4wTDk",
    onPlaceSelected: (place) => props.handler(place),
    options: {
      types: ["(cities)"],
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
      types: ["(cities)"],
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
          className="gp-location-suggestion"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> , <small>{secondary_text}</small>
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
