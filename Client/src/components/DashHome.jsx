import axios from "axios";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DashHome() {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/donor/getDonorDashDetails/${userId}`)
    .then((response) => {
        console.log(response.data);
        setUserData(response.data);
    })
    .catch((err) => {
        console.log(err);
    })
  }, []);
  return (
    <>
      <div className="w-full pt-5">
        <section className="w-full grid grid-cols-2 gap-5">
          <div className="">
            <div className="bg-white  drop-shadow-lg rounded-xl p-2">
              <div className="grid grid-cols-2">
                <div className="flex justify-start items-center px-3 text-bloodred3 font-semibold text-5xl">
                  {userData.DonationData}
                </div>
                <span className="flex items-center">Blood Donation count</span>
              </div>
            </div>
          </div>
          <div className="bg-white  drop-shadow-lg rounded-xl p-2">
            <div className="grid grid-cols-2">
              <div className="flex justify-start items-center px-3 text-bloodred3 font-semibold text-5xl">
                {userData.BloodGroup}
              </div>
              <span className="flex items-center">Your Blood Group</span>
            </div>
          </div>
          <div className="bg-white  drop-shadow-lg rounded-xl p-2">
            <div className="grid grid-cols-2">
              <div>
                <div className="flex justify-start items-center px-3 text-bloodred3 font-semibold text-5xl">
                  {userData.DateToNextDonate}
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
                {userData.DonationRequest}
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
