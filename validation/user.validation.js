const { z, email } = require("zod")

const addProffesor = z.object({
    fullName : z.string(),
    email : z.string().optional(),
    emailUniversity : z.string().optional(),
    password : z.string(),
    contact : z.string(),
    dateOfBirth : z.string(),
    address : z.string(),
    bloodGroup : z.string().optional(),
    researchArea : z.string().optional(),
    linkedIn : z.string().optional(),
    status : z.string().optional(),
    degree : z.string(),
    designation : z.string(),
    gender : z.string()
})

const addStudent = z.object({
    fullName: z.string(),
    StudentCard : z.string(),
    dateOfBirth : z.string(),
    gender : z.string(),
    address : z.string().optional(),
    bloodGroup : z.string().optional(),
    phoneNumber : z.string().optional(),
    email : z.string().optional(),
    emailUniversity : z.string(),
})

module.exports = { addProffesor , addStudent }