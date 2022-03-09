import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { AdminAuthWrapper } from "../../components/AdminAuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import AdminLayout from "../../components/layouts/AdminLayout";
import { Loading } from "../../components/Loading";
import AddMakeModal from "../../components/Root/Make/AddMakeModal";
import { Make, useGetMakesQuery } from "../../graphql_types/generated/graphql";

interface CarMakesProps {}

const CarMakes: FC<CarMakesProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);

  const { data, loading } = useGetMakesQuery();
  const [makes, setMakes] = useState<Make[]>([]);
  const [showAddMakeModal, setShowAddMakeModal] = useState(false);

  useEffect(() => {
    if (data?.makes && !loading) {
      setMakes(data.makes);
      setMainLoading(false);
    }
  }, [data, loading]);

  const handleAddMakeClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowAddMakeModal(true);
  };

  return (
    <>
      <CustomHead title="Admin - Makes" />
      <AdminAuthWrapper>
        <AdminLayout>
          {mainLoading ? (
            <Loading />
          ) : (
            <div className="p-2">
              {showAddMakeModal && (
                <AddMakeModal
                  showModal={showAddMakeModal}
                  handleClose={() => setShowAddMakeModal(false)}
                />
              )}
              <div className="col-lg-6 mx-auto mt-2">
                <h3>Makes</h3>
                <div className="d-flex justify-content-end">
                  <button className="btn bgOrange" onClick={handleAddMakeClick}>
                    Add Make
                  </button>
                </div>

                <ul>
                  {makes?.length === 0 ? (
                    <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                      <h6>No Makes Yet!</h6>
                    </div>
                  ) : (
                    makes.map((make) => <li key={make.id}>{make.title}</li>)
                  )}
                </ul>
              </div>
            </div>
          )}
        </AdminLayout>
      </AdminAuthWrapper>
    </>
  );
};

export default CarMakes;
