const searchCompanies = async (query) => {
    try {
        const response = await fetch(`http://localhost:3001/api/search-companies?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            console.error('Network response was not ok:', response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
}

export default searchCompanies;