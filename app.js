const express = require('express');
const cors = require('cors');
const app = express();

//importing app middleware
app.use(cors('*'));                   
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Enabling Cors Middleware

//connected BD
require('dotenv').config();
require('./DB');

//imporing routing middleware
const router = require('./routes/routes');
app.use('/',router);

app.get('/',(req,res,next)=>{
    res.status(200).json({
        messge:'Empty path so nothing',
        isErroe:false
    })
});

module.exports = app;