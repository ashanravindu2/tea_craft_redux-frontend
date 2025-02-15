import {useEffect, useState} from "react";
import { motion } from "framer-motion";

import * as React from "react";
import {Production} from "../../model/Production.ts";
import {RawMaterial} from "../../model/RawMaterial.ts";
import {useDispatch, useSelector} from "react-redux";

import {AppDispatch} from "../../store/store.tsx";
import {getAllRawMaterials} from "../../slice/RawMaterialSlice.ts";


interface AddProductionProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    onSave: (e:Production) => void;
}

function AddProduction({ isModalOpen, setIsModalOpen, onSave }: Readonly<AddProductionProps>){

    const rawMaterials : RawMaterial[] = useSelector((state:  {rawMaterial:RawMaterial[]} ) => state.rawMaterial);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!rawMaterials || rawMaterials.length === 0) {
            dispatch(getAllRawMaterials());
        }
    }, [dispatch]);

    const [formData, setFormData] = useState({
        stockID: "",
        processDate: "",
        logs: "",
        processedQuantity: "",

    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSave = () => {
        // if (!formData.firstName || !formData.lastName || !formData.designation || !formData.email){
        //     alert("All fields are required!");
        //     return;
        // }


        const newProduction = new Production(
            "PR" + Math.floor(Math.random() * 1000),
            formData.stockID,
            new Date(formData.processDate).toISOString(),
            formData.logs,
            Number(formData.processedQuantity)

        );

        console.log("Add",newProduction);
        onSave(newProduction);
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
                                <label htmlFor="stock-ID" className="block text-sm font-medium text-gray-900">Raw
                                    Material StockCode
                                </label>
                                <div className="mt-2">
                                    <select
                                        name="stockID"
                                        id="stock-ID"
                                        value={formData.stockID}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    >
                                        <option value="" disabled>Select StockID</option>
                                        {rawMaterials.map((material) => (
                                            <option value={material.stockID}>{material.stockID}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

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
                                <label htmlFor="processed-Quantity" className="block text-sm font-medium text-gray-900">Process
                                    Quantity
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="processedQuantity"
                                        id="processed-Quantity"
                                        value={formData.processedQuantity}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                    />
                                </div>
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
                                    onClick={handleSave}
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

export default AddProduction;
