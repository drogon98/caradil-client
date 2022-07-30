import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { SearchContent } from "../../components/BrowseCars/SearchContent";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/layouts/Layout";
import {
  Car,
  MyCursor,
  SearchInput,
  useGetCarsLazyQuery,
} from "../../graphql_types/generated/graphql";

const BrowseCars: NextPage = () => {
  const [mainLoading, setMainLoading] = useState(true);
  const [values, setValues] = useState<SearchInput>();
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [searching, setSearching] = useState(false);
  const [showModifyFilters, setShowModifyFilters] = useState(false);
  const [cursor, setCursor] = useState<MyCursor>(); //Type cursor
  const [hasMore, setHasMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useLayoutEffect(() => {
    if (router) {
      try {
        const hasQuery = router.asPath.includes("?");
        if (!hasQuery) {
          setValues({});
          setCars([]);
          setMainLoading(true);
        } else {
          if (Object.keys(router.query).length > 0) {
            const hasCategories = router.query.categories;

            let tempQueryValues = { ...router.query };
            setValues({ ...tempQueryValues });
            if (hasCategories) {
              const arrString = router.query?.categories as string;
              const arrCats = arrString?.split(",");
              tempQueryValues = { ...tempQueryValues, categories: arrCats };
              setValues({ ...tempQueryValues });
            }
            setSearching(true);
            setCars([]);
          } else {
            setSearching(false);
          }
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [router.query]);

  const [getCars, { data, loading }] = useGetCarsLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  useLayoutEffect(() => {
    if (cars.length === 0 && (loading || searching || mainLoading)) {
      setInitialLoading(true);
    } else {
      setInitialLoading(false);
    }
  }, [loading, cars]);

  useLayoutEffect(() => {
    if (cars.length !== 0 && loading) {
      setLoadingMore(true);
    } else {
      setLoadingMore(false);
    }
  }, [loading, cars]);

  useEffect(() => {
    if (values && Object.keys(values).length > 0) {
      getCars({ variables: { input: { ...values, cursor } } });
    } else if (values && Object.keys(values).length === 0) {
      getCars({ variables: { input: { cursor } } });
    }
  }, [values]);

  const fetchCarsOnScroll = () => {
    if (values && Object.keys(values).length > 0) {
      getCars({ variables: { input: { ...values, cursor } } });
    } else if (values && Object.keys(values).length === 0) {
      getCars({ variables: { input: { cursor } } });
    }
  };

  useEffect(() => {
    if (values) {
      try {
        let tempValues = { ...values };
        // delete tempValues.location;
        delete tempValues.start_date;
        delete tempValues.end_date;
        delete tempValues.start_time;
        delete tempValues.end_time;
        delete tempValues.latitude;
        delete tempValues.longitude;

        let tempValues2 = { ...tempValues };

        if (Object.keys(tempValues2).length > 0) {
          setShowModifyFilters(true);
        } else {
          setShowModifyFilters(false);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }, [values]);

  useEffect(() => {
    if (data?.getCars && !loading) {
      // console.log("cars", cars);
      // console.log("data.getCars.data", data.getCars.data);
      setCars((prevCars) => {
        //  Take care of search
        // In search the app fetches the cars based on search filters
        // Maybe on filter we can clear the car and show the spinner
        return [...prevCars, ...data.getCars.data];
      });
      setHasMore(false);
      setCursor({
        beforeCursor: data.getCars.cursor.beforeCursor,
        afterCursor: data.getCars.cursor.afterCursor,
      });
      // if (!loading) {
      setMainLoading(false);
      setSearching(false);
      // }
    }
  }, [data?.getCars, loading]);

  useEffect(() => {
    if (cursor?.afterCursor) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [cursor]);

  return (
    <>
      <CustomHead title="Browse Cars" />
      <Layout>
        <SearchContent
          // initialLoading={mainLoading || searching || loading}
          initialLoading={initialLoading}
          loadingMore={loadingMore}
          cars={cars}
          showModifyFilters={showModifyFilters}
          hasMore={hasMore}
          fetchCarsOnScroll={fetchCarsOnScroll}
        />
      </Layout>
    </>
  );
};

export default BrowseCars;
