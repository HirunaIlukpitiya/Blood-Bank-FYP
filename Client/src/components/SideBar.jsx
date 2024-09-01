import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SideBar(props) {
  const sideBarToggled = props.sideBarToggled;

  return (
    <>
      <div className="w-full backdrop-blur-sm bg-white/30 ">
        <div
          className={`w-[60%] backdrop-blur-sm bg-bloodred4 text-white h-screen animate-fade-right animate-duration-500`}
        >
          <div className="h-full p-5 flex flex-col justify-between">
            <div className=" space-y-10">
            <div className=" flex justify-end">
              <button onClick={sideBarToggled}>
                <FeatherIcon icon="x" />
              </button>
            </div>
            <img src="" />

            <div className="space-y-6">
              <div className=" hover:bg-bloodred6 rounded-xl animate-fade-up">
              <Link to="/user/dash/home">
                <div className="flex items-center p-2 space-x-5" onClick={sideBarToggled}>
                <FeatherIcon icon="home" />
                <span>Dashboard</span>
                </div>
              </Link>
              </div>
              <div className=" hover:bg-bloodred6 rounded-xl animate-fade-up animate-delay-100">
              <Link to="/user/dash/history">
              <div className="flex items-center space-x-5 p-2" onClick={sideBarToggled}>
                <FeatherIcon icon="file-text" />
                <span>History</span>
                </div>
              </Link>
              </div>
              <div className=" hover:bg-bloodred6 rounded-xl animate-fade-up animate-delay-200">
              <Link to="/user/dash/donerfind">
              <div className="flex items-center space-x-5 p-2" onClick={sideBarToggled}>
                <FeatherIcon icon="users" />
                <span>Find a Donor</span>
              </div>
              </Link>
              </div>
              {/* <div className=" hover:bg-bloodred6 p-2 rounded-xl animate-fade-up animate-delay-300">
              <Link to="/user/dash/req">
              <div className="flex items-center space-x-5" onClick={sideBarToggled}>
                <FeatherIcon icon="inbox" />
                <span>Requests</span>
              </div>
              </Link>
              </div> */}
            </div>
            </div>
            <div className="flex justify-center">
              <p>Version Number</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
