import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { carCategories } from "../../data";
import { SearchData } from "../../pages/browse-cars";
import { useOutsideClickHandler } from "../hooks/useOutsideClickHandler";

interface CategoriesProps {
  // handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  payload: SearchData;
  setPayload: Dispatch<SetStateAction<SearchData | undefined>>;
}

export function Categories(props: CategoriesProps) {
  const router = useRouter();
  const categoryRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const [showDropdown, setShowDropdown] = useState<boolean>();

  const categoriesButtonRef = useRef<HTMLButtonElement>(null);
  useOutsideClickHandler(categoryRef, setShowDropdown, categoriesButtonRef);

  useEffect(() => {
    setCategories([...props.payload.categories]);
  }, [props.payload.categories]);

  const handleClickButtonWithPreventdefault = (
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (showDropdown === undefined) {
      setShowDropdown(true);
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isSelected = props.payload.categories?.find(
      (cat) => cat === e.target.value.toLowerCase()
    );
    if (isSelected) {
      let tempCategories = props.payload.categories?.filter(
        (cat) => cat !== e.target.value.toLowerCase()
      );

      props.setPayload({ ...props.payload, categories: [...tempCategories!] });
    } else {
      props.setPayload({
        ...props.payload,
        categories: [
          ...(props.payload.categories ?? []),
          e.target.value.toLowerCase(),
        ],
      });
    }
  };

  return (
    <div className="search-categories-wrapper">
      <button
        className="btn d-flex align-items-center justify-content-between w-100 categories-btn"
        style={{ backgroundColor: "#fff" }}
        onClick={handleClickButtonWithPreventdefault}
        ref={categoriesButtonRef}
      >
        <span>
          {categories && categories?.length > 0 ? categories?.length : "All"}{" "}
          Category(s)
        </span>
        <Icon icon="dashicons:arrow-down" />
      </button>
      <input
        hidden
        type="text"
        defaultValue={categories?.length > 0 ? JSON.stringify(categories) : ""}
        name="categories"
      />
      {showDropdown && (
        <div
          className="categories-dropdown-wrapper shadow p-2"
          ref={categoryRef}
        >
          <div className="d-flex my-2 justify-content-between">
            <button className="btn bgOrange apply-button" type="submit">
              <small className="fw-bold">Apply Categories</small>
            </button>
            <button
              className="btn bgOrange remove-button"
              type="submit"
              onClick={() => {
                props.setPayload({ ...props.payload, categories: [] });
              }}
            >
              {/* Turn categories to an empty array */}
              <small className="fw-bold">Remove Categories</small>
            </button>
          </div>
          <div className="categories-wrapper ">
            {carCategories.map((category, idx) => {
              const isSelected = props.payload.categories?.find(
                (cat) => cat === category.toLowerCase()
              );
              return (
                <div className="form-check" key={idx}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={category}
                    checked={isSelected ? true : false}
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {category}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
