const express = require('express');
const cors = require('cors');
const app = express();


//importing app middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Enabling Cors Middleware
app.use(cors());

//connected BD
require('dotenv').config();
require('./DB');


//imporing routing middleware
const router = require('./routes/routes');
app.use('/',router);

app.get('/',(req,res,next)=>{
    res.send('Empty path, so page not found')
});

module.exports = app;