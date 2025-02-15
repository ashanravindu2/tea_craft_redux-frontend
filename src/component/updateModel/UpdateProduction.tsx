
import {Production} from "../../model/Production.ts";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import * as React from "react";
import {RawMaterial} from "../../model/RawMaterial.ts";
import {useSelector} from "react-redux";
import {formatDate} from "../../util/util.ts";

interface UpdateModalProps{
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    onUpdate: (updated: Production) => void;
    production:Production;
}
export function UpdateProduction({ isModalOpen, setIsModalOpen, onUpdate, production}: Readonly<UpdateModalProps>) {
    const rawMaterialsID : RawMaterial[] = useSelector((state:  {raw_material:RawMaterial[]} ) => state.raw_material);
    const [formData, setFormData] = useState({
        production: production.productionID,
        stockID: production.stockID,
        processDate:formatDate( production.processDate),
        logs: (production.logs),
        processedQuantity: (production.processedQuantity)
    });

    useEffect(() => {
        setFormData({
            production: production.productionID,
            stockID: production.stockID,
            processDate:formatDate( production.processDate),
            logs: production.logs,
            processedQuantity: production.processedQuantity
        });
    }, [isModalOpen]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleUpdate = () => {
        const updatedProduction = {
            ...production,
            stockID: formData.stockID,
            processDate: formData.processDate,
            logs: formData.logs,
            processedQuantity: formData.processedQuantity
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
                    <h1 className="text-center text-xl font-semibold mb-5"> Update Production </h1>

                    <div className="overflow-y-auto h-[60vh] custom-scrollbar p-2">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">

                            <div className="sm:col-span-3">
                                <label htmlFor="productionID" className="block text-sm font-medium text-gray-900">Process
                                    Date</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="productionID"
                                        id="productionID"
                                        disabled={true}
                                        value={formData.production}

                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>


                            <div className="sm:col-span-3">
                                <label htmlFor="stockID" className="block text-sm font-medium text-gray-900">Raw
                                    Material StockCode
                                </label>
                                <div className="mt-2">
                                    <select
                                        name="stockID"
                                        id="stockID"
                                        value={formData.stockID}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    >
                                        <option value="" disabled>Select StockID</option>
                                        {rawMaterialsID.map((materials) => (
                                            <option value={materials.stockID}>{materials.stockID}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="process-date" className="block text-sm font-medium text-gray-900">Process
                                    Date</label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="process-date"
                                        id="process-date"
                                        value={formData.processDate}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="process-quan" className="block text-sm font-medium text-gray-900">Process
                                    Quantity
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="process-quan"
                                        id="process-quan"
                                        value={formData.processedQuantity}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                        </div>


                        <div className="sm:col-span-3 mt-10">
                            <label htmlFor="process-logs" className="block text-sm font-medium text-gray-900">Process
                                logs*
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="logs"
                                    id="process-logs"
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