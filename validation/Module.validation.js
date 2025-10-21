const { z } = require("zod")

const addModule = z.object({
    name: z.string(),
    code: z.string(), // optional, e.g., "CS101"
    Coef : z.number(),
    Credites : z.number()
})

module.exports = { addModule }