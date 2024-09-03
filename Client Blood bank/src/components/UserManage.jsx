import React from "react";
import { Outlet, useLocation, Link} from "react-router-dom";
import FeatherIcon from "feather-icons-react";

function UserManage() {
  const location = useLocation();

  return (
<div className="h-full flex flex-col">
      <div className = "flex h-10 w-full justify-around">
        <Link to="adduser" className="w-full">
        <div className={`flex space-x-2 items-center justify-center p-2 border-b-2 ${location.pathname.includes("adduser") ? "border-b-bloodred1" : ""} border-x-2`}>
          <FeatherIcon icon="user-plus" className="w-5"/>
          <span>Add User</span>
        </div>
        </Link>
        <Link to="view" className="w-full">
        <div className={`flex space-x-2 items-center justify-center p-2 border-b-2 ${location.pathname.includes("view") ? "border-b-bloodred1" : ""} border-x-2`}>
          <FeatherIcon icon="users" className="w-5"/>
          <span>Users</span>
        </div>
        </Link>
      </div>
      <div className="overflow-y-auto flex-grow">
        <Outlet/>
        </div>
    </div>
  );
}

export default UserManage;