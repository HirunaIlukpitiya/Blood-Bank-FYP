import BackButton from "./backButton";
import FeatherIcon from "feather-icons-react";


function DonationCamps() {
    const pdfFileUrl1 = '../assets/pd1.pdf';
    const pdfFileUrl2 = "../assets/pd2.pdf";

    const downloadFile = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="flex items-center">
                <div>
                    <span><BackButton /></span>
                    <span className="pb-2 text-4xl text-bloodred1 pl-3">Donation Camps</span>
                </div>
            </div>
            <div className=" mt-5">
                <h1 className="text-Ash text-4xl">
                    Instruction Manual
                </h1>
                <p className="text-slate-500">Please read the document carefully. It is essential for better organization of the blood donation camp.</p>
            </div>
            <div className="flex justify-center my-2 space-x-5">
                <button
                    onClick={() => downloadFile(pdfFileUrl1, 'pd1.pdf')}
                    className="bg-bloodred1 text-white rounded-xl p-1 px-3 flex items-center space-x-2"
                >
                    <FeatherIcon icon="download" className="text-white" />
                    <span>Download PDF 1</span>
                </button>
                <button
                    onClick={() => downloadFile(pdfFileUrl2, 'pd2.pdf')}
                    className="bg-bloodred1 text-white rounded-xl p-1 px-3 flex items-center space-x-2"
                >
                    <FeatherIcon icon="download" className="text-white" />
                    <span>Download PDF 2</span>
                </button>
            </div>
            <hr className="border-Ash"/>
        </>
    );
}

export default DonationCamps;