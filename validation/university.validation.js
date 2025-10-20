const { z } = require("zod")


const addUniversity = z.object({
    name : z.string(),
    code: z.string().optional(),
    address : z.string(),
    phoneNumber : z.string(),
    emailUniversity : z.string(),
    email : z.email(),
    password : z.string()
})

module.exports = {
    addUniversity
}