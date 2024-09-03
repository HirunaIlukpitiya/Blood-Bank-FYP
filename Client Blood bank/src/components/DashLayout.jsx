import React, { useEffect, useState } from "react";
import DashNav from "./DashNav";
import SideBar from "./SideBar";
import morning from "../assets/morning.png";
import afternoon from "../assets/afternoon.png";
import evening from "../assets/evening.png";
import night from "../assets/night.png";
import { Outlet, useLocation } from "react-router-dom";

function DashLayout() {
  const userName = "Hiruna";
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
      setGreetingMsg(` Have a great night !`);
      setImgSrc(night);
    }
  }, []);

  const handleSideBarToggle = () => {
    setSideBarToggled(!sideBarToggled);
  };

  return (
    <div className="flex relative h-screen w-full font-poppins text-Ash">
        <div className="w-1/6">
          <SideBar sideBarToggled={handleSideBarToggle} />
        </div>
      <div className="w-5/6 flex flex-col">
      <div className="px-5 h-fit drop-shadow">
        <DashNav className="" sideBarToggled={handleSideBarToggle} imgSrc={imgSrc} greetingMsg={greetingMsg}/>
        </div>
        <hr className=""/>
        <div className="flex-grow overflow-y-auto">
        <Outlet />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default DashLayout;
