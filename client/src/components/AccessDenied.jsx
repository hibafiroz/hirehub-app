import { Link } from "react-router-dom";

function AccessDenied() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-teal-700/20 shadow-xl rounded-2xl p-8 max-w-md text-center">
                <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/background3.png')" }}></div>
                <div className="fixed inset-0 bg-white/60 -z-10"></div>

                <h1 className="text-2xl font-bold text-red-500 mb-4">
                    Access Denied 🚫
                </h1>

                <p className="text-gray-600 mb-6">
                    Please login to access this page.
                    If you don't have an account, you can create one.
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/"
                        className="bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/register"
                        className="border border-teal-600 text-teal-600 py-2 rounded-lg hover:bg-teal-50 transition"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AccessDenied;