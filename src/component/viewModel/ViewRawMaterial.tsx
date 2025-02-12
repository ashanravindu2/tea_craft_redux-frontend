
import {RawMaterial} from "../../model/RawMaterial.ts";
import {motion} from "framer-motion";
import {formatDate} from "../../util/util.ts";


interface ViewMaterialProps {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
    rawMaterial:RawMaterial;
}

 function ViewRawMaterial({ isOpenModal, setIsOpenModal, rawMaterial }: Readonly<ViewMaterialProps>) {
    return (
        isOpenModal && (

            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center"
                initial={{ opacity: 0 }} // Initial fade-in for the overlay
                animate={{ opacity: isOpenModal ? 1 : 0 }} // Fade-in/out animation
                exit={{ opacity: 0 }} // Fade-out on close
                transition={{ duration: 0.3 }} // Smooth transition for the background
            >
                {/* Background overlay */}
                <motion.div
                    className="absolute inset-0 bg-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpenModal ? 0.5 : 0 }} // Fade-in to 50% opacity
                    exit={{ opacity: 0 }} // Fade-out on close
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth easing for the overlay
                ></motion.div>

                {/* Modal content */}
                <motion.div
                    className="bg-white rounded-lg p-8 w-full drop-shadow-2xl sm:w-[60vw]"
                    initial={{opacity: 0, scale: 0.8}} // Start slightly smaller and faded out
                    animate={{
                        opacity: isOpenModal ? 1 : 0,
                        scale: isOpenModal ? 1 : 0.8, // Zoom-in animation
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

                    <h1 className="text-center text-xl font-semibold mb-5">View Raw Material</h1>

                    <div className="overflow-y-auto h-[60vh] custom-scrollbar p-2">

                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="supplierName" className="block text-sm font-medium text-gray-900">Stock
                                ID</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    value={rawMaterial.stockID}
                                    readOnly={true}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="supplierName" className="block text-sm font-medium text-gray-900">Supplier
                                ID</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    value={rawMaterial.supplierID}
                                    readOnly={true}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="quantityInKg" className="block text-sm font-medium text-gray-900">Quantity
                                /KG</label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    value={rawMaterial.quantityInKg}
                                    readOnly={true}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="dateReceived" className="block text-sm font-medium text-gray-900">Date of
                                Received</label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    value={formatDate(rawMaterial.dateReceived)}
                                    readOnly={true}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
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


export default ViewRawMaterial;