const express = require('express');
const router = express.Router();
const CompanyTable = require('../models/Companies');

// Search companies based on text input
router.get('/', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const searchRegex = new RegExp(query, 'i');

        const companies = await CompanyTable
            .find({ company_name: searchRegex })
            .limit(5);

        const uniqueCompanies = [];
        const seencompany_names = new Set();
        for (const company of companies) {
            if (!seencompany_names.has(company.company_name)) {
                seencompany_names.add(company.company_name);
                uniqueCompanies.push(company);
            }
        }

        if (uniqueCompanies.length === 0) {
            return res.status(404).json({ message: 'No companies found' });
        }

        uniqueCompanies.sort((a, b) => a.company_name.localeCompare(b.company_name));

        uniqueCompanies.forEach(company => {
            company.company_name = company.company_name
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        });

        res.status(200).json(uniqueCompanies);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error searching companies' });
    }
});

module.exports = router;