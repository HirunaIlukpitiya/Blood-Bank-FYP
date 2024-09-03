import FeatherIcon from "feather-icons-react";
import React, { useEffect, useState } from "react";
import { useOverlay } from "../context/overlayContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
function DonateBlood() {
  const {showSpinner, hideSpinner} = useOverlay();
  const Donor = JSON.parse(localStorage.getItem("user")); 
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    Email: Donor.Email,
    step1q1: "",
    step1q2: "",
    step1q3: "",
    step1q4: "",
    step2q1: "",
    step2q2: "",
    step2q3: "",
    step2q4: "",
    step2q5: "",
    step2q6: "",
    step3q1: "",
    step3q2: "",
    step4q1: "",
    step4q2: "",
    step4q3: "",
    step4q4: "",
    step5q1: "",
    step5q2: "",
    step5q3: "",
    step5q4: "",
    step6q1: "",
    step6q2: "",
    step6q3: "",
  });

  useEffect(() => {
    setFormData({ Email: Donor.Email });
  }, [formData.Email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = () => {
    showSpinner();
    console.log(formData);
    axios.post(`http://localhost:5000/donor/addDonorApplication`, formData)
    .then((response) => {
      toast.success(response.data.message, {
        position: "bottom-right",
      });
      setFormData({});
      setStep(1);
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

  const handleReset = () => {
    setFormData({});
    setStep(1);
  };
  return (
    <div className="px-5 h-full">
      <ToastContainer />
      <h1 className="py-5 text-2xl text-bloodred1">Donor Appliaction</h1>
      {step != 1 && (<div className="pb-5 flex items-center space-x-3" onClick={()=> setStep(step-1)}>
      <FeatherIcon icon="arrow-left" className="text-bloodred1" /> <span>{`Step ${step - 1}`}</span>
      </div>)}
      <div>
        <div className="flex items-center pb-10 justify-around drop-shadow-md ">
          <span
            className={`${
              step === 1 ? "border-bloodred1 drop-shadow-xl" : ""
            } bg-white w-10 h-10 flex items-center justify-center border-2  rounded-full`}
          >
            1
          </span>
          <hr
            className={`w-5  h-[2px] ${step === 1 ? "bg-bloodred1" : "bg-Ash"}`}
          />
          <span
            className={`bg-white w-10 h-10 flex items-center ${
              step === 2 ? "border-bloodred1 drop-shadow-xl" : ""
            } justify-center border-2  rounded-full`}
          >
            2
          </span>
          <hr
            className={`w-5 h-[2px] ${step === 2 ? "bg-bloodred1" : "bg-Ash"}`}
          />
          <span
            className={`bg-white w-10 h-10 flex items-center ${
              step === 3 ? "border-bloodred1 drop-shadow-xl" : ""
            } justify-center border-2  rounded-full`}
          >
            3
          </span>
          <hr
            className={`w-5 h-[2px] ${step === 3 ? "bg-bloodred1" : "bg-Ash"}`}
          />
          <span
            className={`bg-white w-10 h-10 flex items-center ${
              step === 4 ? "border-bloodred1 drop-shadow-xl" : ""
            } justify-center border-2  rounded-full`}
          >
            4
          </span>
          <hr
            className={`w-5 h-[2px] ${step === 4 ? "bg-bloodred1" : "bg-Ash"}`}
          />
          <span
            className={`bg-white w-10 h-10 flex items-center ${
              step === 5 ? "border-bloodred1 drop-shadow-xl" : ""
            } justify-center border-2  rounded-full`}
          >
            5
          </span>
          <hr
            className={`w-5 h-[2px] ${step === 5 ? "bg-bloodred1" : "bg-Ash"}`}
          />
          <span
            className={`bg-white w-10 h-10 flex items-center ${
              step === 6 ? "border-bloodred1 drop-shadow-xl" : ""
            } justify-center border-2  rounded-full`}
          >
            6
          </span>
        </div>

        <div className = "">
          <div className="h-full">
          {step === 1 && (
            <div className="">
              <ul className=" space-y-5 list-decimal">
                <li className="">
                  <span>
                    You have had some difficulty in giving blood in the past ?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step1q1"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step1q1"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>If inconvenient, mention it</span>
                  <input
                    type="text"
                    name="step1q2"
                    className="border-2 w-full"
                    onChange={handleChange}
                  />
                </li>
                <li className="">
                  <span>
                    Have you ever received medical advice not to donate blood?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step1q3"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step1q3"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>
                    Did you read and understand the blood instruction note you
                    received before?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step1q4"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step1q4"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
          {step === 2 && (
            <div className="">
              <ul className=" space-y-5 list-decimal">
                <li className="">
                  <span>Are you currently in good health?</span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step2q1"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step2q1"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>
                    Have you received medical treatment for any of the following
                    medical conditions?
                  </span>
                  <div className=" grid grid-cols-2">
                    <div>
                      <input
                        type="checkbox"
                        name="step2q2"
                        value="yes"
                        onChange={handleChange}
                      />
                      <span>Heart disease</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="step2q2"
                        value="no"
                        onChange={handleChange}
                      />
                      <span>Paralysis</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="step2q2"
                        value="no"
                        onChange={handleChange}
                      />
                      <span>Diabetes</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="step2q2"
                        value="no"
                        onChange={handleChange}
                      />
                      <span>Blood diseases</span>
                    </div>
                  </div>
                </li>
                <li className="">
                  <span>Are you currently taking any medication?</span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step2q3"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step2q3"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>Have you undergone surgery?</span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step2q4"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step2q4"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>
                    After you blood donated, have you had to carry heavy weights
                    or drive passenger vehicles, climb tall buildings, climb
                    mountains, operate large machinery, etc.?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step2q5"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step2q5"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>Have you ever had a blood transfusion?</span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step2q6"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step2q6"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
          {step === 3 && (
            <div className="">
              <ul className=" space-y-5 list-decimal">
                <li className="">
                  <span>Have you ever had yellow fever or hepatitis?</span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step3q1"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step3q1"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>
                    Have you had a fever or thyphoid in the last two years?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step3q2"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step3q2"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
          {step === 4 && (
            <div className="">
              <h1 className="pb-5 font-semibold">In the last twelve months,</h1>
              <ul className=" space-y-5 list-decimal">
                <li className="">
                  <span>
                    Have you received an immunization or other vaccine
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step4q1"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step4q1"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>
                    Have had an ear piercing, tattooing or acupuncture treatment
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step4q2"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step4q2"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>Have you been in prison?</span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step4q3"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step4q3"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>Have you or your spouse traveled abroad?</span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step4q4"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step4q4"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
          {step === 5 && (
            <div className="">
              <ul className=" space-y-5 list-decimal">
                <li className="">
                  <span>
                    Have you had or received treatment for dengue in the last
                    six months?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step5q1"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step5q1"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>
                    In the past month - chicken pox, measles, mumps, (german
                    measles), diarrhea or other persistent (more than a week)
                    fever?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step5q2"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step5q2"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>
                    n the past week - have you had your teeth removal?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step5q3"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step5q3"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>
                    Have you used any antibiotics, aspirin or (other) medicines
                    in the last week?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step5q4"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step5q4"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
          {step === 6 && (
            <div className="">
              <ul className=" space-y-5 list-decimal">
                <li className="">
                  <span>
                    If you belong to any of the following categories, do you
                    know blood donation is not suitable?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <br />
                  <p className="font-semibold">
                    If you are infected with AIDS (HIV/AIDS) (Hepatitis B/C).
                  </p>
                  <p className="font-semibold">
                    If your sexual relations are limited to one person
                  </p>
                  <p className="font-semibold">
                    {" "}
                    If you are a man who is in a relationship with another man
                  </p>
                  <p className="font-semibold">
                    If you have ever injected drugs into surgery
                  </p>
                  <p className="font-semibold">
                    If you are engaged in solicitation or prostitution
                  </p>
                  <p className="font-semibold">
                    If you have had sexual intercourse for three or more days in
                    the last 12 months
                  </p>
                  <p className="font-semibold">
                    If in doubt that, AIDS (HIV/AIDS) or other STD infection in
                    you or your partner
                  </p>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step6q1"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step6q1"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>
                    Do you or your partner/associate belong to any of the above
                    categories?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step6q2"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step6q2"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
                <li className="">
                  <span>
                    You, with low body weight, swelling of the lymph nodes,
                    lasting suffering from fever or diarrhea?
                  </span>
                  <span className="text-red-700 text-3xl">*</span>
                  <div className=" space-x-5">
                    <input
                      type="radio"
                      name="step6q3"
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="step6q3"
                      value="no"
                      onChange={handleChange}
                    />
                    <span>No</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
          </div>

          {step != 6 && (
            <div className="py-5 flex">
              <button
                onClick={handleReset}
                className="bg-white p-2 rounded-xl border-2 px-5 w-full"
              >
                Reset
              </button>
              <button
                disabled={step === 6}
                onClick={() => setStep(step + 1)}
                className="bg-bloodred1 text-white p-2 px-5 w-full ml-5 rounded-xl"
              >
                Next
              </button>
            </div>
          )}
          {step === 6 && (
            <div className="py-5 flex">
              <button
                onClick={handleSubmit}
                className="bg-bloodred1 text-white p-2 px-5 w-full rounded-xl"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DonateBlood;
