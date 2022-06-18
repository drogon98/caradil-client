import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SearchContent } from "../../components/BrowseCars/SearchContent";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/layouts/Layout";
import {
  Car,
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

  useEffect(() => {
    if (router) {
      const hasQuery = router.asPath.includes("?");
      if (!hasQuery) {
        setValues({});
      } else {
        if (Object.keys(router.query).length > 0) {
          setValues({ ...router.query });
          setSearching(true);
        } else {
          setSearching(false);
        }
      }
    }
  }, [router.query]);

  const [getCars, { data, loading }] = useGetCarsLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (values && Object.keys(values).length > 0) {
      getCars({ variables: { input: values } });
    } else if (values && Object.keys(values).length === 0) {
      getCars({ variables: { input: {} } });
    }
  }, [values]);

  useEffect(() => {
    if (values) {
      try {
        let tempValues = { ...values };
        delete tempValues.location;
        delete tempValues.start_date;
        delete tempValues.end_date;
        delete tempValues.start_time;
        delete tempValues.end_time;

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
    if (data?.getCars) {
      setCars([...data.getCars]);
      if (!loading) {
        setMainLoading(false);
        setSearching(false);
      }
    }
  }, [data]);

  return (
    <>
      <CustomHead title="Browse Cars" />
      <Layout>
        <SearchContent
          loading={mainLoading || searching || loading}
          cars={cars!}
          showModifyFilters={showModifyFilters}
          hasMore={true}
        />
      </Layout>
    </>
  );
};

export default BrowseCars;
