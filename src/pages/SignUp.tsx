import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../store/store.tsx";
import { UserAdmin } from "../model/UserAdmin.ts";
import { registerUser } from "../slice/user-slice.ts";
import { useNavigate } from "react-router";
import image from "../assets/img/signup Img.png";
import logo from "../assets/icons/logoIcon.png"
import {motion} from "framer-motion";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    // ✅ Get registration success state from Redux
    const registrationSuccess = useSelector(
        (state: RootState) => state.userReducer.isAuthenticated
    );

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
        agreed: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agreed) {
            alert("Please agree to the terms before signing up.");
            return;
        }
        const user: UserAdmin = { email: formData.email, password: formData.password, role: formData.role };
        dispatch(registerUser(user));


    };
    useEffect(() => {
        if (registrationSuccess) {
            navigate("/signIn");
        }
    }, [registrationSuccess, navigate]);

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
                duration: 1,  // Duration for the fade effect
                ease: [0.25, 0.8, 0.5, 1],  // Smooth easing curve
            }}
        >
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-700 to-green-300">
                <div className="bg-white p-8 rounded-xl shadow-lg flex max-w-6xl w-full ">


                    {/* Image positioned at the top-right */}
                    <div className="absolute top-0 right-0 p-8">
                        <img
                            src={logo} // Update the path with your actual image location
                            alt="Sign Up Illustration"
                            className="w-16 h-16 object-contain"
                        />
                    </div>

                    {/* Left Section - Form */}
                    <div className="w-1/2 p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create your account</h2>
                        <p className="text-gray-500 mb-6">"Sign up to start managing your factory today!"</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="MANAGER">Manager</option>
                                    <option value="EMPLOYEE">Employee</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="agreed"
                                    checked={formData.agreed}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                                />
                                <label className="text-gray-600 text-sm">
                                    I agree to all <a href="#" className="text-green-600 font-medium">Terms, Privacy
                                    Policy</a> and Fees.
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
                            >
                                Sign Up
                            </button>
                        </form>

                        <p className="text-gray-600 mt-4 text-center">
                            Already have an account? <a href="/login" className="text-green-600 font-medium">Sign
                            in</a> Now.
                        </p>
                    </div>

                    {/* Right Section - Image */}
                    <div className="w-1/2 object-cover flex  items-center rounded-r-xl bg-green-300">
                        <img
                            src={image}// Update the path with your actual image location
                            alt="Farm Management"
                            className="  object-cover rounded-r-xl "
                        />
                    </div>

                </div>
            </div>
            );
        </motion.div>
    );
}

            export default SignUp;
