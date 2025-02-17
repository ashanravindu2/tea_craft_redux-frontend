
import {Logs} from "../model/Logs.ts";

interface LogCardContainerProps {
    logs: Logs[];
    onCardClick: (logs: Logs) => void;
}

function LogCardContainer({ logs, onCardClick } : Readonly<LogCardContainerProps>) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 " id="logContainer">
            {logs.map((log, index) => (
                <div
                    key={index}
                    className="bg-white  border border-gray-200 rounded-xl h-96 shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
                    onClick={() => onCardClick(log)}
                >

                    {log.observedImage && (

                        <img
                            src={URL.createObjectURL(new Blob([log.observedImage]))}
                            alt="Observation"
                            className="w-full h-40 object-cover rounded-t-xl"
                        />
                    )}
                    <div className={`p-4 px-6 bg-green-200 flex flex-col flex-grow ${!log.observedImage ? "rounded-t-xl" : ""}`}>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-6">
              <span className="font-medium text-sm text-gray-700">
                {log.observation || "No observation provided"}
              </span>
                        </p>
                        <p className="text-xs text-black font-bold mt-auto">
                            {log.logDate ? new Date(log.logDate).toLocaleDateString() : "Unknown date"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LogCardContainer;
