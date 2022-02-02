import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SearchContent } from "../../components/BrowseCars/SearchContent";
import { CustomHead } from "../../components/CustomHead";
import { useSearchFilterData } from "../../components/hooks/useSearchFilterData";
import Layout from "../../components/layouts/Layout";
import {
  Car,
  SearchInput,
  useGetCarsLazyQuery,
} from "../../graphql_types/generated/graphql";
import { MoreFiltersStruct } from "../../utils/moreFiltersObjToArray";

export interface SearchData {
  name: string;
  location: string;
  categories: string[];
  car_make: string;
  color: string;
  gas: string;
  subject?: number;
  more_filters: string[];
  more_filters_client: MoreFiltersStruct;
}

const BrowseCars: NextPage = () => {
  const [mainLoading, setMainLoading] = useState(true);
  const [values, setValues] = useState<SearchInput>();
  const [payload, setPayload] = useState<SearchData>();
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>();
  const [isSearch, setIsSearch] = useState(false);

  useSearchFilterData({ setValues, setPayload, router });

  const [getCars, { data, loading }] = useGetCarsLazyQuery({
    variables: { input: values as unknown as SearchInput },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getCars && !loading) {
      setMainLoading(false);
    }
  }, [loading, data]);

  // console.log("values :>> ", values);

  useEffect(() => {
    if (values && !isSearch) {
      getCars({ variables: { input: values as unknown as SearchInput } });
    }
  }, [values, isSearch]);

  useEffect(() => {
    if (data?.getCars) {
      setCars([...data.getCars]);
    }
  }, [data]);

  // console.log("values :>> ", values);
  // console.log("payload :>> ", payload);

  return (
    <>
      <CustomHead title="Browse Cars" />
      <Layout>
        <SearchContent
          loading={mainLoading}
          isSearch={isSearch}
          cars={cars!}
          setValues={setValues}
          setIsSearch={setIsSearch}
          setPayload={setPayload}
          payload={payload!}
        />
      </Layout>
    </>
  );
};

export default BrowseCars;
