import backend_url from "../config";

const searchCompanies = async (query) => {
    try {
        const response = await fetch(`${backend_url}/api/search-companies?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
}

export default searchCompanies;