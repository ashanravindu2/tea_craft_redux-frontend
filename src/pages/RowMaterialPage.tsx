import {motion} from "framer-motion";

import TableData from "../component/TableData.tsx";
import AddRawMaterial from "../component/saveModel/AddRawMaterial.tsx";


import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {deleteRawMaterial, getAllRawMaterials, saveRawMaterial, updateRawMaterial} from "../slice/RawMaterialSlice.ts";
import DeleteModal from "../component/DeleteModal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RawMaterial} from "../model/RawMaterial.ts";
import {AppDispatch} from "../store/store.tsx";
import {formatDate} from "../util/util.ts";
import ViewRawMaterial from "../component/viewModel/ViewRawMaterial.tsx";
import UpdateRawMaterial from "../component/updateModel/UpdateRawMaterial.tsx";
import {Supplier} from "../model/Supplier.ts";
import {getAllProductions} from "../slice/ProductionSlice.ts";
import {getAllSuppliers} from "../slice/SupplierSlice.ts";



export function RowMaterialPage() {

    const rawMaterials : RawMaterial[] = useSelector((state:  {rawMaterial:RawMaterial[]} ) => state.rawMaterial);
    const supplierMember : Supplier[] = useSelector((state:  {supplier:Supplier[]} ) => state.supplier);
    const rawMaterialHeaders = ['StockID', 'SupplierID', 'Supplier Name', 'Quantity/KG', 'Received Date', 'Actions'];

    const dispatch  = useDispatch<AppDispatch>() // A hook to access the dispatch function from the Redux store

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedRawMaterial, setSelectedRawMaterial] = useState<RawMaterial | null>(null);


    const renderRawMaterialRow = (rawMaterial?: RawMaterial) => {

        if (!rawMaterial) return <div className={"p-2"}>Invalid Raw Material Data</div>;
        return (
            <>
                <div className="p-2 truncate">{rawMaterial.stockID}</div>
                <div className="p-2 truncate">{rawMaterial.supplierID}</div>
                <div className="p-2 truncate">{

                    supplierMember.filter((supplier) => supplier.supplierID === rawMaterial.supplierID).map((filteredSupplier) => {
                        return filteredSupplier.firstName + " " + filteredSupplier.lastName;
                    })
                }</div>
                <div className="p-2 truncate">{rawMaterial.quantityInKg}</div>
                <div className="p-2 truncate">{formatDate(rawMaterial.dateReceived)}</div>
            </>
        );
    };


    function handleAddRawMaterial(newRawMaterial : RawMaterial) {
        console.log("Empage",newRawMaterial);
        dispatch(saveRawMaterial(newRawMaterial));
        setIsModalOpen(false);
        toast.success('Raw saved successfully');
    }

    function handleViewRawMaterial(newRawMaterial : RawMaterial) {
        setSelectedRawMaterial(newRawMaterial);
        setIsViewModalOpen(true);
    }

    function openUpdateModal(newRawMaterial : RawMaterial) {
        setSelectedRawMaterial(newRawMaterial);
        setIsUpdateModalOpen(true);
    }

    function handleUpdateRawMaterial(newRawMaterial : RawMaterial) {
        console.log("Empagwwwwwwwwwe",newRawMaterial);
        dispatch(updateRawMaterial(newRawMaterial));
        setIsUpdateModalOpen(false);
        toast.success(
            <div className="flex items-center space-x-2 ">
                <i className="fa fa-refresh text-blue-500"></i>
                <span>Raw updated successfully!</span>
            </div>,
            { icon: false }
        );
    }


    useEffect(() => {
        if (!rawMaterials || rawMaterials.length === 0) {
            dispatch(getAllRawMaterials());
        }

    }, [dispatch]);





    function handleDeleteRawMaterial(newRawMaterial : RawMaterial) {
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    dispatch(deleteRawMaterial(newRawMaterial.stockID));
                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>Raw deleted successfully!</span>
                        </div>,
                        { icon: false }
                    );
                }}
                onCancel={() => {
                    toast.dismiss(t.id);
                }}
            />

        ));
    }

    return (
        <motion.div
            initial={{
                opacity: 0,  // Start invisible
            }}
            animate={{
                opacity: 1,  // Fade in to full visibility
            }}
            exit={{
                opacity: 0,  // Fade out
            }}
            transition={{
                duration: 0.8,  // Duration for the fade effect
                ease: [0.25, 0.8, 0.5, 1],  // Smooth easing curve
            }}
        >
            <div className="container mx-auto p-3">

                <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
                    Row Material Management
                </h1>

                <div className="flex space-x-4 mt-3">
                    <div className="relative hidden md:block group mb-4">
                        <input
                            id="search-bar"
                            type="text"
                            placeholder="Search here..."
                            name="text"
                            className="w-[20vw] pl-10 pr-4 py-2 rounded-xl  border-2 border-gray-300 opacity-80 focus:opacity-100 focus:w-[24vw] transition-all duration-200 ease-in-out outline-none hover:border-green-500 focus:border-green-500 group-hover:border-green-500"
                        />
                        <i className="fa fa-search absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600 group-hover:text-green-500"></i>
                    </div>
                </div>

                <div className="flex flex-wrap justify-end sm:justify-end space-x-0 sm:space-x-4 mb-5">
                    <button
                        id="btn-add"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#347486]  text-white hover:text-[#347486] px-8 py-2 rounded-lg font-semibold hover:bg-white transition text-sm sm:text-base flex items-center space-x-2 group sm:w-auto"
                    >
                        <i className="fa-solid fa-plus font-bold"></i>
                        <span className="pl-2">Add</span>
                    </button>
                </div>

                <AddRawMaterial isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                onSave={handleAddRawMaterial}/>

                {selectedRawMaterial && (
                    <ViewRawMaterial
                        isOpenModal={isViewModalOpen}
                        setIsOpenModal={setIsViewModalOpen}
                        rawMaterial={selectedRawMaterial}
                    />
                )}

                {selectedRawMaterial && (
                    <UpdateRawMaterial
                        isModalOpen={isUpdateModalOpen}
                        setIsModalOpen={setIsUpdateModalOpen}
                        rawMaterial={selectedRawMaterial}
                        onUpdate={handleUpdateRawMaterial}
                    />
                )}

                {/*table*/}
                <TableData data={rawMaterials} headers={rawMaterialHeaders} renderRow={renderRawMaterialRow}
                           handleView={handleViewRawMaterial} handleUpdate={openUpdateModal}
                           handleDelete={handleDeleteRawMaterial}
                ></TableData>
            </div>


        </motion.div>
    );
}