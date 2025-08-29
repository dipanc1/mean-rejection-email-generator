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
    demoLimit,
    copied,
    copyToClipboard,
    isGenerating,
    isSearching
}) => {
    const isLoggedIn = localStorage.getItem('token');

    const handleGenerateRejection = () => {
        setCompanies([]);
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
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="e.g., John Doe"
                        disabled={isGenerating}
                    />
                </div>

                <div className="mb-4 relative">
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => searchCompaniesApi(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="e.g., Acme Corp"
                        disabled={isGenerating}
                    />

                    {isSearching && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 p-3">
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                                <span className="ml-2 text-sm text-gray-600">Searching...</span>
                            </div>
                        </div>
                    )}

                    {companies.length > 0 && !isSearching && (
                        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 max-h-36 overflow-y-auto">
                            {companies.map((company, index) => (
                                <li
                                    key={index}
                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 text-sm"
                                    onClick={() => {
                                        setCompanyName(company.company_name)
                                        setCompanies([]);
                                    }}
                                >
                                    {company.company_name}
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
                        className="w-full mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onChange={(e) => setTone(e.target.value)}
                        value={tone}
                        disabled={isGenerating}
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
                    disabled={isGenerating}
                    className={`w-full mb-4 ${isGenerating
                            ? 'bg-gray-400 cursor-not-allowed'
                            : isLoggedIn
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white p-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center`}
                >
                    {isGenerating ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating...
                        </>
                    ) : (
                        isLoggedIn
                            ? 'Generate Rejection'
                            : `Generate Rejection (${demoLimit - demoCount} demos left)`
                    )}
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
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Generated Email</h2>
                    {rejection && (
                        <button
                            onClick={copyToClipboard}
                            disabled={isGenerating}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isGenerating
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : copied
                                        ? 'bg-green-100 text-green-700 border border-green-300'
                                        : 'bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200'
                                }`}
                        >
                            {copied ? (
                                <>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
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