const ErrorPopup = ({ message, onClose, modalRef }) => {
    if (!message) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white p-6 rounded-lg w-80 relative">
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h3 className="text-lg font-semibold text-red-600 mb-4">Error</h3>
                <p className="text-gray-700">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ErrorPopup;
