const { z } = require("zod")


const addSection = z.object({
    yearAcadimic : z.string().optional(),
    System : z.string(),
    Niveaux : z.string(),
    isSpeciality : z.boolean(),
    name : z.string().optional()
})

module.exports = { addSection }