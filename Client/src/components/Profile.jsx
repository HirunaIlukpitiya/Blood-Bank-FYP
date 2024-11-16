import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import QR from "../assets/image/qr-scan.svg";
import BackButton from "./backButton";
import axios from "axios";

function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [user, setUser] = useState({
    Image: "",
    FirstName: "",
    LastName: "",
    DOB: "",
    Gender: "",
    NIC: "",
    QRcode: "",
    Address: "",
    Email: "",
    Phone: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/donor/getDonor/${userId}/null`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = user.QRcode;
    link.download = 'qr-code.png';
    link.click();
  };

  const ageCal = (dob) => {
    const date = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age;
  };

  return (
    <>
      <div className="relative">
        <BackButton />
        <div className="text-center pb-2">
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
                <span className="col-span-2">{ageCal(user.DOB)}</span>
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
        <div className="pt-5 pb-5 w-full text-center flex justify-center">
          <img src={user.QRcode} alt="qr" className="w-60 h-60" />
        </div>
        <div className="flex justify-center">
          <div className="bg-bloodred1 w-1/2 rounded-xl p-3 text-white flex items-center space-x-5" onClick={downloadQR}>
            <FeatherIcon icon="download" className="text-white" /> <span>Download QR</span>
          </div>
        </div>
        <hr className="pb-5" />
      </div>
      <div className="space-y-2 absolute right-5 bottom-5">
        <div className="bg-bloodred1 text-white rounded-full p-3" onClick={handleEdit}>
          {isEditMode ? <FeatherIcon icon="save" /> : <FeatherIcon icon="edit" />}
        </div>
      </div>
    </>
  );
}

export default Profile;