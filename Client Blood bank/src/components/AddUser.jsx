import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useOverlay } from "../context/overlayContext";

function AddUser() {
    const {showSpinner, hideSpinner} = useOverlay();
    const [formData, setFormData] = useState({});
    const bloodbankId = JSON.parse(localStorage.getItem("user")).bloodBankId;


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

  const handleSubmit = () => {
    showSpinner();
    console.log(formData);
    let data = formData;
    data = {...data, bloodBankId: bloodbankId};
    console.log(data);
    axios.post("http://localhost:5000/user/addUser", data)
    .then((response) => {
      console.log(response);
      toast.success(response.data.message, {
        position: "bottom-right"
      });
      setFormData({});
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

  return (
<>
      <div className="font-poppin text-Ash">
        <div className="w-full px-5">
          <div className="flex-row justify-center w-full px-[25%] py-10">
            <h1 className="text-bloodred2 text-3xl pb-4 font-semibold flex justify-center">
              Create Account
            </h1>
            <div className="grid grid-cols-2 gap-5">
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
                  Register Number
                </label>
                <input
                  type="text"
                  id="RegNumber"
                  name="RegNumber"
                  onChange={handleChange}
                  value={formData.RegNumber || ""}
                  className="w-full h-12 border-2 rounded-lg px-4"
                  placeholder="Enter Register Number"
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
                <label htmlFor="AccountType" className="text-2xl">
                  Account Type
                </label>
                <select
                  id="AccountType"
                  name="AccountType"
                  onChange={handleChange}
                  value={formData.AccountType || ""}
                  className="w-full h-12 border-2 rounded-lg px-4"
                >
                    <option value="select">Select</option>
                    <option value="MedicalOfficer">Medical Officer</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Ward">Ward</option>
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
                  Role Id
                </label>
                <select
                  id="RoleId"
                  name="RoleId"
                  onChange={handleChange}
                  value={formData.RoleId || "select"}
                  className="w-full h-12 border-2 rounded-lg px-4"
                >
                  <option disabled value="select">
                    Select 
                  </option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              </div>
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

export default AddUser;