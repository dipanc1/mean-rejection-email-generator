const express = require('express');
const router = express.Router();
const CompanyTable = require('../models/companies');

// Search companies based on text input
router.get('/', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        // Create a case-insensitive search regex
        const searchRegex = new RegExp(query, 'i');

        // Search in name, domain, and country fields
        const companies = await CompanyTable
            .find({ name: searchRegex })
            .limit(1);

        res.json(companies);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error searching companies' });
    }
});

module.exports = router;