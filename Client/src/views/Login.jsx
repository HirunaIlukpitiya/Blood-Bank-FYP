import FeatherIcon from "feather-icons-react";
import React, { useState } from "react";
import login from "../assets/image/login.svg";
import { useOverlay } from "../context/overlayContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Login() {
  const {showSpinner, hideSpinner} = useOverlay();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({});


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = () => {
    console.log(formData);
    showSpinner();
    axios.post(`http://localhost:5000/auth/donorLogin`, formData)
    .then(res => {
      toast.success(res.data.message, {
        position: "bottom-right",
      });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.donor));
      setTimeout(() => {
        navigate("/user/dash");
      }, 200);
    })
    .catch(err => {
      console.log(err);
      toast.error(err.response.data.message, {
        position: "bottom-right",
      });
    })
    .finally(() => {
      hideSpinner();
    });
  }

  return (
    <>
    <ToastContainer />
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
                  <label htmlFor="Email" className="text-2xl">Email Address</label>
                  <input type="email" id="Email" name="Email" onChange={handleChange} className="w-full h-12 border-2 rounded-lg px-4" placeholder="Enter your email address" />
                  </div>
                  <div className="pt-3 ">
                  <label htmlFor="Password" className="text-2xl">Password</label>
                  <div className="relative">
                  <input type={showPass ? "text" : "password"} id="Password" onChange={handleChange} name="Password" className="w-full h-12 border-2 rounded-lg px-4" placeholder="Enter your password" />
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