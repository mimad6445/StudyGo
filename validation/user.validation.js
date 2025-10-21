const { z, email } = require("zod")

const addProffesor = z.object({
    name : z.string(),
    email : z.string().optional(),
    emailUniversity : z.string().optional(),
    password : z.string(),
    contact : z.string(),
    dateOfBirth : z.string(),
    city : z.string()
})

module.exports = { addProffesor }