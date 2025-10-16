const mongoose = require("mongoose")


const SectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: "University"},
    sections : [{ type : mongoose.Schema.Types.ObjectId , ref: "Section"}],
    teachers : [{ type : mongoose.Schema.Types.ObjectId , ref : "User"}],
    Speciallities : [{ type : mongoose.Schema.ObjectId , ref : "Speciality"}],
    serverId : { type : String }
},{ timestamps : true})

const section = mongoose.model('section',SectionSchema)

module.exports = departement