
import {Production} from "../../model/Production.ts";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import * as React from "react";
import {RawMaterial} from "../../model/RawMaterial.ts";
import {useDispatch, useSelector} from "react-redux";
import {formatDate} from "../../util/util.ts";
import toast from "react-hot-toast";
import {AppDispatch, RootState} from "../../store/store.tsx";
import {getAllProductions} from "../../slice/ProductionSlice.ts";

interface UpdateModalProps{
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    onUpdate: (updated: Production) => void;
    production:Production;
}
export function UpdateProduction({ isModalOpen, setIsModalOpen, onUpdate, production}: Readonly<UpdateModalProps>) {
    const rawMaterials : RawMaterial[] = useSelector((state:  RootState) => state.rawMaterial);
    const dispatch   = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!rawMaterials || rawMaterials.length === 0) {
            dispatch(getAllProductions());
        }
    }, [dispatch]);


    const [formData, setFormData] = useState({
        production: production.productionID,
        qualityChecks: production.qualityChecks,
        processDate:formatDate( production.processDate),
        logs: production.logs,
        processedQuantity: production.processedQuantity,
        ifStockMaterial: ""

    });

    useEffect(() => {
        setFormData({
            production: production.productionID,
            qualityChecks: production.qualityChecks,
            processDate:formatDate( production.processDate),
            logs: production.logs,
            processedQuantity: production.processedQuantity,
            ifStockMaterial: ""
        });
    }, [isModalOpen]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "processDate") {
            console.log("Date",value);
            const totalQuantity = rawMaterials
                .filter((stock) => {
                    const formattedDate = new Date(stock.dateReceived).toISOString().split("T")[0];
                    return formattedDate === value; // Filter by the specific date
                })
                .reduce((sum, stock) => {
                    return sum + parseFloat(String(stock.quantityInKg)); // Sum up the quantityInKg (ensure it's treated as a number)
                }, 0); // Initialize sum as 0

            console.log("Total Quantity",totalQuantity);
            setFormData({ ...formData, ifStockMaterial: String(totalQuantity) })
        }

        if (name == "processedQuantity"){
            if (parseFloat(value) > parseFloat(formData.ifStockMaterial)){

                toast("Processed Quantity cannot be greater than the available stock", {
                    icon: "⚠️",
                    style: {
                        backgroundColor: "#ff0300", // pink background
                        color: "white",         // White text color
                        fontWeight: "bold",     // Bold text style
                    },
                });

                setFormData({ ...formData, processedQuantity: 0 })
            }
        }

    }

    const handleUpdate = () => {
        const updatedProduction = {
            ...production,
            qualityChecks: formData.qualityChecks,
            processDate: formData.processDate,
            logs: formData.logs,
            processedQuantity: formData.processedQuantity,
        };
        console.log("Update",updatedProduction);
        onUpdate(updatedProduction);
        setIsModalOpen(false);
    }
    return (
        isModalOpen && (

            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center"
                initial={{ opacity: 0 }} // Initial fade-in for the overlay
                animate={{ opacity: isModalOpen ? 1 : 0 }} // Fade-in/out animation
                exit={{ opacity: 0 }} // Fade-out on close
                transition={{ duration: 0.3 }} // Smooth transition for the background
            >
                {/* Background overlay */}
                <motion.div
                    className="absolute inset-0 bg-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isModalOpen ? 0.5 : 0 }} // Fade-in to 50% opacity
                    exit={{ opacity: 0 }} // Fade-out on close
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth easing for the overlay
                ></motion.div>

                {/* Modal content */}
                <motion.div
                    className="bg-white rounded-lg p-8 w-full drop-shadow-2xl sm:w-[60vw]"
                    initial={{ opacity: 0, scale: 0.8 }} // Start slightly smaller and faded out
                    animate={{
                        opacity: isModalOpen ? 1 : 0,
                        scale: isModalOpen ? 1 : 0.8, // Zoom-in animation
                    }}
                    exit={{
                        opacity: 0, // Fade out
                        scale: 0.9, // Slight shrink
                        y: 50, // Slide down slightly for a smoother exit
                    }} // Shrink and fade out on close
                    transition={{
                        duration: 0.4, // Slightly longer for content to emphasize smoothness
                        ease: "easeInOut", // Professional easing
                    }}
                >

                    <h1 className="text-center text-xl font-semibold mb-5">Process Production</h1>

                    <div className="overflow-y-auto h-[60vh] custom-scrollbar p-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">


                            <div className="sm:col-span-3">
                                <label htmlFor="process-Date" className="block text-sm font-medium text-gray-900">Process
                                    Date</label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="processDate"
                                        id="process-Date"
                                        value={formData.processDate}
                                        onChange={handleInputChange}

                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="ifStock-Material" className="block text-sm font-medium text-gray-900">Ithuru
                                    Raw
                                    Stock*

                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="ifStockMaterial"
                                        id="ifStock-Material"
                                        value={formData.ifStockMaterial}
                                        onChange={handleInputChange}
                                        readOnly={true}
                                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 ${
                                            formData.ifStockMaterial === "0" ? "outline-red-500 focus:outline-red-500 hover:outline-red-500    " : "outline-gray-300"
                                        } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm`}
                                    />
                                </div>
                            </div>


                            <div className="sm:col-span-3">
                                <label htmlFor="processed-Quantity" className="block text-sm font-medium text-gray-900">Process*

                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="processedQuantity"
                                        id="processed-Quantity"
                                        value={formData.processedQuantity}
                                        onChange={handleInputChange}
                                        required={true}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3 flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    name="qualityChecks"
                                    id="quality-Checks"
                                    checked={formData.qualityChecks}
                                    onChange={(e) => setFormData({...formData, qualityChecks: e.target.checked})}
                                    className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <label htmlFor="quality-Checks" className="ml-2 text-sm font-medium text-gray-900">
                                    Quality Check Passed
                                </label>
                            </div>

                        </div>

                        <div className="sm:col-span-3 mt-10">
                            <label htmlFor="log-s" className="block text-sm font-medium text-gray-900">Process logs*
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="logs"
                                    id="log-s"
                                    value={formData.logs}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
                        </div>


                    </div>

                    <div
                        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 font-semibold"
                    >
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <button
                                    id="btn-save"
                                    onClick={handleUpdate}
                                    className="bg-green-600 w-full rounded-lg py-2 px-4 text-white hover:bg-green-700 focus:outline-none"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <button
                                    id="close-modal"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 w-full rounded-lg py-2 px-4 text-black hover:bg-gray-400 focus:outline-none"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default UpdateProduction
