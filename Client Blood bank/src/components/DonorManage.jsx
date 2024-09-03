import FeatherIcon from "feather-icons-react";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
function DonorManage() {
  const location = useLocation();

  return (
    <div className="h-full flex flex-col">
      <div className = "flex h-10 w-full justify-around">
        <Link to="register" className="w-full">
        <div className={`flex space-x-2 items-center justify-center p-2 border-b-2 ${location.pathname.includes("register") ? "border-b-bloodred1" : ""} border-x-2`}>
          <FeatherIcon icon="user-plus" className="w-5"/>
          <span>Register donor</span>
        </div>
        </Link>
        <Link to="application" className="w-full">
        <div className={`flex space-x-2 items-center justify-center p-2 border-b-2 ${location.pathname.includes("application") ? "border-b-bloodred1" : ""} border-x-2`}>
          <FeatherIcon icon="file" className="w-5"/>
          <span>Donor Application</span>
        </div>
        </Link>
        <Link to="profile" className="w-full">
        <div className={`flex space-x-2 items-center justify-center p-2 border-b-2 ${location.pathname.includes("profile") ? "border-b-bloodred1" : ""} border-x-2`}>
          <FeatherIcon icon="user-check" className="w-5"/>
          <span>Donors</span>
        </div>
        </Link>
      </div>
      <div className="overflow-y-auto flex-grow">
        <Outlet/>
        </div>
    </div>
  );
}

export default DonorManage;