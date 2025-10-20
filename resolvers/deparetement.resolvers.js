const departement = require('../models/departement.model');
const { AddDepartement } = require('../validation/departement.validation');



const getAllDepertement = async (_,{},context) => {
    try{
        const departements = await departement.find()
        return departements
    }catch(error){
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const CreateDepartement = async (_,{departementInput},context)=>{
    try {
        if (!context.user) {
            return {
                code: 401,
                message: "Unauthorized",
            };
        }
        const parseResult = AddDepartement.safeParse(departementInput)
        if(!parseResult){
            return {
                code : 401,
                message : "Validation error: " + parseResult.error.message
            }
        }
    } catch (error) {
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}