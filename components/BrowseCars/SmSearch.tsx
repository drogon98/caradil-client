import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import { SearchInput } from "../../graphql_types/generated/graphql";
import { SearchData } from "../../pages/browse-cars";
import { AutoComplete } from "../Location/AutoComplete";
import { Categories } from "./Categories";
import { MoreFilters } from "./MoreFilters";
import { SearchBottomDropDowns } from "./SearchBottomDropDowns";

interface SmSearchProps {
  setValues: Dispatch<SetStateAction<SearchInput | undefined>>;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  payload: SearchData;
  setPayload: Dispatch<SetStateAction<SearchData | undefined>>;
}

export function SmSearch(props: SmSearchProps) {
  const router = useRouter();
  const [isMake, setIsMake] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setPayload({ ...props.payload!, [e.target.name]: e.target.value });
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdateLocation = (data: any) => {
    if (inputRef && inputRef.current) {
      props.setPayload({
        ...props.payload!,
        location: inputRef.current.value,
      });
    }
  };

  const handleClickClearAll = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isMake) {
      router.replace(`/browse-cars/${router.query.make}`);
    } else {
      router.replace("/browse-cars");
    }
  };

  return (
    <div className="search-sm-wrapper">
      <form
        onSubmit={() => {
          props.setIsSearch(true);
          props.setValues({ ...props.payload });
        }}
      >
        <div className="input-group mb-2 d-flex align-items-center">
          <Categories payload={props.payload} setPayload={props.setPayload} />
          <input
            type="text"
            className="form-control"
            placeholder="Car name"
            name="name"
            value={props.payload?.name ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-2">
          <AutoComplete
            placeholder="Car location"
            // handler={props.setPayload}
            name="location"
            value={props.payload?.location ?? ""}
            handler={handleUpdateLocation}
            inputRef={inputRef}
          />
        </div>

        <SearchBottomDropDowns
          setPayload={props.setPayload}
          payload={props.payload}
        />
        <div className="d-grid gap-2 my-2">
          <button type="submit" className="btn bgOrange">
            Search
          </button>
        </div>
        <div className="d-flex justify-content-between">
          <div className="sm-filter-wrapper">
            <MoreFilters
              setPayload={props.setPayload}
              payload={props.payload}
            />
          </div>
          <button className="btn" onClick={handleClickClearAll}>
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
}
