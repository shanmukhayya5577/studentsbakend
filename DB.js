const mongoose = require('mongoose');

mongoose.connect(process.env.dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((success)=>{
    console.log('DB Connected');
}).catch((err)=>{
    console.log(err);
    console.log('DB failed');
})