const { z } = require("zod")


const addUniversity = z.object({
    logo : z.string().optional(),
    establishedYear : z.string(),
    name : z.string(),
    code: z.string().optional(),
    address : z.string(),
    phoneNumber : z.string(),
    emailUniversity : z.string(),
})

module.exports = {
    addUniversity
}