const user = require('../models/Account.model');
const departement = require('../models/departement.model');
const { addProffesor } = require('../validation/user.validation');
const section = require('../models/Section.model');
const moduleModel = require('../models/module.model');
const teacherModel = require('../models/teacher.model');
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const createProfeseur = async (_,{departementId,profeseurInput,forceCreation},context)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if(!context.user){
            return {
                Errorcode: 403,
                message: "Unauthorized",
            };
        }
        const existingDepartement = await departement.findById(departementId)
        if(!existingDepartement){
            return {
                Errorcode: 404,
                message: "Not Found",
            };
        }
        const safeParse = addProffesor.safeParse(profeseurInput);
        if(!safeParse.success){
            return {
                Errorcode : 401,
                message : "Validation error: " + safeParse.error.message
            }
        }
        const { fullName, email, password, emailUniversity , contact , dateOfBirth , address ,bloodGroup,researchArea,linkedIn,status,degree ,designation ,gender} = safeParse.data;
        const existingProfeseur = await user.findOne({ emailUniversity: profeseurInput.emailUniversity });
        if(existingProfeseur){
            if(existingProfeseur.departementId !== departementId){
                if(forceCreation){
                    const user = await teacherModel.findOne({ userId : existingProfeseur._id})
                    if(!user){
                        const newTeacher = new teacherModel({
                            dateOfBirth , address , bloodGroup , researchArea , linkedIn , status , degree , designation , gender , departementId , universityId : existingDepartement.universityId , userId : existingProfeseur._id
                        })
                        await newTeacher.save()
                        return newTeacher
                    }else{
                        teacherModel.universityId  = existingDepartement.universityId
                        teacherModel.departementId = departementId
                        await newTeacher.save()
                        return newTeacher
                    }
                }
                return {
                    Errorcode : 410,
                    message : "Profeseur with this university email already exists in another departement"
                }
            }
            if(existingProfeseur.role === 'Teacher'){
                return {
                    Errorcode : 409,
                    message : "Profeseur with this university email already exists"
                }
            }else{
                return {
                    Errorcode : 408,
                    message : "The role is not for Tracher"
                }
            }
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
        const newProfeseur = new user({
            fullName, email, password :hashedPassword, emailUniversity, contact, role: 'Teacher' 
        });
        const newTeacher = new teacherModel({
            dateOfBirth , address , bloodGroup , researchArea , linkedIn , status , degree , designation , gender , departementId , universityId : existingDepartement.universityId , userId : newProfeseur._id
        })
        await newProfeseur.save({ session });
        await newTeacher.save({ session })
        await session.commitTransaction();
        await session.endSession();
        const populatedTeacher = await teacherModel.findById(newTeacher._id).populate("userId").populate("Modules")
        return populatedTeacher;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
}

const getAllProfeseurByDepartementId = async (_, { departementId, page = 1, limit = 10 }, context) => {
    try {
        if (!context.user) {
            return [{
                Errorcode: 403,
                message: "Unauthorized",
            }];
        }

        if (context.user.departementId !== departementId) {
            return [{
                Errorcode : 403,
                message : "You are not Authorized to see departements Professeur"
            }];
        }

        const skip = (page - 1) * limit;

        const profeseurs = await teacherModel
            .find({ departementId })
            .skip(skip)
            .limit(limit);

        return profeseurs;
    } catch (error) {
        console.error(error);
        return [{
            Errorcode : 500,
            message : "Internal message Error "+error.message
        }];
    }
};


const getProfeseurById = async (_,{profeseurId},context) => {
    try{
        if(!context.user || context.user.role !== 'admin'){
            return {
                Errorcode: 403,
                message: "Unauthorized",
            };
        }
        const profeseur = await user.findById(profeseurId);
        if(!profeseur || profeseur.role !== 'Teacher'){
            return {
                Errorcode: 404,
                message: "Profeseur Not Found",
            };
        }
        return profeseur;
    }catch(error){
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
}

const loginProfeseur = async (_,{email,password})=>{
    try {
        const existingProfeseur = await user.findOne({ email, role: 'Teacher' });
        if(!existingProfeseur){
            return {
                Errorcode : 404,
                message : "Profeseur Not Found"
            }
        }
        if(existingProfeseur.password !== password){
            return {
                Errorcode : 301,
                message : "Invalid Password"
            }
        }
        return existingProfeseur;
    } catch (error) {
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
}

const UpdateProfeseur = async (_, { ProffeseurId , profeseurInput }, context) => {
    try {
        const { name, contact, emailUniversity , dateOfBirth , city} = profeseurInput;
        if (!context.user || context.user.id !== id) {
            return {
                Errorcode: 401,
                message: "Unauthorized",
            };
        }
        const updatedProfeseur = await user.findByIdAndUpdate(ProffeseurId,
            { name, contact, emailUniversity , dateOfBirth , city },
            { new: true }
        );
        if (!updatedProfeseur) {
            return {
                Errorcode: 404,
                message: "Profeseur not found",
            };
        }
        return updatedProfeseur
    } catch (error) {
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
};

const deleteProfeseur = async (_, { profeseurId }, context) => {
    try {
        if (!context.user || context.user.role !== 'admin') {
            return {
                Errorcode: 401,
                message: "Unauthorized",
            };
        }
        const deletedProfeseur = await user.findByIdAndDelete(profeseurId);
        if (!deletedProfeseur) {
            return {
                Errorcode: 404,
                message: "Profeseur not found",
            };
        }
        return {
            Errorcode: 200,
            message: "Profeseur deleted successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
};

const ProfeseurModules = async (_,{profeseurId},context) => {
    try{
        if(!context.user){
            return {
                Errorcode: 403,
                message: "Unauthorized",
            };
        }
        const profeseur = await user.findById(profeseurId).populate('Modules');
        if(!profeseur || profeseur.role !== 'Teacher'){
            return {
                Errorcode: 404,
                message: "Profeseur Not Found",
            };
        }
        return profeseur.Modules;
    }catch(error){
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
}

const ProfeseurSections = async (_,{profeseurId},context) => {
    try{
        if(!context.user){
            return {
                Errorcode: 403,
                message: "Unauthorized",
            };
        }
        const profeseur = await user.findById(profeseurId).populate('section');
        if(!profeseur || profeseur.role !== 'Teacher'){
            return {
                Errorcode: 404,
                message: "Profeseur Not Found",
            };
        }
        return profeseur.section;
    }catch(error){
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
}

const AddProffesorToSection = async (_,{profeseurId,sectionId,moduleId},context) => {
    try{
        if(!context.user){
            return {
                Errorcode: 403,
                message: "Unauthorized",
            };
        }
        const profeseur = await user.findById(profeseurId);
        if(!profeseur || profeseur.role !== 'Teacher'){
            return {
                Errorcode: 404,
                message: "Profeseur Not Found",
            };
        }
        const sectionExists = await section.findById(sectionId);
        if(!sectionExists){
            return {
                Errorcode: 404,
                message: "Section Not Found",
            };
        }
        const moduleExists = await moduleModel.findById(moduleId);
        if(!moduleExists){
            return {
                Errorcode: 404,
                message: "Module Not Found",
            };
        }
        const ProfeseurSections = {data : sectionId , module : moduleId};
        sectionExists.professeur.push(ProfeseurSections);
        await profeseur.save();
        return profeseur;
    }catch(error){
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
}

module.exports = {
    createProfeseur,
    getAllProfeseurByDepartementId,
    getProfeseurById,
    loginProfeseur,
    deleteProfeseur,
    AddProffesorToSection,
    UpdateProfeseur,
    ProfeseurModules,
    ProfeseurSections
}