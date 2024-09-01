function History() {
  const donationHistory = [
    {
      Date: "12/12/2021",
      DonationNumber: "123456",
      Location: "Lagos",
    },
    {
      Date: "12/12/2021",
      DonationNumber: "123456",
      Location: "Lagos",
    },
  ];

  return (

    <div>
      <h1 className="text-3xl pb-10">
        Donation History
      </h1>
      <div>
        <table className="w-full">
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
        </table>
      </div>
    </div>
  );
}

export default History;
