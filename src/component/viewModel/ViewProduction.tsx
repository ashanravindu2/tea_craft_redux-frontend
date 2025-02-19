import { motion } from "framer-motion";

import {Production} from "../../model/Production.ts";
import {formatDate} from "../../util/util.ts";


interface ViewProductionProps {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
    production: Production;
}

function ViewProduction({ isOpenModal, setIsOpenModal, production }: Readonly<ViewProductionProps>) {
    return (
        isOpenModal && (
            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpenModal ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Background overlay */}
                <motion.div
                    className="absolute inset-0 bg-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpenModal ? 0.5 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                ></motion.div>

                {/* Modal content */}
                <motion.div
                    className="bg-white rounded-lg p-8 w-full drop-shadow-2xl sm:w-[60vw]"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: isOpenModal ? 1 : 0, scale: isOpenModal ? 1 : 0.8}}
                    exit={{opacity: 0, scale: 0.9, y: 50}}
                    transition={{duration: 0.4, ease: "easeInOut"}}
                >
                    <h1 className="text-center text-xl font-semibold mb-5">View Production</h1>

                    <div className="overflow-y-auto h-[60vh] custom-scrollbar p-2 font-medium">

                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-10">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Production Code</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={production.productionID}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Stock Material
                                    Quality</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={production.qualityChecks ? "Pass" : "Fail"} // Display "Pass" for true, "Fail" for false
                                        readOnly
                                        className={`block w-full rounded-md px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 
                ${production.qualityChecks ? "bg-green-300 outline-green-500" : "bg-red-300 outline-red-500"}`}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Designation and Gender */}
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Production Date</label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        value={formatDate(production.processDate)}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Quantity/KG</label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        value={production.processedQuantity}
                                        readOnly
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 sm:text-sm outline outline-2 -outline-offset-1 outline-gray-300"
                                    />
                                </div>
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
                                value={production.logs}
                                readOnly
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 font-semibold ">
                        <div className="sm:col-span-6">
                            <div className="mt-2">
                                <button
                                    onClick={() => setIsOpenModal(false)}
                                    className="bg-gray-300 w-full rounded-lg py-2 px-4 text-black hover:bg-gray-400 focus:outline-none "
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

export default ViewProduction;
