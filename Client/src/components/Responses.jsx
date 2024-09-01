

function Responses() {
    const responses = [
    {
        Name: "Name 1",
        ContactNumber: "1234567890",
    },]

    const RequestList = [
        "Request 1",
        "Request 2",
    ]
  return (
    <div>
        <div className="">
            <div className="pb-5">
            <h1 className="pb-2">Select Request</h1>
            <select name="request" className="h-12 border-2 rounded-xl px-3 w-full">
                <option value="select">Select</option>
                {RequestList.map((request, index) => {
                    return <option key={index} value={request}>{request}</option>
                })}
            </select>
            </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Contact number</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => {
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
        </table>
        </div>
    </div>
  );
}

export default Responses;