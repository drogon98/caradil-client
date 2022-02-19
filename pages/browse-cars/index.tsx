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

  useEffect(() => {
    if (router && router.query) {
      setValues({ ...router.query });
    }
  }, [router.query]);

  const [getCars, { data }] = useGetCarsLazyQuery({
    variables: { input: values! },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (values) {
      setMainLoading(true);
      getCars({ variables: { input: values! } });
    }
  }, [values]);

  useEffect(() => {
    if (data?.getCars) {
      setCars([...data.getCars]);
      setMainLoading(false);
    }
  }, [data]);

  return (
    <>
      <CustomHead title="Browse Cars" />
      <Layout>
        <SearchContent loading={mainLoading} cars={cars!} />
      </Layout>
    </>
  );
};

export default BrowseCars;
