import {motion} from "framer-motion";



import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";

import toast from "react-hot-toast";
import {deleteProduction, getAllProductions, saveProduction, updateProduction} from "../slice/ProductionSlice.ts";
import DeleteModal from "../component/DeleteModal.tsx";
import {formatDate} from "../util/util.ts";
import AddProduction from "../component/saveModel/AddProduction.tsx";
import ViewProduction from "../component/viewModel/ViewProduction.tsx";
import TableData from "../component/TableData.tsx";
import {UpdateProduction} from "../component/updateModel/UpdateProduction.tsx";
import {AppDispatch, RootState} from "../store/store.tsx";
import {getAllRawMaterials} from "../slice/RawMaterialSlice.ts";
import {RawMaterial} from "../model/RawMaterial.ts";
import {Production} from "../model/Production.ts";



export function ProductionPage() {

    const productions : Production[] = useSelector((state:  {production:Production[]} ) => state.production);

    const productionHeaders = ['productionID', 'Quality status', 'processDate', 'processedQuantity','logs', 'Actions'];
    const dispatch = useDispatch<AppDispatch>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isUpdateModalOpen,setIsUpdateModalOpen] = useState(false);
    const [selectedProduction, setSelectedProduction] = useState<Production | null>(null);

    const renderProductionRow = (production?: Production) => {
        if (!production) return <div className={"p-2"}>Invalid Production Data</div>;
        console.log("SSSSSSSS",production.qualityChecks)
        return (
            <>
                <div className="p-2 truncate">{production.productionID}</div>

                {/* Quality Check Badge */}
                <div className="p-2 truncate">
                    {production.qualityChecks ? (
                        <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                        Passed
                    </span>
                    ) : (
                        <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                        Failed
                    </span>
                    )}
                </div>

                <div className="p-2 truncate">{formatDate(production.processDate)}</div>
                <div className="p-2 truncate">{production.processedQuantity}</div>
                <div className="p-2 truncate">{production.logs}</div>
            </>
        );

    };

    function handleAddProduction(newProduction: Production) {

        dispatch(saveProduction(newProduction));
        setIsModalOpen(false);
        toast.success('Production saved successfully');
    }


    function handleViewProduction(production:Production) {
        setSelectedProduction(production);
        setIsViewModalOpen(true);
    }

    function openUpdateModal(production:Production) {
        setSelectedProduction(production);
        setIsUpdateModalOpen(true);

    }

    function handleUpdateProduction(production:Production) {
        dispatch(updateProduction(production));
        setIsUpdateModalOpen(false);
        toast.success(
            <div className="flex items-center space-x-2 ">
                <i className="fa fa-refresh text-blue-500"></i>
                <span>Production updated successfully!</span>
            </div>,
            { icon: false }
        );

    }

    useEffect(() => {
        if (!productions || productions.length === 0) {
            dispatch(getAllProductions());
        }
    }, [ dispatch]);



    function handleDeleteProduction(production:Production){
        toast.custom((t) => (
            <DeleteModal
                visible={t.visible}
                onDelete={() => {
                    toast.dismiss(t.id);
                    dispatch(deleteProduction(production.productionID))

                    toast.success(
                        <div className="flex items-center space-x-2 ">
                            <i className="fa fa-trash text-red-600"></i>
                            <span>Production deleted successfully!</span>
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
            <div className="container mx-auto p-5">
                <h1 className="text-xl sm:text-2xl font-semibold mb-8 text-center sm:text-left">
                    Productions Management
                </h1>

                <div className="flex flex-wrap justify-end sm:justify-end space-x-0 sm:space-x-4 mb-5">
                    <button
                        id="btn-add"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base flex items-center space-x-2 group sm:w-auto"
                    >
                        <i className="fa-solid fa-plus font-bold"></i>
                        <span className="pl-2">Add</span>
                    </button>
                </div>

                <AddProduction isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onSave={handleAddProduction}/>
                {selectedProduction && (
                    <ViewProduction
                        isOpenModal={isViewModalOpen}
                        setIsOpenModal={setIsViewModalOpen}
                        production={selectedProduction}
                    />
                )}

                {selectedProduction && (
                    <UpdateProduction
                        isModalOpen={isUpdateModalOpen}
                        setIsModalOpen={setIsUpdateModalOpen}
                        production={selectedProduction}
                        onUpdate={handleUpdateProduction}
                    />
                )}

                {/*table*/}
                <TableData data={productions} headers={productionHeaders} renderRow={renderProductionRow}
                           handleView={handleViewProduction} handleUpdate={openUpdateModal} handleDelete={handleDeleteProduction}
                ></TableData>


            </div>


        </motion.div>
    );
}