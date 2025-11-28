const mongoose = require("mongoose")

const SectionSchema = new mongoose.Schema({
    sectionId : { type : mongoose.Types.ObjectId , ref : "section"},
    teacher : { type : mongoose.Types.ObjectId , ref : "Teacher" ,default :null},
    module : { type : mongoose.Types.ObjectId , ref : "Module"},
    type : { type : String , enum : ["CM","TD","TP"], required : true}
},{ timestamps : true})

const section = mongoose.model('ProfAssignment',SectionSchema)

module.exports = section