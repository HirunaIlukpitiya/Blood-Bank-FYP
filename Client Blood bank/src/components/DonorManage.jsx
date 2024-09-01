import FeatherIcon from "feather-icons-react";
import { Outlet } from "react-router-dom";

function DonorManage() {
  return (
    <div className="">
      <div className = "flex h-10 w-full justify-around">
        <div className={`w-full flex space-x-2 items-center justify-center p-2 border-b-2 border-b-bloodred1 border-x-2`}>
          <FeatherIcon icon="user-plus" className="w-5"/>
          <span>Register donor</span>
        </div>
        <div className={`w-full flex space-x-2 items-center justify-center p-2 border-b-2 border-b-bloodred1 border-x-2`}>
          <FeatherIcon icon="file" className="w-5"/>
          <span>Donor Application</span>
        </div>
      </div>
      <div>
        <Outlet/>
        </div>
    </div>
  );
}

export default DonorManage;