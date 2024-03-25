const schema = require('../schema/schema');

const addData = async (req, res, next) => {
    const { firstName, middleName, lastName, fatherName, gender,
        mobileNumber, current_address, permanent_address, sslcSchool,
        sslcMarks, pucCollege, pucMarks, branch } = req.body;

    try {
        const exitsMobileNumber = await schema.registerdStudents.findOne({ mobileNumber: mobileNumber });
        if (exitsMobileNumber) {
            res.status(401).json({
                message: "Mobile Number Already exits please provide another one",
                isError: true
            })
        } else {
            await schema.registerdStudents.create({
                firstName, middleName, lastName, fatherName, gender,
                mobileNumber, current_address, permanent_address, sslcSchool,
                sslcMarks, pucCollege, pucMarks, branch
            })
            res.status(200).json({
                message: "Data added successfully",
                isError: false
            })
        }

    } catch (err) {
        next(err);
        res.status(500).json({
            error: true,
            message: `${err}`,
        });
    }

}

const getAllStudentsDetails = async (req, res, next) => {
    try {
        const getAllData = await schema.registerdStudents.find();
        if (getAllData) {
            res.status(200).json({
                message: 'success',
                data: getAllData
            })
        } else {
            res.status(404).json({
                message: 'Data not found',
                error: true
            })
        }
    } catch (err) {
        next(err);
        res.status(500).json({
            message: `${err}`,
            error: true
        })
    }

}

const editStudentsDetails = async (req, res, next) => {
    const getId = req.params.id;
    const { firstName, middleName, lastName, fatherName, gender,
        mobileNumber, current_address, permanent_address, sslcSchool,
        sslcMarks, pucCollege, pucMarks, branch } = req.body;
    try {
        const findId = await schema.registerdStudents.findOne({ _id: getId });
        if (!findId) {
            res.status(401).json({
                message: 'Student Id Not Found',
                isError: true
            })
        } else {
            await schema.registerdStudents.findOneAndUpdate(
                { _id: getId },
                {
                    firstName, middleName, lastName, fatherName, gender,
                    mobileNumber, current_address, permanent_address, sslcSchool,
                    sslcMarks, pucCollege, pucMarks, branch
                });
            res.status(200).json({
                error: false,
                message: "Student Details Updated Sucessfully",
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

module.exports = { addData, getAllStudentsDetails, editStudentsDetails }