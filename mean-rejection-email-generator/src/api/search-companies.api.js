import backend_url from "../config";

const searchCompanies = async (query) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };
        const response = await fetch(`${backend_url}/api/search-companies?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: headers,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching companies:', error);
        return error;
    }
}

export default searchCompanies;