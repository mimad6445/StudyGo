const mongoose = require("mongoose")


const departementSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    location : { type : String },
    universityId: { type: mongoose.Types.ObjectId, ref: "University"},
    sections : [{ type : mongoose.Types.ObjectId , ref: "Section"}],
    email : { type : String },
    password : { type : String }
},{ timestamps : true})

const departement = mongoose.model('departement',departementSchema)

module.exports = departement