import React, { FC } from "react";

interface IProps {}

const BrowseByMake: FC<IProps> = (props) => {
  // const [mainLoading, setMainLoading] = useState(true);
  // const [values, setValues] = useState<SearchInput>();
  // const [payload, setPayload] = useState<SearchData>();
  // const router = useRouter();
  // const [cars, setCars] = useState<any[]>();
  // const [isSearch, setIsSearch] = useState(false);
  // const [title, setTitle] = useState("");

  // useEffect(() => {
  //   if (router.query.make) {
  //     setTitle(router.query.make as string);
  //   } else {
  //     setTitle("");
  //   }
  // }, [router.query]);

  // useSearchFilterData({ setValues, setPayload, router });

  // const [getCars, { data, loading }] = useGetCarsLazyQuery({
  //   variables: { input: values as unknown as SearchInput },
  //   fetchPolicy: "network-only",
  // });

  // useEffect(() => {
  //   if (data?.getCars && !loading) {
  //     setMainLoading(false);
  //   }
  // }, [loading, data]);

  // useEffect(() => {
  //   if (values && !isSearch) {
  //     getCars({ variables: { input: values as unknown as SearchInput } });
  //   }
  // }, [values, isSearch]);

  // useEffect(() => {
  //   if (data?.getCars) {
  //     setCars([...data.getCars]);
  //   }
  // }, [data]);

  return (
    <>
      {/* {" "}
      <CustomHead title="Browse Cars" />
      <Layout>
        <div style={{ backgroundColor: "#eaecee" }}>
          <div className="customContainer mt-2">
            {!mainLoading && (
              <h1 className="m-0">
                {title.replace(/\b\w/g, (l) => l.toUpperCase())} Rentals
              </h1>
            )}
          </div>
        </div>
        <SearchContent
          loading={mainLoading}
          isSearch={isSearch}
          cars={cars!}
          setValues={setValues}
          setIsSearch={setIsSearch}
          setPayload={setPayload}
          payload={payload!}
        />
      </Layout> */}
    </>
  );
};

export default BrowseByMake;
