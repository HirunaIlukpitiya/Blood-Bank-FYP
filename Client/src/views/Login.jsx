import FeatherIcon from "feather-icons-react";
import React, { useState } from "react";
import login from "../assets/image/login.svg";
function Login() {
  const [showPass, setShowPass] = useState(false);
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
          <img src={login} alt="login" className="h-screen w-full object-cover" />
        </div>
        <div className="h-screen flex items-center w-full px-5 md:">
            <div className=" md:flex-row md:justify-center w-full md:px-[25%] md:py-10">
                <h1 className="text-bloodred2 text-5xl pb-4 font-semibold justify-start">Welcome</h1>
                <div className="">
                  <div className="">
                  <label htmlFor="email" className="text-2xl">Email Address</label>
                  <input type="email" id="email" name="email" onChange={handleChange} className="w-full h-12 border-2 rounded-lg px-4" placeholder="Enter your email address" />
                  </div>
                  <div className="pt-3 ">
                  <label htmlFor="password" className="text-2xl">Password</label>
                  <div className="relative">
                  <input type={showPass ? "text" : "password"} id="password" onChange={handleChange} name="password" className="w-full h-12 border-2 rounded-lg px-4" placeholder="Enter your password" />
                  <span className="-ml-10 mt-3 absolute"><FeatherIcon onClick={() => setShowPass(!showPass)} icon={showPass ? "eye-off" : "eye"} color="black" opacity="40%"/></span>
                  </div>
                  </div>
                  <button type="submit" onClick={handleSubmit} className="w-full h-12 bg-bloodred4 text-white rounded-full mt-4">Login</button>
                </div>
                <p className="flex justify-center pt-3 text-bloodred2">Reset Password</p>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Login;