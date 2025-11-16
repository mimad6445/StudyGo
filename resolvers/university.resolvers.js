const AccountModel = require("../models/Account.model.js")
const University = require("../models/university.model.js")
const { addUniversity } = require("../validation/university.validation")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

const AddUniversity = async (_,{universityInput},context)=>{
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        if(!context.user || context.user.role !== 'GOAT'){
            return {
                message: "Error creating pub: Admin is not authorized"
            };
        }
        const parsedata = addUniversity.safeParse(universityInput)
        if(!parsedata.success){
            return {
                Errorcode : 401,
                message : "Validation error: " + parsedata.error.message
            }
        }
        console.log("-----------------------------------------2",parsedata);
        const { name , code , address , phoneNumber , emailUniversity , email , password , establishedYear} = parsedata.data
        const hashedpassword = await bcrypt.hash(password , 10)
        const newUniversity = new University({
            name,code,address,emailUniversity,establishedYear
        })
        
        console.log("-----------------------------------------3");
        const newAccount = new AccountModel({
            fullName : name,
            email : email,
            emailUniversity,
            phoneNumber,
            password : hashedpassword,
            role : "SuperAdmin"
        })
        newUniversity.userId = newAccount._id
        await newUniversity.save({ session })
        await newAccount.save({ session })
        await session.commitTransaction();
        await session.endSession();

        return newUniversity
    } catch (error) {
        console.log("error ----------",error);
        
        return {
            Errorcode : 500,
            message : "Internal server Error "+error.message
        }
    }
}

const findAllUniversity = async (_,__,{context})=>{
    try {
        if(!context.user){
            return {
                Errorcode : 401,
                message : "Unauthorized User GOAT"
            }
        }
        const universities = await University.find()
            .populate("departements")   // Populate departements
            .populate("userId")         // Populate creator account
            .populate({
                path: "departements",
                populate: [
                    { path: "rooms" },
                    { path: "sections" },
                    { path: "modules" },
                    { path: "userId" },
                    { 
                        path: "sections",
                        populate: [
                            { path: "users" },
                            { path: "Groups" },
                            { path: "Schedule" },
                            { path: "files" },
                            { 
                                path: "professeur.data", 
                            },
                            {
                                path: "professeur.module"
                            }
                        ]
                    }
                ]
            });
        return universities
    } catch (error) {
        return {
            Errorcode : 500,
            message : "Internal server Error"
        }
    }
}

const UpdateUniversity = async (_, { universityInput }, context) => {
    try {
        const { id, name, location, email, phone } = universityInput;
        if (!context.user) {
            return {
                Errorcode: 401,
                message: "Unauthorized",
            };
        }
        const updatedUniversity = await University.findByIdAndUpdate(
            id,
            { name, location, email, phone },
            { new: true }
        );
        if (!updatedUniversity) {
            return {
                Errorcode: 404,
                message: "University not found",
            };
        }
        return updatedUniversity
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
};

const DeleteUniversity = async (_, { id }, context) => {
    try {
        if (!context.user) {
            return {
                Errorcode: 401,
                message: "Unauthorized",
            };
        }
        const deletedUniversity = await University.findByIdAndDelete(id);
        if (!deletedUniversity) {
            return {
                Errorcode: 404,
                message: "University not found",
            };
        }
        return {
            Errorcode: 200,
            message: "University deleted successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
};


module.exports = {
    AddUniversity,
    findAllUniversity,
    UpdateUniversity,
    DeleteUniversity
}