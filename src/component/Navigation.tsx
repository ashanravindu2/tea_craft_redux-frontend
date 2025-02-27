
import teacraftlogo from '../assets/icons/logoIcon.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import {Link} from "react-router-dom";

function Navigation({ isOpen}) {
    const [activeItem, setActiveItem] = useState('home');
    const [isMenuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { id: 'home', label: 'Home', icon: 'fa-house', path: '/home' },
        { id: 'employee', label: 'Employee', icon: 'fa-user-group', path: '/employee' },
        { id: 'supplier', label: 'Supplier', icon: 'fa-handshake', path: '/supplier' },
        { id: 'rawMaterial', label: 'Raw Material', icon: 'fas fa-leaf', path: '/rawMaterial' },
        { id: 'production', label: 'Production', icon: 'fa-box', path: '/production' },
        { id: 'log', label: 'Monitoring Logs', icon: 'fas fa-store', path: '/log' },





        { id: 'logout', label: 'Logout', icon: 'fa-right-from-bracket', path: '/logout' },
    ];

    return (
        <div className="relative z-50 ">
            {/* Burger Button */}
            {!isMenuOpen && (
                <button
                    className="md:hidden fixed top-4 left-4 z-30 text-[#dfa55d] "
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    <i className={`fas ${isMenuOpen ? '' : 'fa-bars-staggered '} text-2xl`}></i>
                </button>
            )}
            {/* Sidebar */}
            <aside
                className={`bg-[#347486] shadow-md fixed z-40 h-full transition-transform transform ${
                    isMenuOpen || isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 w-80`}
            >
                <div className="p-4 flex justify-between items-center   rounded-b-2xl   ">
                    <div className="flex items-center space-x-5">
                    <img src={teacraftlogo} alt="logo" className="w-14 object-cover drop-shadow" />
                    <h1 className={"text-2xl text-white font-semibold "}>Ceylon Essence</h1>
                    </div>




                    <button
                        className="md:hidden  hover:text-green-700"
                        onClick={() => setMenuOpen(false)}
                    >
                        <i className="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <nav className="p-4 mt-6 space-y-4 ">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            id={`${item.id}-btn`}
                            onClick={() => {
                                setActiveItem(item.id);
                                setMenuOpen(false);
                            }}
                            className={`flex items-center  text-base font-medium rounded text-sm md:text-base lg:text-lg w-full py-5 pl-3 transition-all ${
                                activeItem === item.id
                                    ? 'bg-[#dfa55d] text-white'
                                    : 'text-white hover:bg-white hover:text-[#dfa55d]'
                            } ${item.id === 'logout' ? 'absolute bottom-8 w-72' : '' } `}
                        >
                            <i
                                className={`fas ${item.icon} mr-6 text-lg md:text-xl lg:text-2xl py-2   ${
                                    activeItem === item.id ? 'text-white' : ''
                                } `}
                            ></i>
                            <span>{item.label}</span>
                        </Link>
                    ))}



                </nav>
            </aside>
        </div>
    );
}

export default Navigation;
