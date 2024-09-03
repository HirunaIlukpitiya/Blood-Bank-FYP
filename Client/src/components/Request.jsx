import FeatherIcon from "feather-icons-react";
import ReqView from "../context/overlays/ReqView";
import { useOverlay } from "../context/overlayContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
function Request() {
const {showReqView, hideReqView, setReqViewVisible} = useOverlay();
const user = JSON.parse(localStorage.getItem("user"));
const [requests, setRequests] = useState([]);
const {showSpinner, hideSpinner} = useOverlay();

useEffect(() => {
  showSpinner();
  axios.get(`http://localhost:5000/donor/getDonationRequest/${user.Email}`)
  .then(res => {
    console.log(res.data);
    setRequests(res.data);
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
}, []);
const viewRequest = () => {
        showReqView();
};
const handleConfirm = () => {
        hideReqView();

};
const handleCancel = () => {
        hideReqView();
};
    return (
    <>
      <div>
        <ReqView confirmFunction = {handleConfirm} cancelFunction={handleCancel}/>
        <h1 className="text-2xl pb-5">Requests</h1>
        <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Date & Time</th>
              <th className="border px-4 py-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => {
              return (
                <tr className="hover:bg-bloodred3/10" key={index}>
                  <td className="border px-4 py-2">{request.RequestDate}</td>
                  <td className="border px-4 py-2 flex justify-between">
                    {request.RequestLocation}
                    <div className="flex">
                    <FeatherIcon icon="eye" className="ml-2 w-5 opacity-50" onClick={viewRequest} />
                    <FeatherIcon icon="trash-2" className="ml-2 w-5 opacity-50 text-red-700" />
                  </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}

export default Request;