import React, { FC, useEffect, useState } from "react";
import { AdminAuthWrapper } from "../../components/AdminAuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import AdminLayout from "../../components/layouts/AdminLayout";
import { Loading } from "../../components/Loading";
import { EnquiryBox } from "../../components/Root/Enquiries/EnquiryBox";
import {
  Contact,
  useGetEnquiriesQuery,
} from "../../graphql_types/generated/graphql";

interface IProps {}

const Enquiries: FC<IProps> = (props) => {
  const [mainLoading, setMainLoading] = useState(true);
  const { data, loading } = useGetEnquiriesQuery();
  const [enquiries, setEnquiries] = useState<Contact[]>([]);

  useEffect(() => {
    if (data?.enquiries && !loading) {
      setEnquiries(data.enquiries);
      setMainLoading(false);
    }
  }, [data, loading]);

  //   console.log("data", data);
  return (
    <>
      <CustomHead title="Admin - Enquiries" />
      <AdminAuthWrapper>
        <AdminLayout>
          <div className="customContainer my-3">
            {mainLoading ? (
              <Loading />
            ) : (
              <>
                <h3 className="mb-3">Enquiries</h3>
                {enquiries?.length === 0 ? (
                  <div>
                    <p>No enquiries yet!</p>
                  </div>
                ) : (
                  <div>
                    {enquiries.map((enq) => (
                      <EnquiryBox data={enq} key={enq.id} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    </>
  );
};

export default Enquiries;
