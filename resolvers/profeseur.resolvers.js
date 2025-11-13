const user = require('../models/user.model');
const departement = require('../models/departement.model');
const { addProffesor } = require('../validation/user.validation');
const section = require('../models/Section.model');
const module = require('../models/module.model');

const createProfeseur = async (_,{departementId,profeseurInput},context)=>{
    try {
        if(!context.user){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const existingProfeseur = await user.findOne({ emailUniversity: profeseurInput.emailUniversity });
        if(existingProfeseur){
            if(existingProfeseur.departementId !== departementId){
                // make a request to check if the profeseur is in another departement
                return {
                    code : 409,
                    message : "Profeseur with this university email already exists in another departement"
                }
            }
            if(existingProfeseur.role === 'Teacher'){
                return {
                    code : 409,
                    message : "Profeseur with this university email already exists"
                }
            }
        }
        const safeParse = addProffesor.safeParse(profeseurInput);
        if(!safeParse.success){
            return {
                code : 401,
                message : "Validation error: " + safeParse.error.message
            }
        }
        const { name, email, password, emailUniversity , contact , dateOfBirth , city } = safeParse.data;
        const newProfeseur = new user({
            name, email, password, emailUniversity, contact, role: 'Teacher', departementId , city , dateOfBirth
        });
        await newProfeseur.save();
        return newProfeseur;
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const getAllProfeseurByDepartementId = async (_,{departementId},context) => {
    try{
        if(!context.user || context.user.id !== departementId){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const profeseurs = await user.find({ departementId, role: 'Teacher' });
        return profeseurs;
    }catch(error){
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const getProfeseurById = async (_,{profeseurId},context) => {
    try{
        if(!context.user || context.user.role !== 'admin'){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const profeseur = await user.findById(profeseurId);
        if(!profeseur || profeseur.role !== 'Teacher'){
            return {
                code: 404,
                message: "Profeseur Not Found",
            };
        }
        return profeseur;
    }catch(error){
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const loginProfeseur = async (_,{email,password})=>{
    try {
        const existingProfeseur = await user.findOne({ email, role: 'Teacher' });
        if(!existingProfeseur){
            return {
                code : 404,
                message : "Profeseur Not Found"
            }
        }
        if(existingProfeseur.password !== password){
            return {
                code : 301,
                message : "Invalid Password"
            }
        }
        return existingProfeseur;
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const UpdateProfeseur = async (_, { ProffeseurId , profeseurInput }, context) => {
    try {
        const { name, contact, emailUniversity , dateOfBirth , city} = profeseurInput;
        if (!context.user || context.user.id !== id) {
            return {
                code: 401,
                message: "Unauthorized",
            };
        }
        const updatedProfeseur = await user.findByIdAndUpdate(ProffeseurId,
            { name, contact, emailUniversity , dateOfBirth , city },
            { new: true }
        );
        if (!updatedProfeseur) {
            return {
                code: 404,
                message: "Profeseur not found",
            };
        }
        return updatedProfeseur
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
};

const deleteProfeseur = async (_, { profeseurId }, context) => {
    try {
        if (!context.user || context.user.role !== 'admin') {
            return {
                code: 401,
                message: "Unauthorized",
            };
        }
        const deletedProfeseur = await user.findByIdAndDelete(profeseurId);
        if (!deletedProfeseur) {
            return {
                code: 404,
                message: "Profeseur not found",
            };
        }
        return {
            code: 200,
            message: "Profeseur deleted successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
};

const ProfeseurModules = async (_,{profeseurId},context) => {
    try{
        if(!context.user){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const profeseur = await user.findById(profeseurId).populate('Modules');
        if(!profeseur || profeseur.role !== 'Teacher'){
            return {
                code: 404,
                message: "Profeseur Not Found",
            };
        }
        return profeseur.Modules;
    }catch(error){
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const ProfeseurSections = async (_,{profeseurId},context) => {
    try{
        if(!context.user){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const profeseur = await user.findById(profeseurId).populate('section');
        if(!profeseur || profeseur.role !== 'Teacher'){
            return {
                code: 404,
                message: "Profeseur Not Found",
            };
        }
        return profeseur.section;
    }catch(error){
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const AddProffesorToSection = async (_,{profeseurId,sectionId,moduleId},context) => {
    try{
        if(!context.user){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const profeseur = await user.findById(profeseurId);
        if(!profeseur || profeseur.role !== 'Teacher'){
            return {
                code: 404,
                message: "Profeseur Not Found",
            };
        }
        const sectionExists = await section.findById(sectionId);
        if(!sectionExists){
            return {
                code: 404,
                message: "Section Not Found",
            };
        }
        const moduleExists = await module.findById(moduleId);
        if(!moduleExists){
            return {
                code: 404,
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
            code: 500,
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