import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useOverlay } from "../context/overlayContext";

function MakeRequest(){
    const userId = JSON.parse(localStorage.getItem("userId"));
    const { showSpinner, hideSpinner } = useOverlay();
    const today = new Date().toISOString().slice(0, 16);
    const [formData, setFormData] = useState({ Id: userId });
  
    useEffect(() => {
      setFormData((prevFormData) => ({ ...prevFormData, Id: userId }));
    }, [userId]);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = () => {
      showSpinner();
      const updatedFormData = { ...formData, Id: userId };
      console.log(updatedFormData);
      axios
        .post(`http://localhost:5000/donor/findDonor`, updatedFormData)
        .then((response) => {
          console.log(response);
          setFormData({ Id: userId });
          toast.success(response.data.message, {
            position: "bottom-right",
          });
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
        <div>
            <ToastContainer />
            <div className="bg-bloodred1/10 p-5 rounded-xl">
                <div className="">
                    <div className="flex flex-col space-y-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="Title" className="">Title</label>
                            <input type="text" name="Title" value={formData.Title || ""} className="h-12 border-2 rounded-xl px-3" onChange={handleChange} placeholder=""/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="RequestLocation" className="">Location</label>
                            <input type="text" name="RequestLocation" value={formData.RequestLocation || ""} className="h-12 border-2 rounded-xl px-3" onChange={handleChange} placeholder="Enter location"/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="RequestDate" className="">Date</label>
                            <input type="datetime-local" name="RequestDate" value={formData.RequestDate || ""} className="h-12 border-2 rounded-xl px-3" onChange={handleChange} min={today}/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="RequestBloodGroup" className="">Blood Group</label>
                            <select name="RequestBloodGroup" onChange={handleChange} value={formData.RequestBloodGroup || ""} className="h-12 border-2 rounded-xl px-3">
                            <option value="select">Select</option>
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
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="RequestMessage" className="">Message</label>
                            <textarea type="text" name="RequestMessage" value={formData.RequestMessage || ""} className="h-32 border-2 rounded-xl px-3" onChange={handleChange}/>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-bloodred3 text-white h-12 w-full rounded-full" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeRequest;