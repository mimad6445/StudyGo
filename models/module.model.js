const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String }, // optional, e.g., "CS101"
    Coef : { type : Number},
    Credites : { type : Number},
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
},{ timestamps : true});

module.exports = mongoose.model("Module", ModuleSchema);
