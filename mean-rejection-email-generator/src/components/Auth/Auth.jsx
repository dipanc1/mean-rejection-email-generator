const Auth = ({ isOpen, handleClose, mode, modalRef, message, onSubmit, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white p-8 rounded-lg w-96 relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    disabled={isLoading}
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-6">
                    {mode === 'login' ? 'Login' : 'Register'}
                </h2>
                <form className="space-y-4" onSubmit={onSubmit}>
                    {mode === 'register' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="Enter your first name"
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="Enter your last name"
                                    disabled={isLoading}
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                {mode === 'login' ? 'Logging in...' : 'Registering...'}
                            </>
                        ) : (
                            mode === 'login' ? 'Login' : 'Register'
                        )}
                    </button>
                </form>

                {message.text && (
                    <div className={`mt-4 p-2 rounded ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Auth;