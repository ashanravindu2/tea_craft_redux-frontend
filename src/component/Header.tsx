import profileIcon from "../assets/icons/profile.png"

export function Header({ userFullName, userRole }) {

    return (
        <header
            className="bg-white p-4 flex justify-between items-center fixed top-0 left-0 sm:left-80 right-0 z-10 h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4 pl-4">
                <h1 className="text-xl font-semibold text-green-500">

                </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4 pr-4 group cursor-pointer">
                <img
                    src={profileIcon}
                    alt="Profile"
                    className="w-10 h-10 rounded-full duration-150 group-hover:border-2 group-hover:border-green-500"
                />
                <div className="flex flex-col mr-4 group-hover:text-green-500">
                    <span
                        id="userFullName"
                        className="font-semibold text-sm md:text-base duration-300 group-hover:text-green-500"
                    >
                        {userFullName}
                    </span>
                    <p
                        id="userRole"
                        className="text-xs text-gray-600 md:text-sm duration-300 group-hover:text-gray-500"
                    >
                        {userRole}
                    </p>
                </div>
            </div>
        </header>
    );
}