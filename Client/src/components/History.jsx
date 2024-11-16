import axios from "axios";
import React, { useState, useEffect } from "react";
import BackButton from "./backButton";

function History() {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [donationHistory, setDonationHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/donor/getDonationData/${userId}`)
    .then((response) => {
      console.log(response.data);
      setDonationHistory(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  return (

    <div>
      <div className="flex items-center pb-5">
        <span><BackButton/></span>
      <span className="text-4xl pb-2 text-bloodred1 pl-3">
        Donation History
      </span>
      </div>
      <div>
       {donationHistory.length > 0 ?( <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Donation Number</th>
              <th className="border px-4 py-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {donationHistory.map((donation, index) => {
              return (
                <tr className="hover:bg-bloodred3/10" key={index}>
                  <td className="border px-4 py-2">{donation.Date}</td>
                  <td className="border px-4 py-2">
                    {donation.DonationNumber}
                  </td>
                  <td className="border px-4 py-2">{donation.Location}</td>
                </tr>
              );
            })}
          </tbody>
        </table> ) : (<h1 className="text-center">No Donation History Found</h1>)}
      </div>
    </div>
  );
}

export default History;
