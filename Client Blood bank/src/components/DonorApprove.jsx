import FeatherIcon from "feather-icons-react";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import QrScanner from "react-qr-scanner";

function DonerApprove() {
    const [userId, setUserId] = useState("");
    const [Email, setEmail] = useState("");
    const [requestMaker, setRequestMaker] = useState(true);
    const [showScanner, setShowScanner] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:5000/api/donor/getDonor/${userId}/${Email}`)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            
        });
    }, [requestMaker]);

    const handleSearchChange = (e) => {
        setEmail(e.target.value);
        console.log(Email);
    }

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
    }

    const handleError = (err) => {
        console.error(err);
        toast.error("Error scanning QR code", {
            position: "bottom-right",
        });
    }

    const handleScan = (data) => {
        if (data) {
            console.log("Scanned QR Code:", data);
            // setUserId(data);
            setShowScanner(false);
        }
    }

    return (
        <div className="h-full w-full flex justify-center items-center">
            <ToastContainer />
            <div className="w-[50%] flex space-x-5">
                <SearchBar handleSearch = {handleSearchChange} handleSubmit = {handleSearch} placeholderText = "Search by donor Email "/>
                <button onClick = {() => setShowScanner(!showScanner)} className="bg-slate-100 p-2 border-2 border-slate-300 rounded-full">
                    <span className="flex"><span className="text-Ash pr-3">QR</span> <FeatherIcon icon="maximize"/></span>
                </button>
            </div>
            {showScanner && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg">
                        <QrScanner
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%' }}
                        />
                        <button onClick={() => setShowScanner(false)} className="mt-3 bg-red-500 text-white p-2 rounded">Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DonerApprove;