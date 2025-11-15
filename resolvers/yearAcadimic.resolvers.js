const AcadimicYear = require("../models/AcadimicYear.model")
const deparetement = require("../models/departement.model")
const mongoose = require("mongoose")

const addAcadimicYear = async (_,{startYear,endYear,semester,departementId},context) => {
    try {
        const session = await mongoose.startSession();
            session.startTransaction();
        if (!context.user) {
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const existingDepartement = await deparetement.findById(departementId)
        if(!existingDepartement){
            return {
                code : 404,
                message: "Departement not found."
            };
        }
        const newAcadimicYear = new AcadimicYear({startYear,endYear,semester,departementId})
        existingDepartement.acadimicYear.push(newAcadimicYear._id)
        existingDepartement.save({ session })
        newAcadimicYear.save({ session })
        await session.commitTransaction();
        await session.endSession();
        return newAcadimicYear
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return {
            code: 500,
            message: "Internal server error "+ error.message,
        };
    }
}

const getAcadimicYearByDepartementId = async (_,{deparetementId},context)=>{
    try{
        if(!context.user){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const yearAcadimic = new AcadimicYear.find({ deparetementId })
        if(!yearAcadimic){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        return yearAcadimic
    }catch(error){
        return {
            code: 500,
            message: "Internal server error "+ error.message,
        };
    }
}

module.exports = {
    addAcadimicYear,
    getAcadimicYearByDepartementId
}