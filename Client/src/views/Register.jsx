import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import register from "../assets/image/register.svg";
import { useParams } from "react-router-dom";
import axios from "axios";



function Register() {
  const {email} = useParams();
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }
  return (
<>
      <div className="font-poppins h-screen w-full text-Ash">
        <div className="md:grid grid-cols-2">
        <div className="hidden md:block">
          <img src={register} alt="login" className="h-screen w-full object-cover" />
        </div>
        <div className="h-screen flex items-center w-full px-5 md:">
            <div className=" md:flex-row md:justify-center w-full md:px-[25%] md:py-10">
                <h1 className="text-bloodred2 text-5xl pb-4 font-semibold justify-start">Activate Account</h1>
                <div className="">
                  <div className="">
                  <label htmlFor="email" className="text-2xl">Email Address</label>
                  <input type="email" id="email" disabled name="email" onChange={handleChange} className="w-full h-12 border-2 rounded-lg px-4" placeholder={email} />
                  </div>
                  <div className="pt-3 ">
                  <label htmlFor="password" className="text-2xl">Password</label>
                  <div className="relative">
                  <input type={showPass1 ? "text" : "password"} id="password" onChange={handleChange} name="password" className="w-full h-12 border-2 rounded-lg px-4" placeholder="Enter your password" />
                  <span className="-ml-10 mt-3 absolute"><FeatherIcon onClick={() => setShowPass1(!showPass1)} icon={showPass1 ? "eye-off" : "eye"} color="black" opacity="40%"/></span>
                  </div>
                  </div>
                  <div className="pt-3 ">
                  <label htmlFor="password" className="text-2xl">Confirm Password</label>
                  <div className="relative">
                  <input type={showPass2 ? "text" : "password"} id="cfpassword" onChange={handleChange} name="cfpassword" className="w-full h-12 border-2 rounded-lg px-4" placeholder="Enter your password" />
                  <span className="-ml-10 mt-3 absolute"><FeatherIcon onClick={() => setShowPass2(!showPass2)} icon={showPass2 ? "eye-off" : "eye"} color="black" opacity="40%"/></span>
                  </div>
                  </div>
                  <button type="submit" onClick={handleSubmit} className="w-full h-12 bg-bloodred4 text-white rounded-full mt-4">Activate</button>
                </div>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Register;