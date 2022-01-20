import { Dispatch, SetStateAction, useEffect } from "react";
import { SearchInput } from "../../graphql_types/generated/graphql";
import { SearchData } from "../../pages/browse-cars";
import { searchDataArrayToObject } from "../../utils/searchDataArrayToObject";

export interface SearchFilterDataProps {
  setValues: Dispatch<SetStateAction<SearchInput | undefined>>;
  setPayload: Dispatch<SetStateAction<SearchData | undefined>>;
  router: any;
}

export function useSearchFilterData(props: SearchFilterDataProps) {
  // const router = useRouter();

  // console.log("props.router.query :>> ", props.router.query);

  useEffect(() => {
    try {
      let output: SearchData = {
        categories: [],
        name: "",
        location: "",
        car_make: "",
        color: "",
        gas: "",
        more_filters: [],
        more_filters_client: {
          transmission: "",
          seats: "",
          doors: "",
          max_miles: "",
          min_miles: "",
          max_rate: "",
          min_rate: "",
          chauffeur: "",
        },
      };

      if (props.router) {
        if (props.router.query.categories) {
          output.categories = JSON.parse(
            props.router.query.categories as string
          );
        }

        if (props.router.query.name) {
          output.name = props.router.query.name as string;
        }

        if (props.router.query.location) {
          output.location = props.router.query.location as string;
        }

        if (props.router.query.color) {
          output.color = props.router.query.color as string;
        }

        if (props.router.query.car_make) {
          output.car_make = props.router.query.car_make as string;
        }

        if (props.router.query.make) {
          // For the make single page

          output.car_make = props.router.query.make as string;
        }

        if (props.router.query.gas) {
          output.gas = props.router.query.gas as string;
        }

        if (props.router.query.subject) {
          output.subject = parseInt(props.router.query.subject, 10);
        }

        if (props.router.query.more_filters) {
          let filtersArray = JSON.parse(
            props.router.query.more_filters as string
          );
          // Create a template for destructuring this aray into an object
          let obj = searchDataArrayToObject(filtersArray);

          output.more_filters_client = obj;
        } else {
          let obj = searchDataArrayToObject(["", "", "", "", "", "", "", ""]);

          output.more_filters_client = obj;
        }

        props.setPayload({
          ...output,
        });

        if (
          props.router.query.more_filters &&
          props.router.query.more_filters.length > 0
        ) {
          props.setValues({
            car_make: output.car_make,
            location: output.location,
            categories: output.categories,
            color: output.color,
            gas: output.gas,
            name: output.name,
            subject: output.subject ? output.subject : 0,
            more_filters: JSON.parse(props.router.query.more_filters), // This one should be converted to an array on submit
          });
        } else {
          props.setValues({
            car_make: output.car_make,
            location: output.location,
            categories: output.categories,
            color: output.color,
            gas: output.gas,
            name: output.name,
            subject: output.subject ? output.subject : 0,
            more_filters: ["", "", "", "", "", "", "", ""],
          });
        }
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, [props.router]);
}
