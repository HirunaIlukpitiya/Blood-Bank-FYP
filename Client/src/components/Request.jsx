import FeatherIcon from "feather-icons-react";
import ReqView from "../context/overlays/ReqView";
import { useOverlay } from "../context/overlayContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import BackButton from "./backButton";
function Request() {
  const { showReqView, hideReqView, setReqViewVisible } = useOverlay();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [requests, setRequests] = useState([]);
  const { showSpinner, hideSpinner } = useOverlay();

  useEffect(() => {
    showSpinner();
    axios
      .get(`http://localhost:5000/donor/getDonationRequest/${userId}`)
      .then((res) => {
        console.log(res.data);
        setRequests(res.data);
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
  }, []);
  const viewRequest = (req) => {
    showReqView();
    if (req.ReadStatus == "unread") {
      axios.put(`http://localhost:5000/donor/updateReadStatus/${req._id}/${userId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
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
        <ReqView
          confirmFunction={handleConfirm}
          cancelFunction={handleCancel}
        />
        <div className="flex items-center">
          <span>
            <BackButton />
          </span>{" "}
          <span className="text-4xl pb-2 pl-3 text-bloodred3 font-semibold">
            Requests
          </span>
        </div>
        <div>
          {requests.length > 0 ? (
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
                      <td className="border px-4 py-2">
                        {request.RequestDate}
                      </td>
                      <td className="border px-4 py-2 flex justify-between">
                        {request.RequestLocation}
                        <div className="flex">
                          <FeatherIcon
                            icon="eye"
                            className="ml-2 w-5 opacity-50"
                            onClick={()=>viewRequest(request)}
                          />
                          <FeatherIcon
                            icon="trash-2"
                            className="ml-2 w-5 opacity-50 text-red-700"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-2xl text-Ash pt-10">
              No requests found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Request;
