import React, { useEffect, useState } from "react";
import DashNav from "./DashNav";
import DashSideBar from "./SideBar";
import morning from "../assets/image/morning.png";
import afternoon from "../assets/image/afternoon.png";
import evening from "../assets/image/evening.png";
import night from "../assets/image/night.png";
import { Outlet, useLocation } from "react-router-dom";

function DashBoardLayout() {
  const [sideBarToggled, setSideBarToggled] = useState(false);
  const [greetingMsg, setGreetingMsg] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const location = useLocation();
  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 5 && hours < 12) {
      setGreetingMsg(` Good Morning !`);
      setImgSrc(morning);
    } else if (hours >= 12 && hours < 17) {
      setGreetingMsg(` Good Afternoon !`);
      setImgSrc(afternoon);
    } else if (hours >= 17 && hours < 21) {
      setGreetingMsg(` Good Evening !`);
      setImgSrc(evening);
    } else {
      setGreetingMsg(` Hello ! You're up late.`);
      setImgSrc(night);
    }
  }, []);

  const handleSideBarToggle = () => {
    setSideBarToggled(!sideBarToggled);
  };

  return (
    <div className="relative h-screen w-full font-poppins text-Ash flex">
      {sideBarToggled && (
        <div className="absolute z-50 w-full">
          <DashSideBar sideBarToggled={handleSideBarToggle} />
        </div>
      )}
      <div className="flex flex-col w-full">
        <div className="sticky top-0 z-10">
        <DashNav sideBarToggled={handleSideBarToggle} />
        </div>
        <div className={`${location.pathname.includes("home") ? "" : "hidden pb-5"} px-5 md:hidden flex justify-start items-center`}>
          <img src={imgSrc} className="w-10" />
          <p className="text-2xl">&nbsp;{greetingMsg}</p>
        </div>
        <div className="px-5 flex-grow overflow-y-auto">
        <Outlet />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default DashBoardLayout;
