import React, { FC, useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { ListBox } from "../../components/Root/Listings/ListBox";
import { useGetUnVerifiedCarsQuery } from "../../graphql_types/generated/graphql";

interface ListingsProps {}

/**
 * @author
 * @function @Listings
 **/

const Listings: FC<ListingsProps> = (props) => {
  const [cars, setCars] = useState<any[]>([]);
  const { data } = useGetUnVerifiedCarsQuery();

  useEffect(() => {
    if (data?.getUnVerifiedCars) {
      setCars(data.getUnVerifiedCars);
    }
  }, [data]);

  console.log("data :>> ", data);
  console.log("cars :>> ", cars);
  return (
    <AdminLayout>
      {cars.map((car) => (
        <ListBox key={car.id} data={car} />
      ))}
    </AdminLayout>
  );
};

export default Listings;
