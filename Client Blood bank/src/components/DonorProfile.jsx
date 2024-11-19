import React, { useEffect, useState } from "react";
import QrScanner from "react-qr-scanner";
import FeatherIcon from "feather-icons-react";
import { ToastContainer, toast } from "react-toastify";
import SearchBar from "./SearchBar";
import axios from "axios";

function DonorProfile() {

    const [user, setUserProfile] = useState({
        Image: "",
        FirstName: "",
        LastName: "",
        DOB: "",
        Gender: "",
        NIC: "",
        Address: "",
        Email: "",
        Phone: ""
    });
    const [Email, setEmail] = useState("null");
    const [showScanner, setShowScanner] = useState(false);
    const [requestMaker, setRequestMaker] = useState(false);
    const [userId, setUserId] = useState("null");
    const [isEditMode, setIsEditMode] = useState(false);


    useEffect(() => {
        if (userId == "null" && Email == "null") return;

        setUserProfile(
            {
                Image: "",
                FirstName: "",
                LastName: "",
                DOB: "",
                Gender: "",
                NIC: "",
                Address: "",
                Email: "",
                Phone: ""
            }
        );


        console.log(Email);
        axios.get(`http://localhost:5000/donor/getDonor/${userId}/${Email}`)
        .then((res) => {
            console.log(res.data);
            setUserProfile(res.data);
        })
        .catch((err) => {
            console.error(err);
            setUserProfile(
                {
                    Image: "",
                    FirstName: "",
                    LastName: "",
                    DOB: "",
                    Gender: "",
                    NIC: "",
                    Address: "",
                    Email: "",
                    Phone: ""
                }
            );
            toast.error("Error fetching user profile", {
                position: "bottom-right",
            });
        })
        .finally(() => {
            setUserId("null");
            setEmail("null");
        });
    }, [requestMaker,userId]);

    if (userId === "") {
        setUserId("null");
      }
      if (Email === "") {
        setEmail("null");
      }

    const handleSearchChange = (e) => {
        setEmail(e.target.value);
        console.log(Email);
      };
    
      const handleSearch = (event) => {
        event.preventDefault();
        console.log("searching");
        if (Email === "" || !Email.includes("@")) {
          toast.error("Please enter a valid email address", {
            position: "bottom-right",
          });
          return;
        }
        setRequestMaker(!requestMaker);
      };
    
      const handleError = (err) => {
        console.error(err);
        toast.error("Error scanning QR code", {
          position: "bottom-right",
        });
      };
    
      const handleScan = (data) => {
        if (data) {
          processId(data.text);
          setShowScanner(false);
        }
      };
    
      const processId = (id) => {
        const parsedData = JSON.parse(id);
        const donorId = parsedData.donorId;
        console.log("Donor ID:", donorId);
        setUserId(donorId);
      };

      const ageCal = (dob) => {
        const date = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        return age;
      };

      const handleEdit = () => {
        setIsEditMode(!isEditMode);
      };


    return (
        <>
            <ToastContainer />
      <div
        className={
          user.NIC == ""
            ? "h-full w-full flex justify-center items-center"
            : "flex justify-center pt-5"
        }
      >
        <div className="w-[80%] flex justify-center space-x-5 h-12">
          <SearchBar
            handleSearch={handleSearchChange}
            text={Email}
            handleSubmit={handleSearch}
            placeholderText="Search by donor Email "
          />
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="bg-slate-100 px-3 border-2 border-slate-300 rounded-full"
          >
            <span className="flex">
              <span className="text-Ash pr-3">QR</span>{" "}
              <FeatherIcon icon="maximize" />
            </span>
          </button>
        </div>
        {showScanner && (
          <div className="absolute top-0 left-0 w-full h-full z-999 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg">
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
              <button
                onClick={() => setShowScanner(false)}
                className="mt-3 bg-red-500 text-white p-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

     {user.Email != "" && ( <div className="relative px-80">
        <div className="text-center py-2">
          <img
            src={user.Image}
            alt="profile"   
            className="w-40 h-40 rounded-full mx-auto"
          />
        </div>
        <h1 className="text-4xl text-center text-bloodred1 pb-5">{`${user.FirstName} ${user.LastName}`}</h1>

        <div>
          <div className="space-y-3">
            <div className="bg-white border-2 rounded-xl drop-shadow-lg">
              <h2 className="text-2xl p-2">Personal Info</h2>
              <hr />
              <div className="grid grid-cols-3 p-4 space-y-1">
                <p className="text-lg col-span-1">Birth Date:</p>
                <span className="col-span-2">{user.DOB}</span>
                <p className="text-lg col-span-1">Age:</p>
                <span className="col-span-2">{ageCal(user.DOB).toString()}</span>
                <p className="text-lg col-span-1">Gender:</p>
                <span className="col-span-2">{user.Gender}</span>
                <p className="text-lg col-span-1">NIC:</p>
                <span className="col-span-2">{user.NIC}</span>
              </div>
            </div>
            <div className="bg-white border-2 rounded-xl drop-shadow-lg overflow-hidden">
              <h2 className="text-2xl p-2">Contact Info</h2>
              <hr />
              <div className="grid grid-cols-3 space-y-1 p-4">
                <p className="text-lg col-span-1">Address:</p>
                <span className="col-span-2 break-words">
                  {user.Address}
                </span>
                <p className="text-lg col-span-1">Email:</p>
                <input type="text" disabled={!isEditMode} value={user.Email || ""} className="col-span-2" />
                <p className="text-lg col-span-1">Phone:</p>
                <input
                  type="text"
                  value={user.Phone || ""} disabled={!isEditMode}
                  className="col-span-2"
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="pb-5" />
      </div>
        )}
        {user.Email != "" && (
      <div className="space-y-2 absolute right-5 bottom-5">
        <div className="bg-bloodred1 text-white rounded-full p-3" onClick={handleEdit}>
          {isEditMode ? <FeatherIcon icon="save" /> : <FeatherIcon icon="edit" />}
        </div>
      </div>
      )}
            
        </>
    )
}

export default DonorProfile;