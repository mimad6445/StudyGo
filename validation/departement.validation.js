const { z } = require("zod")

const AddDepartement = z.object({
    name: z.string(),
    description: z.string().optional(),
    location : z.string().optional(),
    email : z.string(),
    password : z.string()
})

module.exports = { AddDepartement }