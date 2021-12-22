const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    number_of_empl: {
        type: Number
    }
})

const Company = new mongoose.model('Company',companySchema);
module.exports = Company;