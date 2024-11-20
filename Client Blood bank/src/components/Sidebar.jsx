import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import packageJson from '../../package.json';
import imageSrc from "../assets/logo.png";

function SideBar(props) {
  const user = JSON.parse(localStorage.getItem("user"));

    return (
      <>
        <div className="">
          <div
            className={`backdrop-blur-sm bg-bloodred4 text-white h-screen`}
          >
            <div className="h-full p-5 flex flex-col justify-between">
              <div className=" space-y-10">
              <img src={imageSrc} className="w-40"/>
              <div className="space-y-6">
              {user.RoleId == 5 || user.RoleId == 2 && <div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
                <Link to="request">
                <div className="flex items-center space-x-5 p-2">
                  <FeatherIcon icon="droplet" />
                  <span>{`Request Blood ${user.RoleId == 2 ? "(Ward)":""}`}</span>
                </div>
                </Link>
                </div>}

                {(user.RoleId == 2 || user.RoleId == 3 || user.RoleId == 4 ) && (<div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
                <Link to="stocks">
                  <div className="flex items-center p-2 space-x-5">
                  <FeatherIcon icon="database" />
                  <span>Stock Monitor</span>
                  </div>
                </Link>
                </div>)}

                {(user.RoleId == 2 || user.RoleId == 3 || user.RoleId == 4 ) && (<div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
                <Link to="donor">
                <div className="flex items-center space-x-5 p-2">
                  <FeatherIcon icon="users" />
                  <span>Donor Manage</span>
                  </div>
                </Link>
                </div>)}

                {(user.RoleId == 2) && (<div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
                <Link to="manageuser">
                <div className="flex items-center space-x-5 p-2">
                  <FeatherIcon icon="user" />
                  <span>User Manage</span>
                </div>
                </Link>
                </div>)}

                {(user.RoleId == 2 || user.RoleId == 3 || user.RoleId == 4 ) && (<div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
                <Link to="issueblood">
                <div className="flex items-center space-x-5 p-2">
                  <FeatherIcon icon="inbox" />
                  <span>Blood Requests</span>
                </div>
                </Link>
                </div>)}

                {(user.RoleId == 2 || user.RoleId == 3 || user.RoleId == 4 ) && (<div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
                <Link to="request">
                <div className="flex items-center space-x-5 p-2">
                  <FeatherIcon icon="droplet" />
                  <span>Request Blood</span>
                </div>
                </Link>
                </div>)}

                {/* {(user.RoleId == 2 || user.RoleId == 3 || user.RoleId == 4 ) && (<div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
                <Link to="donorcamps">
                <div className="flex items-center space-x-5 p-2">
                  <FeatherIcon icon="map" />
                  <span>Donation Camps</span>
                </div>
                </Link>
                </div>)} */}

                {(user.RoleId == 2) && (<div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
                <Link to="stat">
                <div className="flex items-center space-x-5 p-2">
                  <FeatherIcon icon="pie-chart" />
                  <span>Statistic</span>
                </div>
                </Link>
                </div>)}

              </div>
              </div>
              <div className="flex">
                <p>Version: {packageJson.version}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default SideBar;
