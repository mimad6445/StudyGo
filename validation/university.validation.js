const { z } = require("zod")


const addUniversity = z.object({
    logo : z.string().optional(),
    establishedYear : z.string(),
    name : z.string(),
    code: z.string().optional(),
    address : z.string(),
    email : z.string().optional(),
    emailUniversity : z.string(),
    phoneNumber : z.string(),
    password : z.string()
})

module.exports = {
    addUniversity
}