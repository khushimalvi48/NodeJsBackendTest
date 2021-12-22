const { builtinModules } = require('module');
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    company_name: {
        type: String,
        required: true
    }
  
});

const Employee = new mongoose.model("Employee", employeeSchema);
module.exports = Employee;