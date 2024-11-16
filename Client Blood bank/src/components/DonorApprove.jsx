import FeatherIcon from "feather-icons-react";
import SearchBar from "./SearchBar";


function DonerApprove() {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-[50%] flex space-x-5">
                <SearchBar placeholderText = "Search by donor Email "/>
                <button className="bg-slate-100 p-2 border-2 border-slate-300 rounded-full">
                    <span className="flex"><span className="text-Ash pr-3">QR</span> <FeatherIcon icon="maximize"/></span>
                </button>
            </div>
        </div>
    )
}

export default DonerApprove;