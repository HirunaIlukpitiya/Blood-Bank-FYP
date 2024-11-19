import FeatherIcon from "feather-icons-react";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import QrScanner from "react-qr-scanner";

function DonerApprove() {
    const user = JSON.parse(localStorage.getItem("user"))
  const [userId, setUserId] = useState("null");
  const [Email, setEmail] = useState("null");
  const [requestMaker, setRequestMaker] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [applicationView, setApplicationView] = useState(false);
  const [tab1Data, setTab1Data] = useState({
    verified:"",
    barCode:""
  });
  const [tab2Data, setTab2Data] = useState({
    CVS:"",
    BP:"",
    Remark:"",
    OutCome:"",
    RemarkToDeferral:""
  });
  const [tab3Data, setTab3Data] = useState({
    HbLevel:"",
    BagType:""
  }); 
  const [tabToggle, setTabToggle] = useState({
    tab1: false,
    tab2: false,
    tab3: false,
    tab4: false,
  });
  const [userInfo, setUserInfo] = useState({
    FirstName: "",
    LastName: "",
  });
  const [donorApplication, setDonorApplication] = useState({
    Id: "",
    step1q1: "",
    step1q2: "",
    step1q3: "",
    step1q4: "",
    step2q1: "",
    step2q2: {
      heartDisease: false,
      paralysis: false,
      diabetes: false,
      bloodDiseases: false,
    },
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
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (userId === "null" && Email === "null") {
      return;
    }

    setDonorApplication({
      Id: "",
      step1q1: "",
      step1q2: "",
      step1q3: "",
      step1q4: "",
      step2q1: "",
      step2q2: {
        heartDisease: false,
        paralysis: false,
        diabetes: false,
        bloodDiseases: false,
      },
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

    axios
      .get(
        `http://localhost:5000/donor/getDonorApplication/${userId}/${Email}/get`
      )
      .then((response) => {
        console.log(response.data);
        setDonorApplication(response.data.donorApplication);
        setUserInfo(response.data.userInfo);
        setEmail("null");
        setUserId("null"); 
        if (response.data.donorApplication.registrationData) {
          setTab1Data(response.data.donorApplication.registrationData)
        }
        if (response.data.donorApplication.medicalAssessment) {
          setTab2Data(response.data.donorApplication.medicalAssessment)
        }
        if (response.data.donorApplication.HbandBagType) {
          setTab3Data(response.data.donorApplication.HbandBagType)
        }
      })
      .catch((error) => {
        console.log(error);
        setEmail("null");
        setUserId("null");
        setDonorApplication({
          Id: "",
          step1q1: "",
          step1q2: "",
          step1q3: "",
          step1q4: "",
          step2q1: "",
          step2q2: {
            heartDisease: false,
            paralysis: false,
            diabetes: false,
            bloodDiseases: false,
          },
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
        toast.error(error.response.data.message, {
          position: "bottom-right",
        });
      })
      .finally(() => {});
  }, [requestMaker, userId]);

  if (userId == "") {
    setUserId("null");
  }
  if (Email == "") {
    setEmail("null");
  }
  const handleSearchChange = (e) => {
    setEmail(e.target.value);
    console.log(Email);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("searching");
    if (Email === "" || !Email.includes("@")) {
      toast.error("Please enter a valid email address", {
        position: "bottom-right",
      });
      return;
    }
    setRequestMaker(!requestMaker);
  };

  const handleError = (err) => {
    console.error(err);
    toast.error("Error scanning QR code", {
      position: "bottom-right",
    });
  };

  const handleScan = (data) => {
    if (data) {
      processId(data.text);
      setShowScanner(false);
    }
  };

  const processId = (id) => {
    const parsedData = JSON.parse(id);
    const donorId = parsedData.donorId;
    console.log("Donor ID:", donorId);
    setUserId(donorId);
  };

  const goNext = () => {
    setStep(step + 1);
  };

  const goBack = () => {
    setStep(step - 1);
  };

  const applicationStateChange = (value) => {
    let data;
    if (value === "tab1") {
        data = {...tab1Data, donorId : donorApplication.Id}
    }
    if (value === "tab2") {
        data = {...tab2Data, donorId : donorApplication.Id}
    }
    if (value === "tab3") {
        data = {...tab3Data, donorId : donorApplication.Id};
    }

    console.log(data);

    axios
      .put(`http://localhost:5000/donor/updateDonorApplication/${user.userId}/${value}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const saveTab1Changes = (e) => {
    setTab1Data({
        ...tab1Data, [e.target.name]: e.target.value
    });
  } 

  const saveTab2Changes = (e) => {
    setTab2Data({
        ...tab2Data, [e.target.name]: e.target.value
    })
  }

  const saveTab3Changes = (e) => {
    setTab3Data({
        ...tab3Data, [e.target.name] : e.target.value
    })
  }

  const resetTab1 = () => {
    setTab1Data({
        verified:"",
        barCode:""
    })
  }

  const resetTab2 = () => {
    setTab2Data({
        CVS:"",
        BP:"",
        Remark:"",
        OutCome: "",
        RemarkToDeferral:""
    })
  }

  const resetTab3 = () => {
    setTab3Data({
        HbLevel:"",
        BagType:""
    })
  }
  return (
    <>
      <ToastContainer />
      <div
        className={
          donorApplication.Id == ""
            ? "h-full w-full flex justify-center items-center"
            : "flex justify-center pt-5"
        }
      >
        <div className="w-[80%] flex justify-center space-x-5 h-12">
          <SearchBar
            handleSearch={handleSearchChange}
            text={Email}
            handleSubmit={handleSearch}
            placeholderText="Search by donor Email "
          />
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="bg-slate-100 px-3 border-2 border-slate-300 rounded-full"
          >
            <span className="flex">
              <span className="text-Ash pr-3">QR</span>{" "}
              <FeatherIcon icon="maximize" />
            </span>
          </button>
          {donorApplication.Id != "" && (<button className="bg-bloodred4/80 text-white px-3 border-2 border-slate-300 rounded-full" onClick={() => {setApplicationView(!applicationView)}}>
            {applicationView ? "close" : "View data"}
          </button> )}
        </div>
        {showScanner && (
          <div className="absolute top-0 left-0 w-full h-full z-999 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg">
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
              <button
                onClick={() => setShowScanner(false)}
                className="mt-3 bg-red-500 text-white p-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {applicationView == true && donorApplication.Id != "" && (
        <div className="px-80 h- mt-5 text-Ash font-poppins">
          <div className="h-full">
            <div className="flex items-center">
              <span className="pb-2 pl-3 text-4xl text-bloodred1">
                {`${userInfo.FirstName} ${userInfo.LastName}`}
              </span>
            </div>
            <div className="px-5">
              <div className="flex items-center pb-10 justify-around">
                <span
                  className={`${
                    step === 1 ? "border-bloodred1" : ""
                  } bg-white w-10 h-10 flex items-center justify-center border-2 rounded-full`}
                >
                  1
                </span>
                <hr
                  className={`w-16 h-[2px] ${
                    step === 1 ? "bg-bloodred1" : "bg-Ash"
                  }`}
                />
                <span
                  className={`${
                    step === 2 ? "border-bloodred1" : ""
                  } bg-white w-10 h-10 flex items-center justify-center border-2 rounded-full`}
                >
                  2
                </span>
                <hr
                  className={`w-16 h-[2px] ${
                    step === 2 ? "bg-bloodred1" : "bg-Ash"
                  }`}
                />
                <span
                  className={`${
                    step === 3 ? "border-bloodred1" : ""
                  } bg-white w-10 h-10 flex items-center justify-center border-2 rounded-full`}
                >
                  3
                </span>
                <hr
                  className={`w-16 h-[2px] ${
                    step === 3 ? "bg-bloodred1" : "bg-Ash"
                  }`}
                />
                <span
                  className={`${
                    step === 4 ? "border-bloodred1" : ""
                  } bg-white w-10 h-10 flex items-center justify-center border-2 rounded-full`}
                >
                  4
                </span>
                <hr
                  className={`w-16 h-[2px] ${
                    step === 4 ? "bg-bloodred1" : "bg-Ash"
                  }`}
                />
                <span
                  className={`${
                    step === 5 ? "border-bloodred1" : ""
                  } bg-white w-10 h-10 flex items-center justify-center border-2 rounded-full`}
                >
                  5
                </span>
                <hr
                  className={`w-16 h-[2px] ${
                    step === 5 ? "bg-bloodred1" : "bg-Ash"
                  }`}
                />
                <span
                  className={`${
                    step === 6 ? "border-bloodred1" : ""
                  } bg-white w-10 h-10 flex items-center justify-center border-2 rounded-full`}
                >
                  6
                </span>
              </div>
              <div className="">
                <div className="h-full">
                  {step === 1 && (
                    <div className="">
                      <ul className="space-y-5 list-decimal">
                        <li className="">
                          <span>
                            You have had some difficulty in giving blood in the
                            past?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step1q1"
                              value="yes"
                              checked={donorApplication.step1q1 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step1q1"
                              value="no"
                              checked={donorApplication.step1q1 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>If inconvenient, mention it</span>
                          <input
                            type="text"
                            name="step1q2"
                            value={donorApplication.step1q2}
                            className="border-2 w-full"
                            readOnly
                            disabled
                          />
                        </li>
                        <li className="">
                          <span>
                            Have you ever received medical advice not to donate
                            blood?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step1q3"
                              value="yes"
                              checked={donorApplication.step1q3 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step1q3"
                              value="no"
                              checked={donorApplication.step1q3 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>
                            Did you read and understand the blood instruction
                            note you received before?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step1q4"
                              value="yes"
                              readOnly
                              checked={donorApplication.step1q4 === "yes"}
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step1q4"
                              value="no"
                              readOnly
                              checked={donorApplication.step1q4 === "no"}
                            />
                            <span>No</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="">
                      <ul className="space-y-5 list-decimal">
                        <li className="">
                          <span>Are you currently in good health?</span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step2q1"
                              value="yes"
                              readOnly
                              checked={donorApplication.step2q1 === "yes"}
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step2q1"
                              value="no"
                              readOnly
                              checked={donorApplication.step2q1 === "no"}
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>
                            Have you received medical treatment for any of the
                            following medical conditions?
                          </span>
                          <div className="grid grid-cols-2">
                            <div>
                              <input
                                type="checkbox"
                                name="heartDisease"
                                checked={
                                  donorApplication.step2q2.heartDisease === true
                                }
                                readOnly
                              />
                              <span>Heart disease</span>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                name="paralysis"
                                checked={
                                  donorApplication.step2q2.paralysis === true
                                }
                                readOnly
                              />
                              <span>Paralysis</span>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                name="diabetes"
                                checked={
                                  donorApplication.step2q2.diabetes === true
                                }
                                readOnly
                              />
                              <span>Diabetes</span>
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                name="bloodDiseases"
                                checked={
                                  donorApplication.step2q2.bloodDiseases ===
                                  true
                                }
                                readOnly
                              />
                              <span>Blood diseases</span>
                            </div>
                          </div>
                        </li>
                        <li className="">
                          <span>Are you currently taking any medication?</span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step2q3"
                              value="yes"
                              checked={donorApplication.step2q3 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step2q3"
                              value="no"
                              checked={donorApplication.step2q3 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>Have you undergone surgery?</span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step2q4"
                              value="yes"
                              checked={donorApplication.step2q4 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step2q4"
                              value="no"
                              checked={donorApplication.step2q4 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>
                            After you blood donated, have you had to carry heavy
                            weights or drive passenger vehicles, climb tall
                            buildings, climb mountains, operate large machinery,
                            etc.?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step2q5"
                              value="yes"
                              checked={donorApplication.step2q5 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step2q5"
                              value="no"
                              checked={donorApplication.step2q5 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>Have you ever had a blood transfusion?</span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step2q6"
                              value="yes"
                              checked={donorApplication.step2q6 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step2q6"
                              value="no"
                              checked={donorApplication.step2q6 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="">
                      <ul className="space-y-5 list-decimal">
                        <li className="">
                          <span>
                            Have you ever had yellow fever or hepatitis?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step3q1"
                              value="yes"
                              checked={donorApplication.step3q1 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step3q1"
                              value="no"
                              checked={donorApplication.step3q1 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>
                            Have you had a fever or typhoid in the last two
                            years?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step3q2"
                              value="yes"
                              checked={donorApplication.step3q2 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step3q2"
                              value="no"
                              checked={donorApplication.step3q2 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="">
                      <h1 className="pb-5 font-semibold">
                        In the last twelve months,
                      </h1>
                      <ul className="space-y-5 list-decimal">
                        <li className="">
                          <span>
                            Have you received an immunization or other vaccine
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step4q1"
                              value="yes"
                              checked={donorApplication.step4q1 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step4q1"
                              value="no"
                              checked={donorApplication.step4q1 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>
                            Have had an ear piercing, tattooing or acupuncture
                            treatment
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step4q2"
                              value="yes"
                              checked={donorApplication.step4q2 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step4q2"
                              value="no"
                              checked={donorApplication.step4q2 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>Have you been in prison?</span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step4q3"
                              value="yes"
                              checked={donorApplication.step4q3 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step4q3"
                              value="no"
                              checked={donorApplication.step4q3 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>Have you or your spouse traveled abroad?</span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step4q4"
                              value="yes"
                              checked={donorApplication.step4q4 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step4q4"
                              value="no"
                              checked={donorApplication.step4q4 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                  {step === 5 && (
                    <div className="">
                      <ul className="space-y-5 list-decimal">
                        <li className="">
                          <span>
                            Have you had or received treatment for dengue in the
                            last six months?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step5q1"
                              value="yes"
                              checked={donorApplication.step5q1 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step5q1"
                              value="no"
                              checked={donorApplication.step5q1 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>
                            In the past month - chicken pox, measles, mumps,
                            (german measles), diarrhea or other persistent (more
                            than a week) fever?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step5q2"
                              value="yes"
                              checked={donorApplication.step5q2 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step5q2"
                              value="no"
                              checked={donorApplication.step5q2 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>
                            In the past week - have you had your teeth removal?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step5q3"
                              value="yes"
                              checked={donorApplication.step5q3 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step5q3"
                              value="no"
                              checked={donorApplication.step5q3 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>
                            Have you used any antibiotics, aspirin or (other)
                            medicines in the last week?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step5q4"
                              value="yes"
                              checked={donorApplication.step5q4 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step5q4"
                              value="no"
                              checked={donorApplication.step5q4 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                  {step === 6 && (
                    <div className="">
                      <ul className="space-y-5 list-decimal">
                        <li className="">
                          <span>
                            If you belong to any of the following categories, do
                            you know blood donation is not suitable?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <br />
                          <p className="font-semibold">
                            If you are infected with AIDS (HIV/AIDS) (Hepatitis
                            B/C).
                          </p>
                          <p className="font-semibold">
                            If your sexual relations are limited to one person
                          </p>
                          <p className="font-semibold">
                            {" "}
                            If you are a man who is in a relationship with
                            another man
                          </p>
                          <p className="font-semibold">
                            If you have ever injected drugs into surgery
                          </p>
                          <p className="font-semibold">
                            If you are engaged in solicitation or prostitution
                          </p>
                          <p className="font-semibold">
                            If you have had sexual intercourse for three or more
                            days in the last 12 months
                          </p>
                          <p className="font-semibold">
                            If in doubt that, AIDS (HIV/AIDS) or other STD
                            infection in you or your partner
                          </p>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step6q1"
                              value="yes"
                              checked={donorApplication.step6q1 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step6q1"
                              value="no"
                              checked={donorApplication.step6q1 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>
                            Do you or your partner/associate belong to any of
                            the above categories?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step6q2"
                              value="yes"
                              checked={donorApplication.step6q2 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step6q2"
                              value="no"
                              checked={donorApplication.step6q2 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                        <li className="">
                          <span>
                            You, with low body weight, swelling of the lymph
                            nodes, lasting suffering from fever or diarrhea?
                          </span>
                          <span className="text-red-700 text-3xl">*</span>
                          <div className="space-x-5">
                            <input
                              type="radio"
                              name="step6q3"
                              value="yes"
                              checked={donorApplication.step6q3 === "yes"}
                              readOnly
                            />
                            <span>Yes</span>
                            <input
                              type="radio"
                              name="step6q3"
                              value="no"
                              checked={donorApplication.step6q3 === "no"}
                              readOnly
                            />
                            <span>No</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {(donorApplication.Id != "" && applicationView == true) && (
            <div className="absolute bottom-0">
              <div className="py-5 flex ">
                <button
                  onClick={goBack}
                  disabled={step === 1}
                  className={` ${
                    step === 1 ? "opacity-40" : ""
                  } bg-white p-2 rounded-xl border-2 px-5 w-full`}
                >
                  Back
                </button>
                <button
                  onClick={goNext}
                  disabled={step === 6}
                  className={`${
                    step === 6 ? "opacity-40" : ""
                  } bg-bloodred1 text-white p-2 px-5 w-full ml-5 rounded-xl`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {/* {(donorApplication.Id != "" && step === 6 && readFinish) && (
            <div className="absolute bottom-0">
          <div className="py-5 flex ">
            <button
              onClick={() => applicationStateChange("Rejected")}
              disabled = {step === 1}
              className={` ${step === 1 ? "opacity-40" : ""} bg-white p-2 rounded-xl border-2 px-5 w-full`}
            >
              Reject
            </button>
            <button
              onClick={() => applicationStateChange("Approved")}

              className={`bg-bloodred1 text-white p-2 px-5 w-full ml-5 rounded-xl`}
            >
              Approve
            </button>
          </div>
          </div>
        )} */}
        </div>
      )}
      {(donorApplication.Id != "" && applicationView == false)&& (
        <div className="w-full px-10 py-5 space-y-5">
          <button
            className="w-full"
            onClick={() =>
              setTabToggle((prevState) => ({
                ...prevState,
                tab1: !prevState.tab1,
              }))
            }
          >
            <div className="bg-slate-300 p-2 px-5 w-full flex justify-between border-2 border-Ash/20 rounded-lg">
              <span>Registration</span>
              <FeatherIcon
                icon={`${tabToggle.tab1 ? "chevron-up" : "chevron-down"}`}
              />
            </div>
          </button>
          {tabToggle.tab1 && (
            <>
            <div className="px-5 grid grid-cols-2">
                <div>
              <span>Above donor name and ID card number verified ?</span>
              <span className="text-red-700 text-3xl">*</span>
              <div className="space-x-5">
                <input
                  type="radio"
                  name="verified"
                  value="yes"
                  onChange={saveTab1Changes}
                  checked={tab1Data.verified === "yes"}
                />
                <span>Yes</span>
                <input
                  type="radio"
                  name="verified"
                  value="no"
                  onChange={saveTab1Changes}
                    checked={tab1Data.verified === "no"}
                />
                <span>No</span>
              </div>
              </div>
              <div>
                <span>Barcord number : </span>
                <input type="text" name="barCode" className="border rounded p-1" value={tab1Data.barCode} onChange={saveTab1Changes} />
              </div>
            </div>
            <div className="space-x-5">
                <button className="bg-white p-2 rounded-xl border-2 px-5" onClick={resetTab1}>
                    Reset
                </button>
                <button className="bg-bloodred2 text-white p-2 rounded-xl border-2 px-5" onClick={() => applicationStateChange("tab1")}>
                    Save
                </button>
            </div>
            </>
          )}

          <button
            className="w-full"
            onClick={() =>
              setTabToggle((prevState) => ({
                ...prevState,
                tab2: !prevState.tab2,
              }))
            }
          >
            <div className="bg-slate-300 p-2 px-5 w-full flex justify-between border-2 border-Ash/20 rounded-lg">
              <span>Medical Assessment</span>
              <FeatherIcon
                icon={`${tabToggle.tab2 ? "chevron-up" : "chevron-down"}`}
              />
            </div>
          </button>
          {tabToggle.tab2 && (
            <>
                <div className=" px-5">
                    <div className="">
                       <span className="font-semibold">History</span>
                       <p>Feeling well? / Adequate overnight sleep (&gt;6hrs)? / last meal &gt;4hrs? / Ever hospitalised? Any allergies, illnesses or medications? / High risk behaviours? (Q6 review)</p>
                       <br/>
                       <span className="font-semibold">Examination</span>
                       <p>Looking or pallor? / lcterus? Alcohol smell / infected wounds / Venepuncture site  lesions</p>
                       <br/>
                       <hr/>
                    </div>
                    <div className="grid grid-cols-3 py-2">
                        <div>
                        <span>CVS status pulse : </span>
                        <input type="text" value={tab2Data.CVS} name="CVS" onChange={saveTab2Changes} className="border rounded p-1" placeholder="/min"/>
                        </div>
                        <div>
                        <span>BP : </span>
                        <input type="text" value={tab2Data.BP} name="BP" onChange={saveTab2Changes} className="border rounded p-1" placeholder="/mmHg"/>
                        </div>
                        <div>
                        <span>Remarks : </span>
                        <input type="text" value={tab2Data.Remark} name="Remark" onChange={saveTab2Changes} className="border rounded p-1" placeholder="Remarks"/>
                        </div>
                    </div>
                    <hr/>
                    <div className="py-2">
                        <span className="font-semibold">Outcome</span>
                        <div className="grid grid-cols-3">
                            <div>
                                <span>Donor to be accepted if Hb &gt; 12.5g/dl : </span>
                                <input name="OutCome" checked={tab2Data.OutCome === "moreThan"} value={"moreThan"} onChange={saveTab2Changes} type="radio" />
                            </div>
                            <div>
                                <span>Temporary deferral : </span>
                                <input name="OutCome" checked={tab2Data.OutCome === "tempDeferral"} value={"tempDeferral"} onChange={saveTab2Changes} type="radio" />
                            </div>
                            <div>
                                <span>Permanent deferral : </span>
                                <input name="OutCome" checked={tab2Data.OutCome === "permDeferral"} value={"permDeferral"} onChange={saveTab2Changes} type="radio" />
                            </div>
                        </div>
                        <span>Remarks/ Reason for deferral : </span>
                        <input type="text" name="RemarkToDeferral" value={tab2Data.RemarkToDeferral} onChange={saveTab2Changes} className="border rounded p-1" />
                    </div>
                        <hr/>
                    <div className="space-x-5 pt-2">
                <button className="bg-white p-2 rounded-xl border-2 px-5" onClick={resetTab2}>
                    Reset
                </button>
                <button className="bg-bloodred2 text-white p-2 rounded-xl border-2 px-5" onClick={() => applicationStateChange("tab2")}>
                    Save
                </button>
            </div>
                </div>
            </>
          )}
          <button
            className="w-full"
            onClick={() =>
              setTabToggle((prevState) => ({
                ...prevState,
                tab3: !prevState.tab3,
              }))
            }
          >
            <div className="bg-slate-300 p-2 px-5 w-full flex justify-between border-2 border-Ash/20 rounded-lg">
              <span>Hb Test & Bag Issue</span>
              <FeatherIcon
                icon={`${tabToggle.tab3 ? "chevron-up" : "chevron-down"}`}
              />
            </div>
          </button>
          {tabToggle.tab3 && (
            <>
                <div className="px-5">
                    <span>Check Donor Name and ID card no for correctness, before registration</span>
                    <div className=" grid grid-cols-2">
                        <div>
                            <span>Hb level : </span>
                            <div className="space-x-5 py-2">
                <input
                  type="radio"
                  name="HbLevel"
                  value="moreThan"
                  onChange={saveTab3Changes}
                  checked = {tab3Data.HbLevel === "moreThan"}
                />
                <span>&gt; 12.5 g/dl</span>
                <input
                  type="radio"
                  name="HbLevel"
                  value="lessThan"
                  onChange={saveTab3Changes}
                  checked = {tab3Data.HbLevel === "lessThan"}
                />
                <span>&lt; 12.5 g/dl</span>
              </div>
                            
                        </div>
                        <div>
                            <span> Blood bag type : </span>
                            <div className="space-x-5">
                <input
                  type="radio"
                  name="BagType"
                  value="Q"
                  onChange={saveTab3Changes}
                  checked={tab3Data.BagType === "Q"}
                />
                <span>Q </span>
                <input
                  type="radio"
                  name="BagType"
                  value="T"
                  checked={tab3Data.BagType === "T"}
                  onChange={saveTab3Changes}
                />
                <span>T </span>
                <input
                  type="radio"
                  name="BagType"
                  value="D"
                  checked={tab3Data.BagType === "D"}
                  onChange={saveTab3Changes}
                />
                <span>D </span>
                <input
                  type="radio"
                  name="BagType"
                  value="S"
                  checked={tab3Data.BagType === "S"}
                  onChange={saveTab3Changes}
                />
                <span>S </span>
              </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="space-x-5 pt-2">
                <button className="bg-white p-2 rounded-xl border-2 px-5" onClick={resetTab3}>
                    Reset
                </button>
                <button className="bg-bloodred2 text-white p-2 rounded-xl border-2 px-5" onClick={() => applicationStateChange("tab3")}>
                    Save
                </button>
            </div>
                    </div>
            </>
          )}
          {/* <button
            className="w-full"
            onClick={() =>
              setTabToggle((prevState) => ({
                ...prevState,
                tab4: !prevState.tab4,
              }))
            }
          >
            <div className="bg-slate-300 p-2 px-5 w-full flex justify-between border-2 border-Ash/20 rounded-lg">
              <span>Blood Collection</span>
              <FeatherIcon
                icon={`${tabToggle.tab4 ? "chevron-up" : "chevron-down"}`}
              />
            </div>
          </button>
          {tabToggle.tab4 && <div>4</div>} */}
        </div>
     ) }
    </>
  );
}

export default DonerApprove;
