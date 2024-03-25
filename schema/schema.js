const mongoose = require('mongoose');
const schema = mongoose.Schema;

const register = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});

const studentsAllDetails = new schema({
    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String,
    },
    lastName:{
        type:String
    },
    fatherName:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    current_address:{
        type:String,
    },
    permanent_address:{
        type:String
    },
    sslcSchool:{
        type:String,
        required:true
    },
    sslcMarks:{
        type:Number,
        required:true
    },
    pucCollege:{
        type:String,
        required:true
    },
    pucMarks:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true
    }
})

const registerSchema = mongoose.model('register',register);
const registerdStudents = mongoose.model('allDetails',studentsAllDetails)
module.exports = {registerSchema,registerdStudents};