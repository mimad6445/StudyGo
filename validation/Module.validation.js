const { z } = require("zod");

const addModule = z.object({
    name: z.string(),
    code: z.string().optional(),
    Coef: z.number(),
    Credites: z.number(),
    VHS: z.number().optional(),
    VHS_Cours: z.number().default(0),
    VHS_TD: z.number().default(0),
    VHS_TP: z.number().default(0),
    Mode_enseignement: z.string(),
    // New evaluation structure
    Mode_evaluation: z.object({
        Continue: z.number().min(0).max(100),
        Examen: z.number().min(0).max(100),
    }).refine(
        (data) => data.Continue + data.Examen === 100,
        { message: "Continue + Examen must equal 100%" }
    ),
    Niveau: z.string(),
    Semestre: z.enum(["S1","S2","S3","S4","S5","S6","S7","S8","S9"]),

});

module.exports = { addModule };
