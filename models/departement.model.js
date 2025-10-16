const mongoose = require("mongoose")


const departementSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: "University"},
    sections : [{ type : mongoose.Schema.Types.ObjectId , ref: "Section"}],
    Speciallities : [{ type : mongoose.Schema.ObjectId , ref : "Speciality"}],
    serverId : { type : String }
},{ timestamps : true})

const departement = mongoose.model('departement',departementSchema)

module.exports = departement