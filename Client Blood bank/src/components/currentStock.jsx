import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";


function CurrentStock() {
    const bloodbankId = JSON.parse(localStorage.getItem("user")).userId;

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
        ONegativeRBC: 0
    })

    useEffect(() => {
        axios.get(`http://localhost:5000/stockData/getStockData/${bloodbankId}`)
        .then ((response) => {
            console.log(response.data)
            setStockData(response.data)
        })
        .catch ((error) => {
            console.log(error)
            toast.error(error.response.data.message, {
                position: "bottom-right",
            })
        })
        .finally (() => {

        })
    }, []);


return (
    <>
            <ToastContainer />
            <div className="pt-2 px-5 ">
                    <div className="grid grid-rows-2 w-full gap-y-5 pt-28">
                            <div className="grid grid-cols-2 w-full gap-5 gap-y-5">
                                    <div className="w-full space-y-2 border-bloodred2/20 border-2 p-2 rounded-lg">
                                            <div className="bg-bloodred3 flex rounded-lg">
                                            <span className="w-full text-white text-center py-1">A</span>
                                            </div>
                                            <div className="grid grid-cols-2 rounded-lg space-x-2">
                                                    <div className="border-bloodred2/20 border-2 rounded-md">
                                                            <h1 className="text-center py-4">RH (+)</h1>
                                                            <hr className="border-t-2 border-black/20"/>
                                                            <div className=" grid grid-cols-3">
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Red cells</h2>
                                                                            <h3 className="text-center py-2">{stockData.APositiveRBC}</h3>
                                                                    </div>
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Platelets</h2>
                                                                            <h3 className="text-center py-2">{stockData.APositivePlatelets}</h3>
                                                                    </div>
                                                                    <div>
                                                                            <h2 className="text-center py-2">Plasma</h2>
                                                                            <h3 className="text-center py-2">{stockData.APositivePlasma}</h3>
                                                                    </div>
                                                            </div>
                                                    </div>
                                                    <div className="border-bloodred2/20 border-2 rounded-md">
                                                            <h1 className="text-center py-4">RH (-)</h1>
                                                            <hr className="border-t-2 border-black/20"/>
                                                            <div className=" grid grid-cols-3">
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Red cells</h2>
                                                                            <h3 className="text-center py-2">{stockData.ANegativeRBC}</h3>
                                                                    </div>
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Platelets</h2>
                                                                            <h3 className="text-center py-2">{stockData.ANegativePlatelets}</h3>
                                                                    </div>
                                                                    <div>
                                                                            <h2 className="text-center py-2">Plasma</h2>
                                                                            <h3 className="text-center py-2">{stockData.ANegativePlasma}</h3>
                                                                    </div>
                                                            </div>
                                                    </div>
                                            </div>
                                    </div>
                                    <div className="w-full space-y-2 border-bloodred2/20 border-2 p-2 rounded-lg">
                                            <div className="bg-bloodred3 flex rounded-lg">
                                            <span className="w-full text-white text-center py-1">B</span>
                                            </div>
                                            <div className="grid grid-cols-2 rounded-lg space-x-2">
                                                    <div className="border-bloodred2/20 border-2 rounded-md">
                                                            <h1 className="text-center py-4">RH (+)</h1>
                                                            <hr className="border-t-2 border-black/20"/>
                                                            <div className=" grid grid-cols-3">
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Red cells</h2>
                                                                            <h3 className="text-center py-2">{stockData.BPositiveRBC}</h3>
                                                                    </div>
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Platelets</h2>
                                                                            <h3 className="text-center py-2">{stockData.BPositivePlatelets}</h3>
                                                                    </div>
                                                                    <div>
                                                                            <h2 className="text-center py-2">Plasma</h2>
                                                                            <h3 className="text-center py-2">{stockData.BPositivePlasma}</h3>
                                                                    </div>
                                                            </div>
                                                    </div>
                                                    <div className="border-bloodred2/20 border-2 rounded-md">
                                                            <h1 className="text-center py-4">RH (-)</h1>
                                                            <hr className="border-t-2 border-black/20"/>
                                                            <div className=" grid grid-cols-3">
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Red cells</h2>
                                                                            <h3 className="text-center py-2">{stockData.BNegativeRBC}</h3>
                                                                    </div>
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Platelets</h2>
                                                                            <h3 className="text-center py-2">{stockData.BNegativePlatelets}</h3>
                                                                    </div>
                                                                    <div>
                                                                            <h2 className="text-center py-2">Plasma</h2>
                                                                            <h3 className="text-center py-2">{stockData.BNegativePlasma}</h3>
                                                                    </div>
                                                            </div>
                                                    </div>
                                            </div>
                                    </div>
                            </div>
                            <div className="grid grid-cols-2 w-full gap-5">
                                    <div className="w-full space-y-2 border-bloodred2/20 border-2 p-2 rounded-lg">
                                            <div className="bg-bloodred3 flex rounded-lg">
                                            <span className="w-full text-white text-center py-1">AB</span>
                                            </div>
                                            <div className="grid grid-cols-2 rounded-lg space-x-2">
                                                    <div className="border-bloodred2/20 border-2 rounded-md">
                                                            <h1 className="text-center py-4">RH (+)</h1>
                                                            <hr className="border-t-2 border-black/20"/>
                                                            <div className=" grid grid-cols-3">
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Red cells</h2>
                                                                            <h3 className="text-center py-2">{stockData.ABPositiveRBC}</h3>
                                                                    </div>
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Platelets</h2>
                                                                            <h3 className="text-center py-2">{stockData.ABPositivePlatelets}</h3>
                                                                    </div>
                                                                    <div>
                                                                            <h2 className="text-center py-2">Plasma</h2>
                                                                            <h3 className="text-center py-2">{stockData.ABPositivePlasma}</h3>
                                                                    </div>
                                                            </div>
                                                    </div>
                                                    <div className="border-bloodred2/20 border-2 rounded-md">
                                                            <h1 className="text-center py-4">RH (-)</h1>
                                                            <hr className="border-t-2 border-black/20"/>
                                                            <div className=" grid grid-cols-3">
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Red cells</h2>
                                                                            <h3 className="text-center py-2">{stockData.ABNegativeRBC}</h3>
                                                                    </div>
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Platelets</h2>
                                                                            <h3 className="text-center py-2">{stockData.ABNegativePlatelets}</h3>
                                                                    </div>
                                                                    <div>
                                                                            <h2 className="text-center py-2">Plasma</h2>
                                                                            <h3 className="text-center py-2">{stockData.ABNegativePlasma}</h3>
                                                                    </div>
                                                            </div>
                                                    </div>
                                            </div>
                                    </div>
                                    <div className="w-full space-y-2 border-bloodred2/20 border-2 p-2 rounded-lg">
                                            <div className="bg-bloodred3 flex rounded-lg">
                                            <span className="w-full text-white text-center py-1">O</span>
                                            </div>
                                            <div className="grid grid-cols-2 rounded-lg space-x-2">
                                                    <div className="border-bloodred2/20 border-2 rounded-md">
                                                            <h1 className="text-center py-4">RH (+)</h1>
                                                            <hr className="border-t-2 border-black/20"/>
                                                            <div className=" grid grid-cols-3">
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Red cells</h2>
                                                                            <h3 className="text-center py-2">{stockData.OPositiveRBC}</h3>
                                                                    </div>
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Platelets</h2>
                                                                            <h3 className="text-center py-2">{stockData.OPositivePlatelets}</h3>
                                                                    </div>
                                                                    <div>
                                                                            <h2 className="text-center py-2">Plasma</h2>
                                                                            <h3 className="text-center py-2">{stockData.OPositivePlasma}</h3>
                                                                    </div>
                                                            </div>
                                                    </div>
                                                    <div className="border-bloodred2/20 border-2 rounded-md">
                                                            <h1 className="text-center py-4">RH (-)</h1>
                                                            <hr className="border-t-2 border-black/20"/>
                                                            <div className=" grid grid-cols-3">
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Red cells</h2>
                                                                            <h3 className="text-center py-2">{stockData.ONegativeRBC}</h3>
                                                                    </div>
                                                                    <div className="border-r-2 border-black/20">
                                                                            <h2 className="text-center py-2">Platelets</h2>
                                                                            <h3 className="text-center py-2">{stockData.ONegativePlatelets}</h3>
                                                                    </div>
                                                                    <div>
                                                                            <h2 className="text-center py-2">Plasma</h2>
                                                                            <h3 className="text-center py-2">{stockData.ONegativePlasma}</h3>
                                                                    </div>
                                                            </div>
                                                    </div>
                                            </div>
                                    </div>
                            </div>
                    </div>
            </div>
    </>
);
}

export default CurrentStock;