import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SideBar(props) {

  return (
    <>
      <div className="">
        <div
          className={`backdrop-blur-sm bg-bloodred4 text-white h-screen`}
        >
          <div className="h-full p-5 flex flex-col justify-between">
            <div className=" space-y-10">
            <img src="" />

            <div className="space-y-6">
              <div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
              <Link to="stocks">
                <div className="flex items-center p-2 space-x-5">
                <FeatherIcon icon="database" />
                <span>Stock Monitor</span>
                </div>
              </Link>
              </div>
              <div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
              <Link to="donor">
              <div className="flex items-center space-x-5 p-2">
                <FeatherIcon icon="users" />
                <span>Donor Manage</span>
                </div>
              </Link>
              </div>
              <div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
              <Link to="user">
              <div className="flex items-center space-x-5 p-2">
                <FeatherIcon icon="user" />
                <span>User Manage</span>
              </div>
              </Link>
              </div>
              <div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
              <Link to="issueblood">
              <div className="flex items-center space-x-5 p-2">
                <FeatherIcon icon="inbox" />
                <span>Blood Requests</span>
              </div>
              </Link>
              </div>
              <div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
              <Link to="request">
              <div className="flex items-center space-x-5 p-2">
                <FeatherIcon icon="droplet" />
                <span>Request Blood</span>
              </div>
              </Link>
              </div>
              <div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
              <Link to="donorcamps">
              <div className="flex items-center space-x-5 p-2">
                <FeatherIcon icon="map" />
                <span>Donation Camps</span>
              </div>
              </Link>
              </div>
              <div className=" hover:bg-bloodred1 hover:drop-shadow-xl rounded-xl">
              <Link to="stat">
              <div className="flex items-center space-x-5 p-2">
                <FeatherIcon icon="pie-chart" />
                <span>Statistic</span>
              </div>
              </Link>
              </div>
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
