
import {RawMaterial} from "../../model/RawMaterial.ts";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import * as React from "react";
import {Supplier} from "../../model/Supplier.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/store.tsx";
import {getAllSuppliers} from "../../slice/SupplierSlice.ts";
import {formatDate} from "../../util/util.ts";


interface UpdateModalProps{
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    onUpdate: (updatedMaterial: RawMaterial) => void;
    rawMaterial:RawMaterial;
}
 function UpdateRawMaterial({ isModalOpen, setIsModalOpen, onUpdate, rawMaterial}: Readonly<UpdateModalProps>) {


     const supplierMember : Supplier[] = useSelector((state:  {supplier:Supplier[]} ) => state.supplier);
     const dispatch = useDispatch<AppDispatch>();  // A hook to access the dispatch function from the Redux store

     useEffect(() => {
         if (!supplierMember || supplierMember.length === 0) {
             dispatch(getAllSuppliers());
         }

     }, [dispatch]);


     const [formData, setFormData] = useState({
        supplierID: rawMaterial.supplierID,
        quantityInKg: rawMaterial.quantityInKg,
        dateReceived: rawMaterial.dateReceived,
    });

     useEffect(() => {
            setFormData({
                supplierID: rawMaterial.supplierID,
                quantityInKg: rawMaterial.quantityInKg,
                dateReceived: rawMaterial.dateReceived
            });
     }, [isModalOpen]);

     function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
         const { name, value } = e.target;
         setFormData({ ...formData, [name]: value });
     }

     function handleUpdate() {

         console.log("Raw Materiawwwwl",rawMaterial);

         const updatesMaterial = {
             ...rawMaterial,
             supplierID: rawMaterial.supplierID,
             quantityInKg: Number(formData.quantityInKg),
             dateReceived: new Date(formData.dateReceived),

         };
         console.log("Update",updatesMaterial);
         onUpdate(updatesMaterial);
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

                    <h1 className="text-center text-xl font-semibold mb-5">Add Raw Material</h1>

                    <div className="overflow-y-auto h-[60vh] custom-scrollbar p-2">

                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="supplierID" className="block text-sm font-medium text-gray-900">Supplier
                                ID</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="supplierID"
                                    id="supplierID"
                                    value={formData.supplierID}
                                    readOnly={true}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>

                        </div>

                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="supplierName" className="block text-sm font-medium text-gray-900">Supplier
                                Name</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="supplierName"
                                    id="supplierName"
                                    value={supplierMember.find((supplier) => supplier.supplierID === formData.supplierID)?.firstName + " " + supplierMember.find((supplier) => supplier.supplierID === formData.supplierID)?.lastName}
                                    readOnly={true}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="quantityIn-Kg" className="block text-sm font-medium text-gray-900">Quantity
                                /KG</label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="quantityInKg"
                                    id="quantityIn-Kg"
                                    value={formData.quantityInKg}
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="quantityIn-Kg" className="block text-sm font-medium text-gray-900">Current Received Date
                                </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="quantityInKg"
                                    id="quantityIn-Kg"
                                    value={formatDate(formData.dateReceived)}
                                    readOnly={true}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 hover:outline-green-500 sm:text-sm"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-3 py-5">
                            <label htmlFor="date-Received" className="block text-sm font-medium text-gray-900"> Change
                                Date of
                                Received</label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="dateReceived"
                                    id="date-Received"
                                    value={formData.dateReceived.toString()}
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
                                    Update
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

export default UpdateRawMaterial;