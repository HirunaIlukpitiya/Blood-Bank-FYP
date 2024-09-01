import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";

function DashHome() {
    
  return (
    <>
      <div className="w-full">
        <section className="w-full grid grid-cols-2 gap-5">
          <div className="">
            <div className="bg-white  drop-shadow-lg rounded-xl p-2">
              <div className="grid grid-cols-2">
                <div className="flex justify-start items-center px-3 text-bloodred3 font-semibold text-5xl">
                  {20}
                </div>
                <span className="flex items-center">Blood Donation count</span>
              </div>
            </div>
          </div>
          <div className="bg-white  drop-shadow-lg rounded-xl p-2">
            <div className="grid grid-cols-2">
              <div className="flex justify-start items-center px-3 text-bloodred3 font-semibold text-5xl">
                {"O+"}
              </div>
              <span className="flex items-center">Your Blood Group</span>
            </div>
          </div>
          <div className="bg-white  drop-shadow-lg rounded-xl p-2">
            <div className="grid grid-cols-2">
              <div>
                <div className="flex justify-start items-center px-3 text-bloodred3 font-semibold text-5xl">
                  {74}
                </div>
                <span className="flex justify-start px-3">Days</span>
              </div>
              <span className="flex items-center">Time to next donation</span>
            </div>
          </div>
          <div className="bg-white drop-shadow-lg rounded-xl p-2">
            <Link to="/user/dash/req">
            <div className="grid grid-cols-2 h-full">
              <div className="flex justify-start items-center px-3 text-bloodred3 font-semibold text-5xl">
                {5}
              </div>
              <span className="flex items-center">Requests</span>
            </div>
            </Link>
          </div>
        </section>

        <section className="w-full mt-10">
            <Link to="/user/dash/applyDonate">
          <div className="bg-white drop-shadow-lg rounded-xl p-2">
            <div className="flex justify-center p-3 space-x-2">
              <FeatherIcon
                icon="droplet"
                className=""

              />
              <span className="flex items-center text-3xl">
                Donate Blood
              </span>
            </div>
          </div>
            </Link>
        </section>

        <section className="w-full mt-5">
            <Link to="/user/dash/camps">
          <div className="bg-white drop-shadow-lg rounded-xl p-2">
            <div className="flex justify-center p-3 space-x-2">
                <FeatherIcon
                    icon="map-pin"
                    className=""/>
              <span className="flex items-center text-3xl">
                Donation Camps
              </span>
            </div>
          </div>
            </Link>
        </section>
      </div>
    </>
  );
}

export default DashHome;
