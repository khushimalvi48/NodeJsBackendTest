const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    number_of_empl: {
        type: Number,
        default:0
    }
})

const Company = new mongoose.model('Company',companySchema);
module.exports = Company;