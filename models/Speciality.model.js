const mongoose = require("mongoose")


const SpecialitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: "University"},
    section : { type : mongoose.Schema.Types.ObjectId , ref: "Section"},
},{ timestamps : true})

const Speciality = mongoose.model('Speciality',SpecialitySchema)

module.exports = Speciality