const departement = require("../models/departement.model");
const section = require("../models/Section.model");
const Section = require("../models/Section.model");
const { addSection } = require("../validation/section.validation");
const mongoose = require("mongoose");
const crypto = require("node:crypto")

const CreateSection = async(_,{departementId,SectionInput},context)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if(!context.user || context.user.id !== departementId ){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const departementExisting = await departement.findById(departementId)
        if(!departementExisting){
            return {
                code :404,
                message : "Departement Not found"
            }
        }
        const parseResult = addSection.safeParse(SectionInput)
        if(!parseResult){
            return {
                code : 401,
                message : "Validation error: " + parseResult.error.message
            }
        }
        const { yearAcadimic, System, Niveaux, isSpeciality } = parseResult.data
        const serverId = crypto.randomBytes(4).toString('hex').toUpperCase();
        const newSection = new Section({
            yearAcadimic,Niveaux,System,isSpeciality,serverId,departementId
        })
        departementExisting.sections.push(newSection._id)
        await newSection.save({ session })
        await departementExisting.save({ session })
        return newSection
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const getAllSectionByDepartementId = async (_,{departementId},context)=>{
    try {
        if(!context.user || context.user.id !== departementId){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const departementExisting = await departement.findById(departementId)
        if(!departementExisting){
            return {
                code: 404,
                message: "Departement Not Found",
            };
        }
        const DepartementSections = await section.find({ departementId })
        if(!DepartementSections){
            return {
                code : 404,
                message : "No Sctions Created"
            }
        }
        return DepartementSections
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const loginSection = async (_,{serverId})=>{
    try {
        const exisistingSection = await section.findOne({ serverId })
        if(!exisistingSection){
            return {
                code : 404,
                message : "No Sctions Created"
            }
        }
        return exisistingSection;
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

