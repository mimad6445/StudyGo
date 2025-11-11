const user = require("../models/Account.model.js");
const { addStudent } = require("../validation/user.validation.js")
const departement = require("../models/departement.model.js")
const section = require("../models/Section.model.js")
const mongoose = require("mongoose")

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
        
    } catch (error) {
        return {
            code : 500,
            message : "Internal server Error : " + error
        }
    }
}