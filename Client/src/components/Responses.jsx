import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Responses() {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const [requests, setRequests] = useState([]);
    const [responses, setResponses] = useState([]);
    const [selectedReq, setSelectedReq] = useState("");
    const [selectedReqResponses, setSelectedReqResponses] = useState([]);

    const setReq = (req) => {
      if (req.length === 0) {
        return;
      }
      req.map((r) => {
        setRequests((prevReq) => [...prevReq, r.Title]);
      });
      setSelectedReq(req[0].Title); 
    };

    const filterResponses = (reqTitle) => {
      setSelectedReq(reqTitle);
      const selectedReqResponses = responses.filter((response) => response.Title === selectedReq);
      setSelectedReqResponses(...selectedReqResponses, selectedReqResponses);
    }

    const handleChange = (e) =>{
      filterResponses(e.target.value);
    }

  useEffect(() => {
    axios.get(`http://localhost:5000/donor/getCreatedRequest/${userId}`)
    .then((res) => {
        console.log(res.data);
        setReq(res.data);
    })
    .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
            position: "bottom-right",
        });
    })
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/donor/getDonationResponse/${userId}`)
      .then((res) => {
        console.log(res.data);
        setResponses(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: "bottom-right",
        });
    });
  }, []);


  return (
    <div>
       {requests.length > 0 ? (<div className="">
            <div className="pb-5">
            <h1 className="pb-2">Select Request</h1>
            <select name="request" className="h-12 border-2 rounded-xl px-3 w-full" value={selectedReq} onChange={handleChange}>
                <option value="select">Select</option>
                {requests.map((request, index) => {
                    return <option key={index} value={request}>{request}</option>
                })}
            </select>
            </div>
        {selectedReqResponses.length > 0 ? (<table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Contact number</th>
            </tr>
          </thead>
          <tbody>
            {selectedReqResponses.map((response, index) => {
              return (
                <tr className="hover:bg-bloodred3/10" key={index}>
                  <td className="border px-4 py-2">{response.Name}</td>
                  <td className="border px-4 py-2">
                    {response.ContactNumber}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>) : <h1 className="text-center">No Responses Found</h1>}
        </div>) : <h1 className="text-center">No Active Request Found</h1>}
    </div>
  );
}

export default Responses;