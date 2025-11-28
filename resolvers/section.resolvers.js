const { log } = require("node:console");
const AcadimicYear = require("../models/AcadimicYear.model");
const departement = require("../models/departement.model");
const Module = require("../models/module.model");
const Section = require("../models/Section.model");
const teacher = require("../models/teacher.model");
const { addSection } = require("../validation/section.validation");
const mongoose = require("mongoose");
const crypto = require("node:crypto")
const ProfAssignment = require("../models/ProfAssignment.model");

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
        const { yearAcadimic, System, Niveaux, isSpeciality , name , CapacityMin , CapacityMax} = parseResult.data
        const existingYearAcadimic = await AcadimicYear.findById(yearAcadimic)
        if(!existingYearAcadimic || !existingYearAcadimic.isCurrent){
            return {
                Errorcode : 404,
                message : "The Year Acadimic is not current"
            }
        }
        const serverId = crypto.randomBytes(4).toString('hex').toUpperCase();
        const newSection = new Section({
            yearAcadimic,Niveaux,System,isSpeciality,serverId,departementId,name , CapacityMax , CapacityMin
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
        if(!context.user ){
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
        const departementExisting = await departement.findById(departementId).populate([
            { path: "rooms" },
            { path: "sections" },
            { path: "modules" },
            { path: "userId" },
            { path: "acadimicYear" },
            { path: "teachers" }
        ]);
        
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

const getAllSectionByDepartementIdNiveau = async (_,{departementId,AcadimicYearId,Niveaux},context)=>{
    try {
        if(!context.user ){
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
        console.log('--------->',typeof Niveaux,Niveaux);
        
        const departementExisting = await departement
            .findById(departementId)
            .populate({
                path: "sections",
                match: { Niveaux },   // <-- Filter applied HERE
            });

        if (!departementExisting) {
            return {
                Errorcode: 404,
                message: "Departement Not Found",
            };
        }
        console.log("Dep ----------------> ",departementExisting);
        
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

const CreationProfAssignment = async(_,{SectionId,ModuleId,TeacherId,type},context)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        if(!context.user ){
            return {
                Errorcode: 403,
                message: "Unauthorized",
            };
        }
        if(!["CM","TD","TP"].includes(type)){
            return {
                Errorcode : 401,
                message : "Type must be one of the following: CM, TD, TP"
            }
        }
        const moduleExisting = await Module.findById(ModuleId)
        if(!moduleExisting){
            return {
                Errorcode : 404,
                message : "Module Not Found"
            }
        }
        const teacherExisting = await teacher.findById(TeacherId)
        if(!teacherExisting){
            return {
                Errorcode : 404,
                message : "Teacher Not Found"
            }
        }
        const sectionExisting = await Section.findById(SectionId)
        if(!sectionExisting){
            return {
                Errorcode : 404,
                message : "Section Not Found"
            }
        }
        if(sectionExisting.departementId.toString() !== moduleExisting.departementId.toString()){
            return {
                Errorcode : 409,
                message : "Module and Section do not belong to the same departement"
            }
        }
        if(teacherExisting.departementId.toString() !== moduleExisting.departementId.toString()){
            return {
                Errorcode : 409,
                message : "Teacher and Module do not belong to the same departement"
            }
        }
        const isAlreadyAssigned = await ProfAssignment.findOne({
            sectionId: SectionId,
            module: ModuleId,
            type: type
        });
        
        if(isAlreadyAssigned){
            return {
                Errorcode : 409,
                message : "This module is already assigned to a professor for this section and type"
            }
        }
        const newAssignment = new ProfAssignment({
            module: ModuleId,
            teacher: TeacherId,
            type,
            sectionId: SectionId
        });
        await newAssignment.save({ session })
        sectionExisting.Assignments.push(newAssignment._id)
        await sectionExisting.save({ session })
        await session.commitTransaction();
        await session.endSession();
        const sectionWithPopulatedData = await Section.findById(SectionId).populate("Assignments");
        return sectionWithPopulatedData
    }catch(error){
        await session.abortTransaction();
        await session.endSession();
        return {
            Errorcode : 500,
            message : "Internal server Error : " + error
        }
    }
}

module.exports = {
    CreateSection,
    getAllSectionByDepartementId,
    getAllSectionByDepartementIdNiveau,
    CreationProfAssignment
}