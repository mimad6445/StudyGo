const { z } = require("zod")


const addSection = z.object({
    yearAcadimic : z.string(),
    System : z.string(),
    Niveaux : z.string(),
    isSpeciality : z.boolean()
})

module.exports = { addSection }