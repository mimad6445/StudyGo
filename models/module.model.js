const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String }, // optional, e.g., "CS101"
    Coef : { type : Number},
    Credites : { type : Number},
    VHS : { type : Number},
    VHS_Cours : { type : Number , default : 0},
    VHS_TD : { type : Number , default : 0},
    VHS_TP : { type : Number , default : 0},
    Mode_enseignement : { type : String , enum : ["Presentiel" , "Distance"]},
    Mode_evaluation: {
        Continue: { type: Number, default: 0 }, // Percentage 0–100
        Examen: { type: Number, default: 0 },   // Percentage 0–100
    },
    Niveau : { type : String },
    Semestre : { type : String , enum : ["S1" , "S2" , "S3" , "S4" , "S5" , "S6" , "S7" , "S8" , "S9" ]},
    departementId : { type : mongoose.Types.ObjectId , ref : "departement"},
    files: [{ type: mongoose.Types.ObjectId, ref: "File" }],
},{ timestamps : true});

module.exports = mongoose.model("Module", ModuleSchema);
