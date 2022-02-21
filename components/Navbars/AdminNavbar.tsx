import React from "react";
import { UserNavIcon } from "./UserNavIcon";

interface AdminNavbarProps {}

const AdminNavbar = (props: AdminNavbarProps): JSX.Element => {
  // const token = useAppSelector((state) => state.auth._id);
  return (
    <div className={"adminNavbar shadow"}>
      <div className="w100 h-100 d-flex p-2 align-items-center">
        <div className="brand">
          <h1 className="m0">Caradil</h1>
        </div>
        <div className="mainNavLinks d-flex">
          <div className="mainNavLinksRight d-flex align-items-center justify-content-end">
            <div className="marginLeft30px">
              <div className="account-user-icon">
                <UserNavIcon isAdmin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
