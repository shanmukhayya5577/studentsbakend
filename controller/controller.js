const schema = require('../schema/schema');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const jsonToken = require('jsonwebtoken');

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sanmukswamy238@gmail.com",
      pass: "aaui jtay uojq vchn",
    },
  });


const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const userExits = await schema.registerSchema.findOne({ email: email });
        if (userExits) {
            res.status(401).json({
                message: 'Already registerd',
                isError: true,
            })
        } else {
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(password, salt);
            await schema.registerSchema.create({
                name,
                email,
                password: hash
            })

            let mailOptions = {
                from: "sanmukswamy238@gmail.com",
                to: email,
                subject: "Registration Successful",
                text: "Thank you for registering and Visiting this website!",
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log("mail sent error", error);
                } else {
                  console.log("mail sent successfull");
                }
              });

            res.status(200).json({
                message: 'Registerd successfylly',
                isError: false,
            })
        }
    } catch (err) {
        next(err);
        res.status(200).json({
            message: `${err}`,
            isError: true,
        })
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await schema.registerSchema.findOne({ email: email });
    try {
        if (user) {
            const passwordMatch = await bcryptjs.compare(password, user.password);
            if (passwordMatch) {
                const jwtToken = jsonToken.sign({email},process.env.secret_key,{ expiresIn: '1h' })
                res.status(200).json({
                    message: 'Login successfylly',
                    token:jwtToken,
                    isError: false,
                })
            } else {
                res.status(200).json({
                    message: 'Password wrong',
                    isError: false,
                })
            }
        } else {
            res.status(401).json({
                message: 'User Not Found',
                isError: true
            })
        }
    } catch (err) {
        next(err);
        res.status(500).json({
            message: `${err}`,
            isError: true
        })
    }

}

const getAllData = async(req,res,next)=>{
    try{
        const getAllData = await schema.registerSchema.find();
        if(getAllData){
            res.status(200).json({
                message:'success',
                data:getAllData
            })
        } else {
            res.status(404).json({
                message:'Data not found',
                error:true
            })
        }
    }catch(err){
        next(err);
        res.status(500).json({
            message:`${err}`,
            error:true
        })
    }
    
   
}

const update = async (req, res, next) => {
    const getId = req.params.id;
    const { name, password } = req.body;
    try {
        const findId = await schema.registerSchema.findOne({ _id: getId });
        if (!findId) {
            res.status(401).json({
                message: 'Id not found',
                isError: true
            })
        } else {
            const hash = await bcryptjs.hash(password, findId.password);
            await schema.registerSchema.findOneAndUpdate(
                { _id: getId }, {
                name,
                password: hash
            })
            res.status(200).json({
                error: false,
                message: "Student updated sucessfully",
            });
        }
    } catch (err) {
        next(err);
        res.status(200).json({
            error: true,
            message: `${err}`
        });
    }
}

const deleteData = async (req,res,next) =>{
    const getId = req.params.id;
    try{
        const findId = await schema.registerSchema.findOne({_id:getId});
        if(findId){
            await schema.registerSchema.findByIdAndDelete({_id:getId},{});
            res.status(200).json({
                error: false,
                message: 'Deleted Successfully',
            });
        }else{
            res.status(400).json({
                error: true,
                message: 'Id not found',
            });
        }
    }catch(err){
        res.status(500).json({
            error: true,
            message: `${err}`,
        });
    }
   
}


module.exports = { register, login, update,getAllData,deleteData }