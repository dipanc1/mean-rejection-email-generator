const RejectionForm = ({
    candidateName,
    setCandidateName,
    companyName,
    setCompanyName,
    generateRejection,
    rejection,
    tone,
    setTone,
    searchCompaniesApi,
    companies,
    setCompanies,
    demoCount,
    demoLimit
}) => {
    const isLoggedIn = localStorage.getItem('token');

    const handleGenerateRejection = () => {
        setCompanies([]); // Clear companies dropdown
        generateRejection();
    };

    return (
        <>
            {/* Form Section */}
            <div className="bg-gray-100 rounded-lg shadow-lg p-5">
                <h1 className="text-xl font-bold mb-5 text-center">Mean Rejection Email Generator</h1>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Candidate Name</label>
                    <input
                        type="text"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="e.g., John Doe"
                    />
                </div>

                <div className="mb-4 relative">
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => searchCompaniesApi(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="e.g., Acme Corp"
                    />

                    {companies.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 max-h-36 overflow-y-auto">
                            {companies.map((company, index) => (
                                <li 
                                    key={index} 
                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 text-sm" 
                                    onClick={() => {
                                        setCompanyName(company.name)
                                        setCompanies([]);
                                    }}
                                >
                                    {company.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium mb-2">Tone Level</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        className="w-full mb-2"
                        onChange={(e) => setTone(e.target.value)}
                        value={tone}
                    />
                    <p className="text-xs text-gray-500 text-center mb-2">Adjust the tone of the rejection email</p>
                    <div className="text-center">
                        {tone <= 3 && <p className="text-green-500 text-lg font-semibold">Mean</p>}
                        {tone > 3 && tone <= 7 && <p className="text-yellow-500 text-lg font-semibold">Meaner</p>}
                        {tone > 7 && <p className="text-red-500 text-lg font-semibold">Meanest</p>}
                    </div>
                </div>

                <button
                    onClick={handleGenerateRejection}
                    className={`w-full mb-4 ${isLoggedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white p-3 rounded-md font-medium transition-colors duration-200`}
                >
                    {isLoggedIn ? 'Generate Rejection' : `Generate Rejection (${demoLimit - demoCount} demos left)`}
                </button>

                {!isLoggedIn && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
                        <p className="text-yellow-700 text-center">
                            You are in demo mode. {demoLimit - demoCount} attempts remaining.
                            <br />
                            Login to get unlimited rejections!
                        </p>
                    </div>
                )}

                <p className="text-xs text-gray-500 text-center">
                    Disclaimer: This is a joke! Don't actually send these.
                </p>
            </div>

            {/* Email Display Section */}
            <div className="bg-white rounded-lg shadow-lg p-5 min-h-[380px]">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Generated Email</h2>
                {rejection ? (
                    <div className="bg-gray-50 border-l-4 border-red-500 p-4 rounded">
                        <div className="mb-3">
                            <span className="text-sm font-medium text-gray-600">Subject: </span>
                            <span className="text-sm text-gray-800">Application Status Update</span>
                        </div>
                        <hr className="my-3" />
                        <div className="whitespace-pre-line text-gray-800 text-sm leading-relaxed">
                            {rejection}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-56 text-gray-400">
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <p className="text-lg">Your rejection email will appear here</p>
                            <p className="text-sm mt-2">Fill out the form and click generate!</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RejectionForm;