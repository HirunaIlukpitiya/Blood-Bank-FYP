import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useOverlay } from "../context/overlayContext";
import { toast } from "react-toastify";

function Activate() {
  const { showSpinner, hideSpinner } = useOverlay();
  const navigate = useNavigate();
  const { Email, token } = useParams();
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [formData, setFormData] = useState({});
  const [validURL, setValidURL] = useState(null);

  useEffect(() => {
    showSpinner();
    axios
      .get(`http://localhost:5000/auth/activationValidate/${Email}/${token}`)
      .then((response) => {
        console.log(response);
        setFormData({ Email: Email });
        if(response.status === 200){
          setValidURL(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setValidURL(false);
      })
      .finally(() => {
        hideSpinner();
      });
  }, [Email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    showSpinner();
    axios
      .post("http://localhost:5000/auth/activateAccount", formData)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
            position: "bottom-right"
        });
        setTimeout(() => {
            navigate("/user/dash");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
            position: "bottom-right"
        });
      })
      .finally(() => {
        hideSpinner();
      });
    
  };

  if (validURL === false) {
    return (
      <div className="font-poppins h-screen w-full text-Ash">
        <div className="h-screen flex items-center w-full px-5 md:">
          <div className=" md:flex-row md:justify-center w-full md:px-[35%] md:py-10">
            <h1 className="text-bloodred2 text-5xl pb-4 font-semibold justify-center">
              Invalid URL !
            </h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="font-poppins h-screen w-full text-Ash">
        <div className="h-screen flex items-center w-full px-5 ">
          <div className="flex-row justify-center w-full px-[35%] py-10">
            <h1 className="flex text-bloodred2 text-5xl pb-4 font-semibold justify-center">
              Activate account
            </h1>
            <div className="">
              <div className="">
                <label htmlFor="email" className="text-2xl">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  disabled
                  name="email"
                  onChange={handleChange}
                  className="w-full h-12 border-2 rounded-lg px-4"
                  placeholder={Email}
                />
              </div>
              <div className="pt-3 ">
                <label htmlFor="Password" className="text-2xl">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass1 ? "text" : "password"}
                    id="Password"
                    onChange={handleChange}
                    name="Password"
                    className="w-full h-12 border-2 rounded-lg px-4"
                    placeholder="Enter your password"
                  />
                  <span className="-ml-10 mt-3 absolute">
                    <FeatherIcon
                      onClick={() => setShowPass1(!showPass1)}
                      icon={showPass1 ? "eye-off" : "eye"}
                      color="black"
                      opacity="40%"
                    />
                  </span>
                </div>
              </div>
              <div className="pt-3 ">
                <label htmlFor="Cfpassword" className="text-2xl">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPass2 ? "text" : "password"}
                    id="Cfpassword"
                    onChange={handleChange}
                    name="Cfpassword"
                    className="w-full h-12 border-2 rounded-lg px-4"
                    placeholder="Enter your password"
                  />
                  <span className="-ml-10 mt-3 absolute">
                    <FeatherIcon
                      onClick={() => setShowPass2(!showPass2)}
                      icon={showPass2 ? "eye-off" : "eye"}
                      color="black"
                      opacity="40%"
                    />
                  </span>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full h-12 bg-bloodred4 text-white rounded-full mt-4"
              >
                Activate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Activate;
