import { useState } from "react";

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "MANAGER",
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
        console.log("User Data:", formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-green-200">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create your account</h2>
                <p className="text-gray-500 mb-6">"Sign up to start managing your farm today!"</p>

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
                            I agree to all <a href="#" className="text-green-600 font-medium">Terms, Privacy Policy</a> and Fees.
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
                    Already have an account? <a href="/login" className="text-green-600 font-medium">Login</a> Now.
                </p>
            </div>
        </div>
    );
};

export default SignIn;
