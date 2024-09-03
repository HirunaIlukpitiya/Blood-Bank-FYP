import React from "react";
import SearchBar from "./SearchBar";
import FeatherIcon from "feather-icons-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOverlay } from "../context/overlayContext";
import Logout from "../context/overlays/Logout";

function DashNav(props) {
  const navigate = useNavigate();
  const { showLogout, hideLogout } = useOverlay();

  const confirmLogout = () => {
    hideLogout();
    localStorage.clear();
    navigate("/");
  };

  const cancelLogout = () => {
    hideLogout();
  };
  return (
    <>
      <Logout confirmFunction={confirmLogout} cancelFunction={cancelLogout} />

      <div className="dash-nav py-5 w-full">
        <div className="flex w-full justify-between space-x-3">
          <div className={`flex justify-start items-center`}>
            <img src={props.imgSrc} className="w-10" />
            <p className="text-2xl">&nbsp;{props.greetingMsg}</p>
          </div>
          <div className="w-[70%]">
            <SearchBar />
          </div>
          <div className="space-x-5">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="bg-Ash bg-opacity-30 flex justify-center items-center p-2 border-2 rounded-full"
              >
                <FeatherIcon icon="globe" className="text-bloodred3" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-box z-[10] w-25 p-2 shadow-lg"
              >
                <li className="animate-fade-up">
                  {" "}
                  <button>English</button>
                </li>
                <li className="animate-fade-up animate-delay-100">
                  {" "}
                  <button>Sinhala</button>
                </li>
                <li className="animate-fade-up animate-delay-200">
                  {" "}
                  <button>Tamil</button>
                </li>
              </ul>
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="bg-Ash bg-opacity-30 flex justify-center items-center p-2 border-2 rounded-full"
              >
                <FeatherIcon icon="user" className="text-bloodred3" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-box z-[10] w-25 p-2 shadow-lg"
              >
                {" "}
                <Link to="profile">
                  <li className="animate-fade-up">
                    <button>
                      <FeatherIcon icon="user" className="w-4" /> Profile
                    </button>
                  </li>
                </Link>
                <Link to="settings">
                  <li className="animate-fade-up animate-delay-100">
                    <button>
                      <FeatherIcon icon="settings" className="w-4" /> Settings
                    </button>
                  </li>
                </Link>
                <li
                  className="animate-fade-up animate-delay-200"
                  onClick={showLogout}
                >
                  <button>
                    <FeatherIcon icon="log-out" className="w-4" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashNav;
