const University = require("../models/University.model")
const { addUniversity } = require("../validation/university.validation")
const bcrypt = require("bcryptjs")

const AddUniversity = async (_,{universityInput},{context})=>{
    try {
        if(!context.user || context.user.role !== 'admin'){
            return {
                message: "Error creating pub: Admin is not authorized"
            };
        }
        const parsedata = addUniversity.safeParse(universityInput)
        if(!parsedata){
            return {
                code : 401,
                message : "Validation error: " + parseResult.error.message
            }
        }
        const { name , code , address , phoneNumber , emailUniversity , email , password } = parsedata.data
        const hashedpassword = await bcrypt.hash(password , 10)
        const newUniversity = new University({
            name,code,address,email,emailUniversity,phoneNumber,password:hashedpassword
        })
        await newUniversity.save()
        const token = await generateToken({ email: newUniversity.email, id: newUniversity._id , role : 'university'});
        return {
            token,
            university : newUniversity
        }
    } catch (error) {
        return {
            code : 500,
            message : "Internal server Error"
        }
    }
}

const loginUniversity = async (_,{email,password})=>{
    try {
        const isEmail = /\S+@\S+\.\S+/.test(email);
        if (!isEmail) {
            return {
                code : 300,
                message: "Invalid email format."
            };
        }
        const existingUniversity = await University.findOne({ email });
        if (!existingUniversity) {
            return {
                code : 404,
                message: "University not found."
            };
        }
        const isMatch = await bcrypt.compare(password, existingUniversity.password);
        if (!isMatch) {
            return {
                code : 301,
                message: "Invalid password."
            };
        }
        const token = await generateToken({ email: existingUniversity.email, id: existingUniversity._id, role: 'university' });
        return {
            token,
            user: existingUniversity
        };
    } catch (error) {
        return {
            code : 500,
            message : "Internal server Error"
        }
    }
}

const findAllUniversity = async (_,__,{context})=>{
    try {
        const allUniversity = await University.find()
        return allUniversity
    } catch (error) {
        return {
            code : 500,
            message : "Internal server Error"
        }
    }
}

const UpdateUniversity = async (_, { universityInput }, context) => {
    try {
        const { id, name, location, email, phone } = universityInput;
        if (!context.user) {
            return {
                code: 401,
                message: "Unauthorized",
            };
        }
        const updatedUniversity = await University.findByIdAndUpdate(
            id,
            { name, location, email, phone },
            { new: true }
        );
        if (!updatedUniversity) {
            return {
                code: 404,
                message: "University not found",
            };
        }
        return updatedUniversity
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
};

const DeleteUniversity = async (_, { id }, context) => {
    try {
        if (!context.user) {
            return {
                code: 401,
                message: "Unauthorized",
            };
        }
        const deletedUniversity = await University.findByIdAndDelete(id);
        if (!deletedUniversity) {
            return {
                code: 404,
                message: "University not found",
            };
        }
        return {
            code: 200,
            message: "University deleted successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            code: 500,
            message: "Internal server error",
        };
    }
};


module.exports = {
    AddUniversity,
    loginUniversity,
    findAllUniversity,
    UpdateUniversity,
    DeleteUniversity
}