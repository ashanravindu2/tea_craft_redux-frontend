import profileIcon from "../assets/icons/profile.png"

export function Header({ userFullName, userRole }) {

    return (
        <header
            className="bg-[#347486]  p-9 flex justify-between items-center fixed top-0 left-0 sm:left-80 right-0 z-10 h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4 pl-4">
                <h1 className="text-xl font-semibold text-[#dfa55d]">

                </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4 pr-4 group cursor-pointer">
                <img
                    src={profileIcon}
                    alt="Profile"
                    className="w-10 h-10 rounded-full duration-150 group-hover:border-2 group-hover:border-[#dfa55d]"
                />
                <div className="flex flex-col mr-4 group-hover:text-[#dfa55d]">
                    <span
                        id="userFullName"
                        className="font-semibold text-sm md:text-base duration-300 group-hover:text-[#dfa55d]"
                    >
                        {userFullName}
                    </span>
                    <p
                        id="userRole"
                        className="text-xs text-white md:text-sm duration-300 group-hover:text-white"
                    >
                        {userRole}
                    </p>
                </div>
            </div>
        </header>
    );
}