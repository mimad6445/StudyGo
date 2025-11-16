const AcadimicYear = require("../models/AcadimicYear.model");
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
        
        if(!context.user ){
            return {
                Errorcode: 403,
                message: "Unauthorized",
            };
        }
        const departementExisting = await departement.findById(departementId)
        if(!departementExisting){
            return {
                Errorcode :404,
                message : "Departement Not found"
            }
        }
        const parseResult = addSection.safeParse(SectionInput)
        if(!parseResult.success){
            return {
                Errorcode : 401,
                message : "Validation error: " + parseResult.error.message
            }
        }
        const { yearAcadimic, System, Niveaux, isSpeciality , name} = parseResult.data
        const existingYearAcadimic = await AcadimicYear.findById(yearAcadimic)
        if(!existingYearAcadimic || !existingYearAcadimic.isCurrent){
            return {
                Errorcode : 404,
                message : "The Year Acadimic is not current"
            }
        }
        const serverId = crypto.randomBytes(4).toString('hex').toUpperCase();
        const newSection = new Section({
            yearAcadimic,Niveaux,System,isSpeciality,serverId,departementId,name
        })
        departementExisting.sections.push(newSection._id)
        await newSection.save({ session })
        await departementExisting.save({ session })
        await session.commitTransaction();
        await session.endSession();
        return newSection
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error "+error.message,
        };
    }
}

const getAllSectionByDepartementId = async (_,{departementId,AcadimicYearId},context)=>{
    try {
        if(!context.user || context.user.id !== departementId){
            return {
                Errorcode: 403,
                message: "Unauthorized",
            };
        }
        const exisistingAcadimicYear = await AcadimicYear.findById(AcadimicYearId)
        if(!exisistingAcadimicYear){
            return {
                Errorcode: 404,
                message: "Acadimic Year Not Found",
            };
        }
        const departementExisting = await departement
            .findById(departementId)
            .populate({
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
                        path: "professeur.module",
                    }
                ]
            });

        if (!departementExisting) {
            return {
                Errorcode: 404,
                message: "Departement Not Found",
            };
        }

        if (!departementExisting.sections || departementExisting.sections.length === 0) {
            return {
                Errorcode: 404,
                message: "No Sections Found For This Departement",
            };
        }

        return departementExisting;
    } catch (error) {
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
}

const loginSection = async (_,{serverId})=>{
    try {
        const exisistingSection = await section.findOne({ serverId })
        if(!exisistingSection){
            return {
                Errorcode : 404,
                message : "No Sctions Created"
            }
        }
        return exisistingSection;
    } catch (error) {
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
}

module.exports = {
    CreateSection,
    getAllSectionByDepartementId
}