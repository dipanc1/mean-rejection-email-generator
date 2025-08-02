const Navbar = ({ isLoggedIn, handleLogin }) => {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        {/* <img 
                            src="/logo.png" 
                            alt="Logo" 
                            className="h-8 w-8 mr-2"
                        /> */}
                        <span className="font-semibold text-xl">Mean Rejector</span>
                    </div>
                    <button
                        onClick={handleLogin}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
