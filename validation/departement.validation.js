const { z } = require("zod")

const AddDepartement = z.object({
    name: z.string(),
    description: z.string().optional(),
    location : z.string().optional(),
    establishedYear : z.string().optional(),
    email : z.string(),
    emailUniversity : z.string(),
    phoneNumber : z.string(),
    password : z.string()
})

module.exports = { AddDepartement }