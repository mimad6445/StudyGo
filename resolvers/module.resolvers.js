const departement = require("../models/departement.model");
const Module = require("../models/module.model");
const mongoose = require("mongoose");
const { addModule } = require("../validation/Module.validation");

const getAllModules = async () => {
    try {
        const modules = await Module.find();
        return modules;
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
};

const getModuleByDepartementId = async (_,{departementId},context) => {
    try{
        if(!context.user){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const modules = await Module.find({ departementId });
        return modules;
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
};

const getModuleById = async (_,{moduleId},context) => {
    try{
        if(!context.user){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const module = await Module.findById(moduleId);
        if(!module){
            return {
                code: 404,
                message: "Module Not Found",
            };
        }
        return module;
    }catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
};

const CreateModule = async (_,{departementId,moduleInput},context) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        if(!context.user){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const existingDepartement = await departement.findById(departementId)
        if(!existingDepartement){
            return {
                code: 404,
                message: "Departement Not Found",
            };
        }
        const safeResult = addModule.safeParse(moduleInput);
        if(!safeResult.success){
            return {
                code: 401,
                message : "Validation error: " + safeResult.error.message
            }
        }
        const { name, code, Coef , Credites } = moduleInput;
        const newModule = new Module({
            name, code, Credites, Coef
        });
        existingDepartement.modules.push(newModule._id);
        await existingDepartement.save({ session });
        await newModule.save({ session});
        return newModule;
    }catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
};

const DeleteModule = async (_,{moduleId},context) => {
    try{
        if(!context.user){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const deletedModule = await Module.findByIdAndDelete(moduleId);
        if(deletedModule){
            await departement.updateMany(
                { modules: moduleId },
                { $pull: { modules: moduleId } }
            );
            // remove files associated with the module if  with bullmq
        }
        if(!deletedModule){
            return {
                code: 404,
                message: "Module Not Found",
            };
        }
        return {
            code: 200,
            message: "Module deleted successfully",
        };
    }catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
};


module.exports = {
    getAllModules,
    getModuleByDepartementId,
    getModuleById,
    CreateModule,
    DeleteModule
};