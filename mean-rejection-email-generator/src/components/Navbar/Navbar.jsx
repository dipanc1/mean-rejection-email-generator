const Navbar = ({ isLoggedIn, handleLogin, handleRegister }) => {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <span className="font-semibold text-xl">Mean Rejector</span>
                    </div>
                    {!isLoggedIn ? (
                        <div className="space-x-4">
                            <button
                                onClick={handleRegister}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                            >
                                Register
                            </button>
                            <button
                                onClick={handleLogin}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Login
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
