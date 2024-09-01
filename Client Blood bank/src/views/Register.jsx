import React, { useState } from 'react';
import axios from 'axios';
import { useOverlay } from '../context/overlayContext';
import { toast, ToastContainer } from 'react-toastify';
function Register () {
    const {showSpinner, hideSpinner} = useOverlay(false);
    const [formData, setFormData] = useState({
       RoleId : 2,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        setFormData({
            ...formData,
            RoleId: 2
        });
        e.preventDefault();
        console.log(formData);
        showSpinner();
        axios.post('http://localhost:5000/auth/bankRegister', formData)
        .then((response) => {
            toast.success(response.data.message, {
                position: "bottom-right"
              });
          console.log(response);
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
        })
    }
    return (
        <>
        <div className="font-poppins h-screen w-full text-Ash">
          <div className="h-screen flex items-center w-full px-5 md:">
              <div className="flex-row justify-center w-full px-[35%] py-10">
                  <h1 className="text-bloodred2 text-5xl pb-4 font-semibold flex justify-center">Create Account</h1>
                  <div className="">
                    <div className="">
                    <label htmlFor="BankName" className="text-2xl">Blood bank Name</label>
                    <input type="text" id="BankName" name="BankName" onChange={handleChange} value={formData.BankName || ""} className="w-full h-12 border-2 rounded-lg px-4" placeholder="Enter Blood bank name" />
                    </div>
                    <div className="pt-3 ">
                    <label htmlFor="email" className="text-2xl">Email Address</label>
                    <input type="email" id="Email" name="Email" onChange={handleChange} value={formData.Email || ""} className="w-full h-12 border-2 rounded-lg px-4" placeholder="Enter Email address" />
                    </div>
                    <div className="pt-3 ">
                    <label htmlFor="location" className="text-2xl">Registration Number</label>
                    <input type="text" id="RegNumber" name="RegNumber" onChange={handleChange} value={formData.RegNumber || ""} className="w-full h-12 border-2 rounded-lg px-4" placeholder="Enter Location" />
                    </div>
                    <div className="pt-3 ">
                    <label htmlFor="phone" className="text-2xl">Phone Number</label>
                    <input type="text" id="Phone" name="Phone" onChange={handleChange} value={formData.Phone || ""} className="w-full h-12 border-2 rounded-lg px-4" placeholder="Enter Phone number" />
                    </div>
                    <div className="pt-3 ">
                    <label htmlFor="Address" className="text-2xl">Address</label>
                    <input type='text' name='Address' id='Address' onChange={handleChange} value={formData.Address || ""} className="w-full h-12 border-2 rounded-lg px-4" placeholder="Enter Address" />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="w-full h-12 bg-bloodred4 text-white rounded-full mt-4">Create</button>
                  </div>
              </div>
          </div>
        </div>
        <ToastContainer />
      </>
    )
}

export default Register;