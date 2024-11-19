import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'

function Stockmoniter() {
    const location = useLocation();

    return (
        <div className="h-full flex flex-col">
        <div className = "flex h-10 w-full justify-around">
          <Link to="liveStock" className="w-full">
          <div className={`flex space-x-2 items-center justify-center p-2 border-b-2 ${location.pathname.includes("liveStock") ? "border-b-bloodred1" : ""} border-x-2`}>
            <FeatherIcon icon="user-plus" className="w-5"/>
            <span>Current stock level</span>
          </div>
          </Link>
          <Link to="AiPrediction" className="w-full">
          <div className={`flex space-x-2 items-center justify-center p-2 border-b-2 ${location.pathname.includes("AiPrediction") ? "border-b-bloodred1" : ""} border-x-2`}>
            <FeatherIcon icon="file" className="w-5"/>
            <span>Demand Prediction</span>
          </div>
          </Link>
          <Link to="stockSettings" className="w-full">
          <div className={`flex space-x-2 items-center justify-center p-2 border-b-2 ${location.pathname.includes("stockSettings") ? "border-b-bloodred1" : ""} border-x-2`}>
            <FeatherIcon icon="user-check" className="w-5"/>
            <span>Stock Settings</span>
          </div>
          </Link>
        </div>
        <div className="overflow-y-auto flex-grow">
          <Outlet/>
          </div>
      </div>
    )
}

export default Stockmoniter;