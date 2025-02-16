import DashboardHeader from "../component/DashboardHeader.tsx";
import MaterialProcessChart from "../component/MaterialProcessChart.tsx";
import EmployeeWidget from "../component/EmployeeWidget.tsx";
import RealTimeCalendar from "../component/CalenderTime.tsx";


const Home = () => {


    return (
        <div className="container mx-auto p-5 bg-gray-50 ">
            <DashboardHeader/>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  ">
                <RealTimeCalendar/>
                <MaterialProcessChart isModel={'pie'}/>
                <MaterialProcessChart isModel={'column'}/>
            </div>
            <div className="grid  grid-cols-1 lg:grid-cols-1 gap-6 mt-5 ">
                <EmployeeWidget/>
            </div>
        </div>
    );
};

export default Home;
