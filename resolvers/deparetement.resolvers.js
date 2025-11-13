const { description } = require('../gql/query.gql');
const departement = require('../models/departement.model');
const { AddDepartement } = require('../validation/departement.validation');



const getAllDepertement = async (_,{},context) => {
    try{
        if(!context.user){
            return {
                code: 403,
                message: "Unauthorized",
            };
        }
        const departements = await departement.find()
        return departements
    }catch(error){
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const CreateDepartement = async (_,{universityId,departementInput},context)=>{
    try {
        if (!context.user) {
            return {
                code: 403,
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
        const { name, description, location, email, password} = parseResult.data
        const hashedpassword = await bcrypt.hash(password , 10)
        const newDepartement = new departement({
            name,description,location,universityId,email,password:hashedpassword
        })
        await newDepartement.save()
        return newDepartement
    } catch (error) {
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

const loginDepartement = async (_,{email,password})=>{
    try{
        const isEmail = /\S+@\S+\.\S+/.test(email);
        if (!isEmail) {
            return {
                code : 300,
                message: "Invalid email format."
            };
        }
        const existingDepartement = await departement.findOne({ email });
        if (!existingDepartement) {
            return {
                code : 404,
                message: "Departement not found."
            };
        }
        const isMatch = await bcrypt.compare(password, existingDepartement.password);
        if (!isMatch) {
            return {
                code : 301,
                message: "Invalid password."
            };
        }
        const token = await generateToken({ email: existingDepartement.email, id: existingDepartement._id, role: 'departement' });
        return {
            token,
            user: existingDepartement
        };
    }catch(error){
        return {
            code: 500,
            message: "Internal server error",
        };
    }
}

module.exports = {
    getAllDepertement,
    CreateDepartement,
    loginDepartement,
    
};