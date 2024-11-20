import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useOverlay } from "../context/overlayContext";

function CurrentStock() {
  const bloodBankId = JSON.parse(localStorage.getItem("user")).bloodBankId;
  const { showSpinner, hideSpinner } = useOverlay();
  const [minimumAlertLevel, setMinimumAlertLevel] = useState([]);
  const [stockData, setStockData] = useState({
    APositivePlatelets: 0,
    ANegativePlatelets: 0,
    BPositivePlatelets: 0,
    BNegativePlatelets: 0,
    ABPositivePlatelets: 0,
    ABNegativePlatelets: 0,
    OPositivePlatelets: 0,
    ONegativePlatelets: 0,
    APositivePlasma: 0,
    ANegativePlasma: 0,
    BPositivePlasma: 0,
    BNegativePlasma: 0,
    ABPositivePlasma: 0,
    ABNegativePlasma: 0,
    OPositivePlasma: 0,
    ONegativePlasma: 0,
    APositiveRBC: 0,
    ANegativeRBC: 0,
    BPositiveRBC: 0,
    BNegativeRBC: 0,
    ABPositiveRBC: 0,
    ABNegativeRBC: 0,
    OPositiveRBC: 0,
    ONegativeRBC: 0,
  });

  const [alert, setAlert] = useState({
    APositivePlatelets: false,
    ANegativePlatelets: false,
    BPositivePlatelets: false,
    BNegativePlatelets: false,
    ABPositivePlatelets: false,
    ABNegativePlatelets: false,
    OPositivePlatelets: false,
    ONegativePlatelets: false,
    APositivePlasma: false,
    ANegativePlasma: false,
    BPositivePlasma: false,
    BNegativePlasma: false,
    ABPositivePlasma: false,
    ABNegativePlasma: false,
    OPositivePlasma: false,
    ONegativePlasma: false,
    APositiveRBC: false,
    ANegativeRBC: false,
    BPositiveRBC: false,
    BNegativeRBC: false,
    ABPositiveRBC: false,
    ABNegativeRBC: false,
    OPositiveRBC: false,
    ONegativeRBC: false,
  });

  useEffect(() => {
    const newAlert = { ...alert };

    minimumAlertLevel.forEach((alertItem) => {
      const { keyName, value } = alertItem;
      newAlert[keyName] = stockData[keyName] < value;
      if (newAlert[keyName] === true) {
        toast.warn(`${keyName} stock is below minimum alert level`, {
          position: "bottom-right",
          autoClose: 30000,
        });
      }
    });
    setAlert(newAlert);
  }, [minimumAlertLevel]);

  const [showModal, setShowModal] = useState(false);
  const [newStockData, setNewStockData] = useState(stockData);

  useEffect(() => {
    showSpinner();
    axios
      .get(`http://localhost:5000/stockData/getStockData/${bloodBankId}`)
      .then((response) => {
        setStockData(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
        });
        if (error.response.data.message === "Stock data not found") {
          setShowModal(true);
        }
      })
      .finally(() => {
        hideSpinner();
      });
  }, []);

  useEffect(() => {
    showSpinner();
    axios
      .get(`http://localhost:5000/threshold/getThreshold/${bloodBankId}`)
      .then((response) => {
        console.log(response);
        setMinimumAlertLevel(response.data.Thresholds);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hideSpinner();
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStockData({ ...newStockData, [name]: value });
  };

  const handleSubmit = () => {
    let data = newStockData;
    data = { ...data, bloodBankId: bloodbankId };
    axios
      .post(`http://localhost:5000/stockData/addStockData/`, data)
      .then((response) => {
        setStockData(newStockData);
        setShowModal(false);
        toast.success("Stock data added successfully", {
          position: "bottom-right",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
        });
      });
  };

  //     useEffect(() => {
  //         axios.get(`http://localhost:5000/stockData/getStockData/${bloodbankId}`)
  //     }, [stockData]);

return (
        <>
                <ToastContainer />
                <div className="pt-2 px-5 ">
                        <div className="grid grid-rows-2 w-full gap-y-5 pt-28">
                                <div className="grid grid-cols-2 w-full gap-5 gap-y-5">
                                        <div
                                                className={`w-full space-y-2 border-bloodred2/20 border-2 p-2 rounded-lg ${
                                                        alert.APositivePlatelets ||
                                                        alert.ANegativePlatelets ||
                                                        alert.APositivePlasma ||
                                                        alert.ANegativePlasma ||
                                                        alert.APositiveRBC ||
                                                        alert.ANegativeRBC
                                                                ? "animate-pulse"
                                                                : ""
                                                }`}
                                        >
                                                <div className="bg-bloodred3  flex rounded-lg">
                                                        <span className="w-full text-white text-center py-1">A</span>
                                                </div>
                                                <div className="grid grid-cols-2 rounded-lg space-x-2">
                                                        <div className="border-bloodred2/20 border-2 rounded-md">
                                                                <h1 className="text-center py-4">RH (+)</h1>
                                                                <hr className="border-t-2 border-black/20" />
                                                                <div className=" grid grid-cols-3">
                                                                        <div className={`border-r-2 border-black/20 ${alert.APositiveRBC ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Red cells</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.APositiveRBC}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`border-r-2 border-black/20 ${alert.APositivePlatelets ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Platelets</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.APositivePlatelets}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`${alert.APositivePlasma ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Plasma</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.APositivePlasma}
                                                                                </h3>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="border-bloodred2/20 border-2 rounded-md">
                                                                <h1 className="text-center py-4">RH (-)</h1>
                                                                <hr className="border-t-2 border-black/20" />
                                                                <div className=" grid grid-cols-3">
                                                                        <div className={`border-r-2 border-black/20 ${alert.ANegativeRBC ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Red cells</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ANegativeRBC}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`border-r-2 border-black/20 ${alert.ANegativePlatelets ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Platelets</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ANegativePlatelets}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`${alert.ANegativePlasma ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Plasma</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ANegativePlasma}
                                                                                </h3>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className={`w-full space-y-2 border-bloodred2/20 border-2 p-2 rounded-lg ${
                                                        alert.BPositivePlatelets ||
                                                        alert.BNegativePlatelets ||
                                                        alert.BPositivePlasma ||
                                                        alert.BNegativePlasma ||
                                                        alert.BPositiveRBC ||
                                                        alert.BNegativeRBC
                                                                ? "animate-pulse"
                                                                : ""
                                                }`}>
                                                <div className="bg-bloodred3 flex rounded-lg">
                                                        <span className="w-full text-white text-center py-1">B</span>
                                                </div>
                                                <div className="grid grid-cols-2 rounded-lg space-x-2">
                                                        <div className="border-bloodred2/20 border-2 rounded-md">
                                                                <h1 className="text-center py-4">RH (+)</h1>
                                                                <hr className="border-t-2 border-black/20" />
                                                                <div className=" grid grid-cols-3">
                                                                        <div className={`border-r-2 border-black/20 ${alert.BPositiveRBC ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Red cells</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.BPositiveRBC}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`border-r-2 border-black/20 ${alert.BPositivePlatelets ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Platelets</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.BPositivePlatelets}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`${alert.BPositivePlasma ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Plasma</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.BPositivePlasma}
                                                                                </h3>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="border-bloodred2/20 border-2 rounded-md">
                                                                <h1 className="text-center py-4">RH (-)</h1>
                                                                <hr className="border-t-2 border-black/20" />
                                                                <div className=" grid grid-cols-3">
                                                                        <div className={`border-r-2 border-black/20 ${alert.BNegativeRBC ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Red cells</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.BNegativeRBC}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`border-r-2 border-black/20 ${alert.BNegativePlatelets ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Platelets</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.BNegativePlatelets}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`${alert.BNegativePlasma ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Plasma</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.BNegativePlasma}
                                                                                </h3>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div className="grid grid-cols-2 w-full gap-5">
                                        <div className={`w-full space-y-2 border-bloodred2/20 border-2 p-2 rounded-lg ${
                                                        alert.ABPositivePlatelets ||
                                                        alert.ABNegativePlatelets ||
                                                        alert.ABPositivePlasma ||
                                                        alert.ABNegativePlasma ||
                                                        alert.ABPositiveRBC ||
                                                        alert.ABNegativeRBC
                                                                ? "animate-pulse"
                                                                : ""
                                                }`}>
                                                <div className="bg-bloodred3 flex rounded-lg">
                                                        <span className="w-full text-white text-center py-1">AB</span>
                                                </div>
                                                <div className="grid grid-cols-2 rounded-lg space-x-2">
                                                        <div className="border-bloodred2/20 border-2 rounded-md">
                                                                <h1 className="text-center py-4">RH (+)</h1>
                                                                <hr className="border-t-2 border-black/20" />
                                                                <div className=" grid grid-cols-3">
                                                                        <div className={`border-r-2 border-black/20 ${alert.ABPositiveRBC ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Red cells</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ABPositiveRBC}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`border-r-2 border-black/20 ${alert.ABPositivePlatelets ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Platelets</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ABPositivePlatelets}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`${alert.ABPositivePlasma ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Plasma</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ABPositivePlasma}
                                                                                </h3>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="border-bloodred2/20 border-2 rounded-md">
                                                                <h1 className="text-center py-4">RH (-)</h1>
                                                                <hr className="border-t-2 border-black/20" />
                                                                <div className=" grid grid-cols-3">
                                                                        <div className={`border-r-2 border-black/20 ${alert.ABNegativeRBC ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Red cells</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ABNegativeRBC}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`border-r-2 border-black/20 ${alert.ABNegativePlatelets ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Platelets</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ABNegativePlatelets}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`${alert.ABNegativePlasma ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Plasma</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ABNegativePlasma}
                                                                                </h3>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className={`w-full space-y-2 border-bloodred2/20 border-2 p-2 rounded-lg ${
                                                        alert.OPositivePlatelets ||
                                                        alert.ONegativePlatelets ||
                                                        alert.OPositivePlasma ||
                                                        alert.ONegativePlasma ||
                                                        alert.OPositiveRBC ||
                                                        alert.ONegativeRBC
                                                                ? "animate-pulse"
                                                                : ""
                                                }`}>
                                                <div className="bg-bloodred3 flex rounded-lg">
                                                        <span className="w-full text-white text-center py-1">O</span>
                                                </div>
                                                <div className="grid grid-cols-2 rounded-lg space-x-2">
                                                        <div className="border-bloodred2/20 border-2 rounded-md">
                                                                <h1 className="text-center py-4">RH (+)</h1>
                                                                <hr className="border-t-2 border-black/20" />
                                                                <div className=" grid grid-cols-3">
                                                                        <div className={`border-r-2 border-black/20 ${alert.OPositiveRBC ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Red cells</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.OPositiveRBC}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`border-r-2 border-black/20 ${alert.OPositivePlatelets ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Platelets</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.OPositivePlatelets}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`${alert.OPositivePlasma ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Plasma</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.OPositivePlasma}
                                                                                </h3>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="border-bloodred2/20 border-2 rounded-md">
                                                                <h1 className="text-center py-4">RH (-)</h1>
                                                                <hr className="border-t-2 border-black/20" />
                                                                <div className=" grid grid-cols-3">
                                                                        <div className={`border-r-2 border-black/20 ${alert.ONegativeRBC ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Red cells</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ONegativeRBC}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`border-r-2 border-black/20 ${alert.ONegativePlatelets ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Platelets</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ONegativePlatelets}
                                                                                </h3>
                                                                        </div>
                                                                        <div className={`${alert.ONegativePlasma ? 'bg-bloodred1 text-white' : ""}`}>
                                                                                <h2 className="text-center py-2">Plasma</h2>
                                                                                <h3 className="text-center py-2">
                                                                                        {stockData.ONegativePlasma}
                                                                                </h3>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        {showModal && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-y-auto">
                                                <h2 className="text-xl font-semibold mb-4">Add Stock Data</h2>
                                                {Object.keys(stockData).map((key) => (
                                                        <div key={key} className="mb-4">
                                                                <label className="block text-gray-700">{key}</label>
                                                                <input
                                                                        type="number"
                                                                        name={key}
                                                                        value={newStockData[key]}
                                                                        onChange={handleInputChange}
                                                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                        </div>
                                                ))}
                                                <div className="flex justify-end">
                                                        <button
                                                                onClick={() => setShowModal(false)}
                                                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                                        >
                                                                Cancel
                                                        </button>
                                                        <button
                                                                onClick={handleSubmit}
                                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                                        >
                                                                Submit
                                                        </button>
                                                </div>
                                        </div>
                                </div>
                        )}
                </div>
        </>
);
}

export default CurrentStock;
