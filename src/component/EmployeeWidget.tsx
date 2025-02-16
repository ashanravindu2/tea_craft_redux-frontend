import scientist from '../assets/img/Scientist.png';
import administrative from '../assets/img/Admin.png';
import manager from '../assets/img/Manager.png';
import {useSelector} from "react-redux";
import {Employee} from "../model/Employee.ts";
import {RootState} from "../store/store.tsx";


function StaffWidget() {
    const employeeMember: Employee[] = useSelector((state: RootState) => state.employee);
    // Define a mapping of roles to their respective images
    const roles = [
        { name: 'Tea Collector', image: manager, count: 0 },
        { name: 'Machine Operators', image: administrative, count: 0 },
        { name: 'Tea Blenders', image: scientist, count: 0 },
        { name: 'Leaf Collectors', image: scientist, count: 0 },
        { name: 'Packaging Workers', image: scientist, count: 0 },
        { name: 'Electrical & Mechanical Technicians', image: scientist, count: 0 },
    ];

    roles.forEach((role) => {
        role.count = employeeMember.filter((member) =>
            member.designation.toLowerCase() === role.name.toLowerCase()).length;
    });

    return (
        <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-4 text-center">Employee Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-6 gap-6">
                {roles.map((role) => (
                    <div
                        key={role.name}
                        className="bg-green-100 text-center py-6 rounded-lg flex flex-col items-center"
                    >
                        <img src={role.image} alt={`${role.name} Icon`} className="mb-4" />
                        <p className="text-5xl font-bold mb-4">{role.count}</p>
                        <p className="text-sm">{role.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StaffWidget;
