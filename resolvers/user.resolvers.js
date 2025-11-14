const user = require("../models/Account.model.js");
const { addStudent } = require("../validation/user.validation.js")
const departement = require("../models/departement.model.js")
const section = require("../models/Section.model.js")
const student = require("../models/Student.model.js")
const generateToken = require("../utils/generatetoken.js")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

const createAdmin = async(_,{admin})=>{
    try {
        const existingUser = await user.findOne({ email : admin.email })
        if(existingUser){
            return {
                code : 400,
                message : "Admin Already exisit"
            }
        }
        const hasedPasword = await bcrypt.hash(admin.password,10)
        const newAdmin = await user({
            fullName : admin.fullName,
            email : admin.email,
            password: hasedPasword,
            role: "GOAT"
        })
        await newAdmin.save();
        const token = await generateToken({ email: newAdmin.email, id: newAdmin._id , role : 'GOAT'});
        return {
            token,
            user: newAdmin
        };
    } catch (error) {
        return {
            code : 500,
            message : "Internal server Error : " + error
        }
    }
} // Valid

const loginUser = async (_, { email, password }) => {
    try {
        const isEmail = /\S+@\S+\.\S+/.test(email);
        if (!isEmail) {
            return {
                code : 400,
                message: "Invalid email format."
            };
        }
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return {
                code : 404,
                message: "User not found."
            };
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return {
                code : 404,
                message: "Invalid password."
            };
        }
        if(!existingUser.isActive){
            return {
                code : 404,
                message : "User in Active"
            }
        }
        const token = await generateToken({ email: existingUser.email, id: existingUser._id, role: existingUser.role });
        return {
            token,
            user: existingUser
        };
    } catch (error) {
        return {
            message: "Error logging in user: " + error.message
        };
    }
} // Valid


const getCurrentUser = ()=>{
    try{

    }catch(error){
        return {
            code : 500,
            message : "Internal server Error : " + error
        }
    }
}

const getAllUsers = async()=>{
    try {
        const users = await user.find()
        return users
    } catch (error) {
        return {
            code : 500,
            message : "Internal server Error : " + error
        }
    }
}

const CreateStudent = async(_,{userInput,sectionId, departementId,yearAcadimic},context)=>{
    try {
        if (!context.user) {
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const parseResult = addStudent.safeParse(userInput);
        if(!parseResult){
            return {
                code : 401,
                message : "Validation error: " + parseResult.error.message
            }
        }
        const existingSection = await section.findById(sectionId)
        if(!existingSection){
            return {
                code : 404,
                message : "Section Not Found"
            }
        }
        const existingDepartement = await departement.findOne({
            _id: departementId,
            sections: { $in: [sectionId] }
        });
        if(!existingDepartement){
            return {
                code : 404,
                message : "departement Not Found"
            }
        }
        
        const { fullName ,StudentCard ,dateOfBirth ,gender ,address ,bloodGroup ,phoneNumber ,email ,emailUniversity } = parseResult.data
        const findingUser = await user.findOne({emailUniversity})
        if(findingUser){
            return {
                code : 404,
                message : "Already Exisit"
            }
        }
        const newUser = await user({
            fullName,StudentCard,dateOfBirth,gender,address,bloodGroup,phoneNumber,email,emailUniversity
        })
        await newUser.save()
        return newUser;
    } catch (error) {
        return {
            code : 500,
            message : "Internal server Error : " + error
        }
    }
}


const getUserId = async (_,{userId})=>{
    try{
        const existingUser = await user.findById(userId)
        if(!existingUser){
            return {
                code : 404,
                message : "user Not Found"
            }
        }
        return existingUser
    }catch(error){
        return {
            code : 500,
            message : "Internal server Error : " + error
        }
    }
}

const getAllStudentBySectionId = async (_,{SectionId})=>{
    try {
        const AllStudent = await student.find({section : SectionId})
        return AllStudent;
    } catch (error) {
        return {
            code : 500,
            message : "Internal server Error : " + error
        }
    }
}

module.exports = {
    createAdmin,
    loginUser,
    getUserId,
    getAllUsers,
    getAllStudentBySectionId
}