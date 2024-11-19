import FeatherIcon from 'feather-icons-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DemandPrediction() {
  const [days, setDays] = useState(7);
  const [customRange, setCustomRange] = useState(false);
  const [endDate, setEndDate] = useState('');
  const blood_groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const blood_products = ['RBC', 'Plasma', 'Platelets']
const [AdvancedOptions, setAdvancedOptions] = useState(false);
const [tableTitle, setTableTitle] = useState('');
  const [mlBody, setMlBody] = useState({
    start_date: "",
    prediction_days: 0,
    blood_group: "",
    blood_product: ""
  });

  const [predictionData, setPredictionData] = useState({
    A: {
      Positive: {
        RBC: "",
        Plasma: 0,
        Platelets: 0
      },
      Negative: {
        RBC: 0,
        Plasma: 0,
        Platelets: 0
      }
    },
    B: {
      Positive: {
        RBC: 0,
        Plasma: 0,
        Platelets: 0
      },
      Negative: {
        RBC: 0,
        Plasma: 0,
        Platelets: 0
      }
    },
    AB: {
      Positive: {
        RBC: 0,
        Plasma: 0,
        Platelets: 0
      },
      Negative: {
        RBC: 0,
        Plasma: 0,
        Platelets: 0
      }
    },
    O: {
      Positive: {
        RBC: 0,
        Plasma: 0,
        Platelets: 0
      },
      Negative: {
        RBC: 0,
        Plasma: 0,
        Platelets: 0
      }
    }
  });

  const getDataSummed = (data) => {
    const predictions = data;
    const updatedPredictionData = { ...predictionData };

    Object.keys(predictions).forEach(key => {
      const [bloodType, productType] = key.split('_');
      const sum = predictions[key].reduce((acc, val) => acc + val[0], 0);
      const bloodGroup = bloodType.slice(0, -1);
      const rhFactor = bloodType.slice(-1) === '+' ? 'Positive' : 'Negative';

      if (updatedPredictionData[bloodGroup] && updatedPredictionData[bloodGroup][rhFactor]) {
        updatedPredictionData[bloodGroup][rhFactor][productType] = sum;
      }
    });

    setPredictionData(updatedPredictionData);
  }


  const handleDateRangeChange = (event) => {
    const value = event.target.value;
    if (value === '7days') {
      setDays(7);
      setCustomRange(false);
      setMlBody({ ...mlBody, prediction_days: 7, start_date: new Date().toISOString().split('T')[0] });
    } else if (value === '14days') {
      setDays(14);
      setCustomRange(false);
      setMlBody({ ...mlBody, prediction_days: 14, start_date: new Date().toISOString().split('T')[0] });
    } else if (value === 'customRange') {
      setCustomRange(true);
    }
  };

  useEffect(() => {
    if (endDate === '') return; 
    dateCal();
  }, [endDate]);

  const dateCal = () => {
    if (customRange) {
      const start = new Date();
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
      setMlBody({ ...mlBody, prediction_days: diffDays, start_date: new Date().toISOString().split('T')[0] });
    }
  };

  const handleLoadData = () => {

    setPredictionData(
      {
        A: {
          Positive: {
            RBC: "",
            Plasma: 0,
            Platelets: 0
          },
          Negative: {
            RBC: 0,
            Plasma: 0,
            Platelets: 0
          }
        },
        B: {
          Positive: {
            RBC: 0,
            Plasma: 0,
            Platelets: 0
          },
          Negative: {
            RBC: 0,
            Plasma: 0,
            Platelets: 0
          }
        },
        AB: {
          Positive: {
            RBC: 0,
            Plasma: 0,
            Platelets: 0
          },
          Negative: {
            RBC: 0,
            Plasma: 0,
            Platelets: 0
          }
        },
        O: {
          Positive: {
            RBC: 0,
            Plasma: 0,
            Platelets: 0
          },
          Negative: {
            RBC: 0,
            Plasma: 0,
            Platelets: 0
          }
        }
      }
    );

    axios.post('http://127.0.0.1:4600/predict', mlBody)
      .then((res) => {
        console.log(res.data);
        getDataSummed(res.data.predictions);
        DateRangeSetter();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {

      })
  }

  const DateRangeSetter = () => {
    if (days === 7) {
      const today = new Date();
      const sevenDaysLater = new Date(today);
      sevenDaysLater.setDate(today.getDate() + 7);
      setTableTitle(`${today.toISOString().split('T')[0]} - ${sevenDaysLater.toISOString().split('T')[0]}`);
    } else if (days === 14) {
      const today = new Date();
      const fourteenDaysLater = new Date(today);
      fourteenDaysLater.setDate(today.getDate() + 14);
      setTableTitle(`${today.toISOString().split('T')[0]} - ${fourteenDaysLater.toISOString().split('T')[0]}`);
    } else {
      setTableTitle(`${new Date().toISOString().split('T')[0]} - ${endDate}`);
    }
  }

  const convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = 'Blood Type,RH Factor,Product Type,Predicted Value\n';

    Object.keys(array).forEach(bloodType => {
      Object.keys(array[bloodType]).forEach(rhFactor => {
        Object.keys(array[bloodType][rhFactor]).forEach(productType => {
          str += `${bloodType},${rhFactor},${productType},${array[bloodType][rhFactor][productType]}\n`;
        });
      });
    });

    return str;
  };

  const exportCSVFile = () => {
    const csv = convertToCSV(predictionData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'prediction_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTableRows = () => {
    return Object.keys(predictionData).map((bloodType) => (
      <React.Fragment key={bloodType}>
        <tr>
          <td rowSpan={6} className='border-2 text-center'>{bloodType}</td>
          <td rowSpan={3} className='border-2 text-center'>Positive</td>
          <td className='border-2 text-center'>RBC</td>
          <td className='border-2 text-center'>{predictionData[bloodType].Positive.RBC}</td>
        </tr>
        <tr>
          <td className='border-2 text-center'>Plasma</td>
          <td className='border-2 text-center'>{predictionData[bloodType].Positive.Plasma}</td>
        </tr>
        <tr>
          <td className='border-2 text-center'>Platelets</td>
          <td className='border-2 text-center'>{predictionData[bloodType].Positive.Platelets}</td>
        </tr>
        <tr>
          <td rowSpan={3} className='border-2 text-center'>Negative</td>
          <td className='border-2 text-center'>RBC</td>
          <td className='border-2 text-center'>{predictionData[bloodType].Negative.RBC}</td>
        </tr>
        <tr>
          <td className='border-2 text-center'>Plasma</td>
          <td className='border-2 text-center'>{predictionData[bloodType].Negative.Plasma}</td>
        </tr>
        <tr>
          <td className='border-2 text-center'>Platelets</td>
          <td className='border-2 text-center'>{predictionData[bloodType].Negative.Platelets}</td>
        </tr>
      </React.Fragment>
    ));
  };

  return (
    <>
      <div className="px-5 pt-5">
        <div className="grid grid-cols-3 pb-5">
          <div className="col-span-2 flex space-x-10 items-center">
            <div>
              <input
                type="radio"
                name="dateRange"
                value="7days"
                onChange={handleDateRangeChange}
              />
              <span> 7 days</span>
            </div>
            <div>
              <input
                type="radio"
                name="dateRange"
                value="14days"
                onChange={handleDateRangeChange}
              />
              <span> 14 days</span>
            </div>
            <div>
              <input
                type="radio"
                name="dateRange"
                value="customRange"
                onChange={handleDateRangeChange}
              />
              <span> Custom Range</span>
            </div>
            <button
              className="bg-bloodred3 p-1 text-white px-5 rounded-full"
              onClick={handleLoadData}
            >
              Load
            </button>
          </div>
          <div className="col-span-1 flex space-x-10">
              <button onClick={()=> setAdvancedOptions(!AdvancedOptions)} className='flex space-x-3 text-white bg-bloodred3 items-center px-5 p-1 rounded-full'>
                  <FeatherIcon icon="settings" /> <span> Advanced options</span> 
              </button>
              <button disabled={predictionData.A.Positive.RBC == ""} onClick={exportCSVFile} className={`${predictionData.A.Positive.RBC == "" ? "bg-bloodred3/40" : ""} flex space-x-3 text-white bg-bloodred3 items-center px-5 p-1 rounded-full`}>
                  <FeatherIcon icon="download" />
              </button>
          </div>
        </div>
        <div>
          {customRange && (
            <div className="flex space-x-2">
              <input
                className='w-[25%] border-2 rounded-lg p-1'
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          )}
        </div>
        <hr/>
        {AdvancedOptions && (<div className='pt-5'>
          <div className='flex space-x-2 pb-3'>
          <FeatherIcon icon="settings" /> <span> Advanced options</span>
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <div className=''>
            <label className='p-1 text-bloodred4' htmlFor="blood_group">Blood Group : </label>
            <br/>
            <select
            className='w-full p-1 p-1 border-2 rounded-lg'
              name="blood_group"
              id="blood_group"
              onChange={(e) => setMlBody({ ...mlBody, blood_group: e.target.value })}
              >
                <option value="">Select Blood Group</option>
              {blood_groups.map((group, index) => (
                <option key={index} value={group}>{group}</option>
              ))}
              </select>
          </div>
          <div className=''>
            <label className='p-1 text-bloodred4' htmlFor="blood_product">Blood Product</label>
            <br/>
            <select
            className='w-full p-1 border-2 rounded-lg'
              name="blood_product"
              id="blood_product"
              onChange={(e) => setMlBody({ ...mlBody, blood_product: e.target.value })}
              >
                <option value="">Select Blood Product</option>
              {blood_products.map((product, index) => (
                <option key={index} value={product}>{product}</option>
              ))}
              </select>
          </div>
        </div>
        </div>)}
        {predictionData.A.Positive.RBC != "" && (
          <div className='py-5'>
            <table className='w-full border-2'>
              <caption className="text-2xl text-bloodred1">{tableTitle}</caption>
              <thead>
                <tr>
                  <th className='border-2 text-center'>Blood Type</th>
                  <th className='border-2 text-center'>RH factor</th>
                  <th className='border-2 text-center'>Product Type</th>
                  <th className='border-2 text-center'>Predicted value</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(predictionData).map((bloodType) => (
                  <>
                    <tr>
                      <td rowSpan={6} className='border-2 text-center'>{bloodType}</td>
                      <td rowSpan={3} className='border-2 text-center'>Positive</td>
                      <td className='border-2 text-center'>RBC</td>
                      <td className='border-2 text-center'>{predictionData[bloodType].Positive.RBC}</td>
                    </tr>
                    <tr>
                      <td className='border-2 text-center'>Plasma</td>
                      <td className='border-2 text-center'>{predictionData[bloodType].Positive.Plasma}</td>
                    </tr>
                    <tr>
                      <td className='border-2 text-center'>Platelets</td>
                      <td className='border-2 text-center'>{predictionData[bloodType].Positive.Platelets}</td>
                    </tr>
                    <tr>
                      <td rowSpan={3} className='border-2 text-center'>Negative</td>
                      <td className='border-2 text-center'>RBC</td>
                      <td className='border-2 text-center'>{predictionData[bloodType].Negative.RBC}</td>
                    </tr>
                    <tr>
                      <td className='border-2 text-center'>Plasma</td>
                      <td className='border-2 text-center'>{predictionData[bloodType].Negative.Plasma}</td>
                    </tr>
                    <tr>
                      <td className='border-2 text-center'>Platelets</td>
                      <td className='border-2 text-center'>{predictionData[bloodType].Negative.Platelets}</td>
                    </tr>
                  </>
                ))}
              </tbody>
              {renderTableRows()}
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default DemandPrediction;