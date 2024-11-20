import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOverlay } from "../context/overlayContext";
import FeatherIcon from "feather-icons-react";

function StockSettings() {
  const bloodBankId = JSON.parse(localStorage.getItem("user")).bloodBankId;
  const NotificationMethod = ["Email", "SMS"];
  const [Reciver, setReciver] = useState([]);
  const { showSpinner, hideSpinner } = useOverlay();
  const [notificationConfig, setNotificationConfig] = useState([]);
  const blood_groups = ["APositive", "ANegative", "BPositive", "BNegative", "ABPositive", "ABNegative", "OPositive", "ONegative"];
  const blood_products = ["RBC", "Plasma", "Platelets"];
  const [config, setConfig] = useState({
    NotificationType: "",
    userId: "",
  });
  const [threshold, setThreshold] = useState({
    bloodGroup:"", 
    productName:"",
    value:""
  });
  const [minimumAlertLevel, setMinimumAlertLevel] = useState([]);

  useEffect(() => {
    showSpinner();
    axios
      .get(`http://localhost:5000/user/getUserByBloodBankId/${bloodBankId}`)
      .then((response) => {
        console.log(response);
        setReciver(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hideSpinner();
      });
  }, []);

  const handleNotificationType = (e) => {
    setConfig({ ...config, NotificationType: e.target.value });
  };

  const handleReciver = (e) => {
    setConfig({ ...config, userId: e.target.value });
  };

  const handleSave = () => {
    showSpinner();
    axios
      .post(`http://localhost:5000/notificationConfig/addNotificationConfig/${bloodBankId}`, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        hideSpinner();
      });
  };

  useEffect(() => {
    showSpinner();
    axios.get(`http://localhost:5000/notificationConfig/getNotificationConfig/${bloodBankId}`)
    .then((response) => {
      console.log(response);
      //setConfig(response.data);
      setNotificationConfig(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      hideSpinner();
    });
  }, []);

  const handleBloodGroup = (e) => {
    setThreshold({...threshold, bloodGroup: e.target.value});
  }

  const handleProductName = (e) => {
    setThreshold({...threshold, productName: e.target.value});
  }

  const handleValue = (e) => {
    setThreshold({...threshold, value: e.target.value});
  }

  const saveThreshold = () => {
    showSpinner();
    axios.post(`http://localhost:5000/threshold/addThreshold/${bloodBankId}`, threshold)
    .then((response) => {
      console.log(response);
      setMinimumAlertLevel(response.data.Thresholds)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      hideSpinner();
    });
  }

  const deleteThreshold = (id) => {
    showSpinner();
    axios.delete(`http://localhost:5000/threshold/deleteThreshold/${bloodBankId}/${id}`)
    .then((response) => {
      console.log(response);
      setMinimumAlertLevel(response.data.Thresholds)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      hideSpinner();
    });
  }

  useEffect(() => {
    showSpinner();
    axios.get(`http://localhost:5000/threshold/getThreshold/${bloodBankId}`)
    .then((response) => {
      console.log(response);
      setMinimumAlertLevel(response.data.Thresholds)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      hideSpinner();
    });
  }, []);

  return (
    <>
      <div className="px-5 py-5">
        <div className="pb-4">
          <h1 className="text-Ash text-2xl pb-4 font-semibold">Notification Configurations</h1>
        <div className="grid grid-cols-2 gap-5 pb-3">
          <div>
            <label className="p-1 text-bloodred4" htmlFor="">
              Notification Type :{" "}
            </label>
            <br />
            <select
              className="w-full p-1 border-2 rounded-lg"
              name="notificationType"
              id="notificationType"
              onChange={handleNotificationType}
            >
              <option value="">Select</option>
              {NotificationMethod.map((method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
          <div>
          <label className="p-1 text-bloodred4" htmlFor="">
              Select Reciver :{" "}
            </label>
            <br />
            <select
              className="w-full p-1 border-2 rounded-lg"
              name="blood_group"
              id="blood_group"
              onChange={handleReciver}
            >
              <option value="">Select</option>
              {Reciver.map((reciver, index) => (
                <option key={index} value={reciver._id}>
                  {reciver.FirstName} {reciver.LastName} {reciver.AccountType}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-x-5">
          <button className="bg-white p-1 rounded-xl border-2 px-5" onClick={() => setConfig({
                        notificationType: "",
                        userId: "",
          })}>
                    Reset
                </button>
                <button className="bg-bloodred2 text-white p-1 rounded-xl border-2 px-5" onClick={handleSave}>
                    Save
          </button>
          </div>
        </div>
        <hr/>
        <div>
          <div className="py-2">
            <h1 className="text-Ash text-2xl pb-2 font-semibold pt-2">Minimum Alert Level</h1>
          <div className="grid grid-cols-2 gap-5 py-2">
              <div className="">
                <label className="p-1 text-bloodred4" htmlFor="blood_group">
                  Blood Group :{" "}
                </label>
                <br />
                <select
                  className="w-full p-1 border-2 rounded-lg"
                  name="blood_group"
                  id="blood_group"
                  onChange={handleBloodGroup}
                >
                  <option value="">Select Blood Group</option>
                  {blood_groups.map((group, index) => (
                    <option key={index} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <label className="p-1 text-bloodred4" htmlFor="blood_product">
                  Blood Product :{" "}
                </label>
                <br />
                <select
                  className="w-full p-1 border-2 rounded-lg"
                  name="blood_product"
                  id="blood_product"
                  onChange={handleProductName}
                >
                  <option value="">Select Blood Product</option>
                  {blood_products.map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="p-1 text-bloodred4" htmlFor="minimum_alert_level">
                  Minimum Alert Level :{" "}
                </label>
                <br />
                <input
                  type="number"
                  name="minimum_alert_level"
                  id="minimum_alert_level"
                  className="w-full p-1 border-2 rounded-lg"
                  onChange={handleValue}
                />
              </div>
            </div>
            <button onClick={saveThreshold} className="bg-bloodred2 text-white p-1 rounded-xl border-2 px-5">
                  Add
            </button>
          </div>
          <hr/>
          {Object.keys(minimumAlertLevel).length > 0 && (
            <div className="py-2">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="border-2 text-center">Blood Group</th>
                    <th className="border-2 text-center">Blood Product</th>
                    <th className="border-2 text-center">Minimum Alert Level</th>
                    <th className="border-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                {Object.values(minimumAlertLevel).map((level, index) => (
                  <tr key={index}>
                    <td className="border-2 text-center">{level.bloodGroup}</td>
                    <td className="border-2 text-center">{level.productName}</td>
                    <td className="border-2 text-center">{level.value}</td>
                    <td className="border-2 text-center">
                      <button onClick={() => deleteThreshold(level._id)} className="bg-white p-1 rounded-xl px-5">
                        <FeatherIcon icon="trash" />
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StockSettings;
