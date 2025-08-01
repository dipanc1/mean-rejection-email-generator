const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    domain: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
}, {
    timestamps: true,
    collection: 'companies'
});

const CompanyTable = mongoose.model("Company", CompanySchema);

module.exports = CompanyTable;