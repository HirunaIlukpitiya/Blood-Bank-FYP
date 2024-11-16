import FeatherIcon from "feather-icons-react";
import { Link, useLocation, Outlet } from "react-router-dom";
import BackButton from "./backButton";


function DonerFind() {
    const location = useLocation();

  return (
    <div>
      <div className="flex items-center">
      <span><BackButton/></span><span className="text-4xl pb-2 pl-3 text-bloodred3 font-semibold">
        Doner Find
      </span>
      </div>
      <div className="grid grid-cols-2">
        <div className={`bg-white ${location.pathname.includes("makeReq") ? " drop-shadow" : "drop-shadow-lg"} rounded-l-xl p-2`}>
            <Link to="makeReq">
          <div className="flex justify-center p-3 space-x-2">
            <span className="flex items-center  text-xl">
              Make a Request
            </span>
          </div>
          </Link>
        </div>
        <div className={`bg-white ${location.pathname.includes("responses") ? " drop-shadow" : "drop-shadow-lg"} rounded-r-xl p-2`}>
            <Link to="responses">
          <div className="flex justify-center p-3 space-x-2">
            <span className="flex items-center text-xl">
              Responses
            </span>
          </div>
            </Link>
        </div>
      </div>
      <section className="w-full mt-10">
        <Outlet/>
        </section>
    </div>
  );
}

export default DonerFind;
