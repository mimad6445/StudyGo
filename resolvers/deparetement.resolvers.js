const AccountModel = require('../models/Account.model');
const departement = require('../models/departement.model');
const University = require('../models/university.model');
const { AddDepartement } = require('../validation/departement.validation');
const mongoose = require("mongoose")


const getAllDepertement = async (_,{},context) => {
    try{
        if(!context.user){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const departements = await departement.find()
        return departements
    }catch(error){
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const CreateDepartement = async (_,{universityId,departementInput},context)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (!context.user) {
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const existingUniversity = await University.findById(universityId)
        if(!existingUniversity || context.user.id === universityId ){
            return {
                code: 404,
                message: "University Not Found",
            };
        }
        const parseResult = AddDepartement.safeParse(departementInput)
        if(!parseResult){
            return {
                code : 401,
                message : "Validation error: " + parseResult.error.message
            }
        }
        const { name, description, location, email,emailUniversity,phoneNumber, password} = parseResult.data
        const hashedpassword = await bcrypt.hash(password , 10)
        const newDepartement = new departement({
            name,description,location,universityId
        })
        const newAccount = await AccountModel({
            fullName : name,
            email : email,
            emailUniversity,
            phoneNumber,
            password : hashedpassword
        })
        existingUniversity.departements.push(newDepartement._id)
        await newDepartement.save({ session })
        await existingUniversity.save({ session })
        await newAccount.save({ session })
        await session.commitTransaction();
        await session.endSession();
        return newDepartement
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

module.exports = {
    getAllDepertement,
    CreateDepartement,
};