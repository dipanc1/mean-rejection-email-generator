const Navbar = ({ isLoggedIn, handleLogin, handleRegister, user, handleLogout }) => {
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
                        // say hi user
                        <div className="space-x-4">
                            <span className="text-gray-700">Hi, {user ? user.firstName : 'User'}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
