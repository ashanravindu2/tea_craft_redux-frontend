import {Dialog, DialogContent, DialogTitle} from "@radix-ui/react-dialog";
import { useState } from "react";


export default function LogoutPopup() {
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        // Perform logout logic here
        console.log("User logged out");
        setOpen(false);
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <button onClick={() => setOpen(true)} className="bg-red-500 hover:bg-red-600">
                Logout
            </button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md p-6">
                    <header>
                        <DialogTitle>Confirm Logout</DialogTitle>
                    </header>
                    <p className="text-gray-600">Are you sure you want to log out?</p>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button onClick={() => setOpen(false)} className="bg-gray-300 text-black">
                            Cancel
                        </button>
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
