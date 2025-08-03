const Navbar = ({ isLoggedIn, handleLogin, handleRegister, user, handleLogout }) => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                        <span className="font-semibold text-lg">Mean Rejector</span>
                    </div>
                    {!isLoggedIn ? (
                        <div className="space-x-3">
                            <button
                                onClick={handleRegister}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm"
                            >
                                Register
                            </button>
                            <button
                                onClick={handleLogin}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
                            >
                                Login
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-3 flex items-center">
                            <span className="text-gray-700 text-sm">Hi, {user ? user.firstName : 'User'}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm"
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
