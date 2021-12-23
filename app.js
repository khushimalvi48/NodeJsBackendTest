
const express = require("express");
const app = express();
require("./src/db/connect");

const Employee = require("./src/models/employee");
const Company = require("./src/models/company");
const port = process.env.PORT || 3000


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//get requests
app.get('/', (req, res) => {
    res.send("Hello from another side");
})

app.get('/registerComp', async(req, res) => {
    try {
        //sorting companies in decending order of number of employees
        const data = await Company.find().sort({number_of_empl:-1});
        res.send(data);
    } catch (error) {
        console.log(error);
    }  
})

app.get('/registerEmp', async(req, res) => {
    try {
        //geting list of employees of a particular company
        const data = await Employee.find({company_name:req.body.name});
        res.send(data);
    } catch (error) {
        console.log(error);
    }  
})


//Post requests
app.post("/registerEmp", async (req, res) => {
    try {
        const registerEmployee = new Employee({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            phone: req.body.phone,
            company_name: req.body.company_name
        })
        const cname = await Company.findOne({ name: registerEmployee.companyName });
        if(cname){
            const name = cname[0].name;
            const res = await Company.updateOne({ "name": { $eq: name } },
            { $inc: { number_of_empl: 1 } });
        }
        const data = await registerEmployee.save();
        console.log(data);
        res.send(data);
    } catch (e) {
        res.status(400).send(e);
        res.send("enter valid company");
    }
});

app.post("/registerComp", async (req, res) => {
    try {
        const registerCompany = new Company({
            name: req.body.name,
        })

        const data = await registerCompany.save();
        res.send(data);
        console.log(data);
    } catch (e) {
        res.status(400).send(e);
    }
});



app.listen(port, () => {
    console.log(`server started at port ${port}`)
})