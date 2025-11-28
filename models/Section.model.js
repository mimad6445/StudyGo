const mongoose = require("mongoose")


const SectionSchema = new mongoose.Schema({
    departementId : { type : mongoose.Types.ObjectId , ref : "departement"},
    yearAcadimic : { type : mongoose.Types.ObjectId , ref : "AcadimicYear"},
    name : { type : String },
    CapacityMin : { type : Number , default : 0},
    CapacityMax : { type : Number , default : 0},
    System : { type: String, enum:["LMD","Classic"] , required: true },
    Niveaux : { type: String , required: true},
    isSpeciality : { type : Boolean , default : false},
    Assignments : [{ type : mongoose.Types.ObjectId , ref : "ProfAssignment"}],
    serverId : { type : String , unique : true, required : true},
    users : [{ type : mongoose.Types.ObjectId , ref : "Student"}],
    Groups : [{ type : mongoose.Types.ObjectId , ref : "Group"}],
    Schedule : { type : mongoose.Types.ObjectId , ref : "Schedule"},
    files : [{ type : mongoose.Types.ObjectId , ref : "file"}],
},{ timestamps : true})

const section = mongoose.model('section',SectionSchema)

module.exports = section