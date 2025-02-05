import Sigm from "../assets/rb_77944.png";

export default function SignIn() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl">
                <div className="w-1/2 p-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input type="email" className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-200" placeholder="example@mail.com" />
                        </div>
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input type="password" className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-200" placeholder="********" />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">Sign Up</button>
                    </form>
                    <p className="mt-4 text-center text-gray-600">Already have an account? <a href="../pages/SignUp.tsx" className="text-blue-600 hover:underline">Sign In</a></p>
                </div>
                <div className="w-1/2">
                    <img src={Sigm} alt="Sign Up Illustration" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}
