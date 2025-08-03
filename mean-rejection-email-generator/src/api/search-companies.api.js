import backend_url from "../config";

const searchCompanies = async (query, token) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };
        const response = await fetch(`${backend_url}/api/search-companies?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: headers,
        });
        
        if (response.status === 401) {
            return { error: 'Unauthorized' };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching companies:', error);
        return { error: 'Network error' };
    }
}

export default searchCompanies;