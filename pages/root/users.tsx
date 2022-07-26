import React, { useEffect, useState } from "react";
import { AdminAuthWrapper } from "../../components/AdminAuthWrapper";
import { CustomHead } from "../../components/CustomHead";
import AdminLayout from "../../components/layouts/AdminLayout";
import FlexibleLoader from "../../components/Loading/FlexibleLoader";
import {
  useGetAllUsersQuery,
  User,
} from "../../graphql_types/generated/graphql";

interface IUsersProps {}

export default function Users({}: IUsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const { data, loading } = useGetAllUsersQuery();

  useEffect(() => {
    if (data?.getUsers) {
      setUsers(data.getUsers);
    }
  }, [data]);

  return (
    <>
      <CustomHead title="Admin - Users" />
      <AdminAuthWrapper>
        <AdminLayout>
          {loading ? (
            <FlexibleLoader />
          ) : (
            <div>
              <ul>
                {users.map((user) => (
                  <li key={user.id}>{user.email}</li>
                ))}
              </ul>
            </div>
          )}
        </AdminLayout>
      </AdminAuthWrapper>
    </>
  );
}
