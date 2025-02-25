import { Logs } from "../../model/Logs.ts";
import {Production} from "../../model/Production.ts";
import {useSelector} from "react-redux";
import {Supplier} from "../../model/Supplier.ts";
import {Employee} from "../../model/Employee.ts";



interface LogCardContainerProps {
    onCardClick: (logs: Logs) => void;
    logs: Logs[];
}

function LogCardContainer({ logs,onCardClick }: Readonly<LogCardContainerProps>) {

    const productions : Production[] = useSelector((state: {production:Production[]} ) => state.production);
    const supplierMember : Supplier[] = useSelector((state: { supplier:Supplier[] } ) => state.supplier);
    const employeeMember : Employee[] = useSelector((state:  {employee:Employee[]} ) => state.employee);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 " id="logContainer">
            {logs.map((log, index) => (


                <div
                    key={index}
                    className=" border border-gray-200 rounded-xl h-96 shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
                    onClick={() => onCardClick(log)}
                >

                    {log.observedImage && (
                        <img
                            src={log.observedImage}
                            alt="Observation"
                            className="w-full h-40 object-cover rounded-t-xl"
                        />
                    )}
                    <div
                        className={`p-4 px-6 bg-[#347486] rounded-b-2xl   flex flex-col flex-grow ${!log.observedImage ? "rounded-t-xl" : ""}`}
                    >
                        <div className="max-h-32 overflow-y-auto">
                            <p className="text-sm text-gray-500 mt-2">
                                <span className="text-sm text-gray-900">Production: </span>
                                <span className="font-medium text-sm text-[#ffffff]">
        {productions.find((production) => production.productionID === log.productionID)?.productionID || "Unknown production"}
      </span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                <span className="text-sm text-gray-900">Supplier: </span>
                                <span className="font-medium text-sm text-[#ffffff]">
        {supplierMember.find((supplier) => supplier.supplierID === log.supplierID)?.firstName || "Unknown supplier"}
      </span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                <span className="text-sm text-gray-900">Employee: </span>
                                <span className="font-medium text-sm text-[#ffffff]">
        {employeeMember.find((employee) => employee.employeeID === log.employeeID)?.firstName || "Unknown employee"}
      </span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                <span className="text-sm text-gray-900">Observation: </span>
                                <span className="font-medium text-sm text-[#ffffff]">
        {log.observation || "No observation provided"}
      </span>
                            </p>
                        </div>

                        <p className="text-xs text-[#ffffff] font-bold mt-auto">
                            {log.logDate ? new Date(log.logDate).toLocaleDateString() : "Unknown date"}
                        </p>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default LogCardContainer;
