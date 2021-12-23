const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
  useUnifiedTopology: true
   })
    .then(()=>{
        console.log("connection to db successful");
    }).catch((e)=>{
        console.log(e);
});