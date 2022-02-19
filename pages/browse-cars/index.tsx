import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  const [cars, setCars] = useState<Car[]>();
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (router && router.query) {
      setValues({ ...router.query });
      if (Object.keys(router.query).length > 0) {
        setSearching(true);
      } else {
        setSearching(false);
      }
    }
  }, [router.query]);

  const [getCars, { data, loading }] = useGetCarsLazyQuery({
    variables: { input: values! },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (values) {
      getCars({ variables: { input: values! } });
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
        <SearchContent loading={mainLoading || searching} cars={cars!} />
      </Layout>
    </>
  );
};

export default BrowseCars;
