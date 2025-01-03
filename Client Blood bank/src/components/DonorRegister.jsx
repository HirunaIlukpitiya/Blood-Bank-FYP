import axios from "axios";
import FeatherIcon from "feather-icons-react";
import React, { useState, useRef} from "react";
import { toast, ToastContainer } from "react-toastify";
import { useOverlay } from "../context/overlayContext";
import Webcam from "react-webcam";
function DonerRegister() {
  const {showSpinner, hideSpinner} = useOverlay();
  const [formData, setFormData] = useState({});
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCameraOpen = () => {
    setIsCameraOpen(!isCameraOpen);
  };
  const handleTakePicture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setFormData({ ...formData, Image: imageSrc });
    setIsCameraOpen(false);
  };

  const handleSubmit = () => {
    showSpinner();
    console.log(formData);
    axios.post("http://localhost:5000/auth/donorRegister", formData)
    .then((response) => {
      toast.success(response.data.message, {
        position: "bottom-right",
      });
      console.log(response);
      setFormData({});
      setCapturedImage(null);
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.message, {
        position: "bottom-right",
      });
    })
    .finally(() => {
      hideSpinner();
    });

  };

  return (
    <>
      <div className="font-poppin text-Ash">
        <div className="w-full px-5">
          <div className="flex-row justify-center w-full px-[25%] py-10">
            <h1 className="text-bloodred2 text-3xl pb-4 font-semibold flex justify-center">
              Create Account
            </h1>
            <div className="flex justify-between">
              <div className="">
              <div className="">
                <label htmlFor="FirstName" className="text-2xl">
                  First Name
                </label>
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  onChange={handleChange}
                  value={formData.FirstName || ""}
                  className="w-full h-12 border-2 rounded-lg px-4"
                  placeholder="Enter First name"
                />
              </div>
              <div className="pt-3">
                <label htmlFor="FirstName" className="text-2xl">
                  Birth Date
                </label>
                <input
                  type="date"
                  id="DOB"
                  name="DOB"
                  onChange={handleChange}
                  value={formData.DOB || ""}
                  className="w-full h-12 border-2 rounded-lg px-4"
                  placeholder="Enter First name"
                />
              </div>
              <div className="pt-3 ">
                <label htmlFor="Email" className="text-2xl">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  onChange={handleChange}
                  value={formData.Email || ""}
                  className="w-full h-12 border-2 rounded-lg px-4"
                  placeholder="Enter Email"
                />
              </div>
              <div className="py-3 ">
                <label htmlFor="Gender" className="text-2xl">
                  Gender
                </label>
                <select
                  id="Gender"
                  name="Gender"
                  onChange={handleChange}
                  value={formData.Gender || "select"}
                  className="w-full h-12 border-2 rounded-lg px-4"
                >
                  <option disabled value="select">
                    Select
                  </option>
                  <option value="Male">male</option>
                  <option value="Female">female</option>
                </select>
              </div>
              </div>
              <div className="">
              <div className="">
                <label htmlFor="LastName" className="text-2xl">
                  Last Name
                </label>
                <input
                  type="text"
                  name="LastName"
                  id="LastName"
                  onChange={handleChange}
                  value={formData.LastName || ""}
                  className="w-full h-12 border-2 rounded-lg px-4"
                  placeholder="Enter Last name"
                />
              </div>
              <div className="pt-3 ">
                <label htmlFor="NIC" className="text-2xl">
                  NIC
                </label>
                <input
                  type="text"
                  name="NIC"
                  id="NIC"
                  onChange={handleChange}
                  value={formData.NIC || ""}
                  className="w-full h-12 border-2 rounded-lg px-4"
                  placeholder="Enter NIC"
                />
              </div>
              <div className="pt-3 ">
                <label htmlFor="Phone" className="text-2xl">
                  Phone number
                </label>
                <input
                  type='tel'
                  name="Phone"
                  id="Phone"
                  onChange={handleChange}
                  value={formData.Phone || ""}
                  className="w-full h-12 border-2 rounded-lg px-4"
                  placeholder="Enter Phone"
                />
              </div>
              <div className="py-3 ">
                <label htmlFor="BloodGroup" className="text-2xl">
                  Blood Group
                </label>
                <select
                  id="BloodGroup"
                  name="BloodGroup"
                  onChange={handleChange}
                  value={formData.BloodGroup || "select"}
                  className="w-full h-12 border-2 rounded-lg px-4"
                >
                  <option disabled value="select">
                    Select
                  </option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              </div>
            </div>
            <div className={`w-full h-auto ${!isCameraOpen && !capturedImage ? "flex" : ""} justify-center bg-white p-2 border-dashed border-2`}>
            {capturedImage && !isCameraOpen && (
        <div className="w-full h-auto flex justify-center bg-white p-2 border-dashed border-2 mt-2">
          <img src={capturedImage} alt="Captured" className="w-full h-auto" />
        </div>
      )}
              {!isCameraOpen && <button className="flex space-x-2 items-center w-full justify-center" onClick={handleCameraOpen}>
                <FeatherIcon icon="camera" className="text-2xl" /> <span>open camera</span>
              </button>}
              {isCameraOpen && (
        <div className="w-full h-auto flex justify-center bg-white p-2 border-dashed border-2">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-auto"
            mirrored={true}
          />
        </div>
      )}
      {isCameraOpen && <div className=" flex pt-3 justify-around ">
        <button className="flex w-60 justify-center items-center space-x-2 p-2 bg-bloodred4 hover:bg-bloodred4/80 rounded-lg" onClick={handleTakePicture}>
          <FeatherIcon icon="aperture" className="text-2xl text-white w-5" /> 
          <span className="text-white">Capture</span>
        </button>
        <button className="flex w-60 justify-center items-center space-x-2 bg-slate-200 hover:bg-slate-300 rounded-lg" onClick={() => setIsCameraOpen(false)}>
          <FeatherIcon icon="camera-off" className="text-2xl w-5" />
          <span>Close</span>
        </button>
      </div>}
            </div>
            <button
                onClick={handleSubmit}
                className="w-full h-12 bg-bloodred4 text-white rounded-full mt-4"
              >
                Create
              </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default DonerRegister;
