const RejectionForm = ({
    candidateName,
    setCandidateName,
    companyName,
    setCompanyName,
    generateRejection,
    rejection,
    tone,
    setTone
}) => {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Mean Rejection Email Generator</h1>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Candidate Name</label>
                <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., John Doe"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., Acme Corp"
                />
            </div>
            <button
                onClick={generateRejection}
                className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
                Generate Rejection
            </button>
            {rejection && (
                <div className="mt-4 p-4 bg-white border rounded">
                    <p>{rejection}</p>
                </div>
            )}
            <p className="mt-4 text-xs text-gray-500 text-center">
                Disclaimer: This is a joke! Don’t actually send these.
            </p>
            <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Tone</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    className="w-full"
                    onChange={(e) => setTone(e.target.value)}
                    value={tone}
                />
                <p className="text-xs text-gray-500 text-center">Adjust the tone of the rejection email</p>
            </div>
        </div>
    );
};


export default RejectionForm;