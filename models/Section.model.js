const mongoose = require("mongoose")


const SectionSchema = new mongoose.Schema({
    departementId : { type : mongoose.Types.ObjectId , ref : "departement"},
    yearAcadimic : { type : mongoose.Types.ObjectId , ref : "AcadimicYear"},
    System : { type: String, enum:["LMD","Classic"] , required: true },
    Niveaux : { type: String , required: true},
    isSpeciality : { type : Boolean , default : false},
    professeur : [{
        data : { type : mongoose.Types.ObjectId , ref : "Teacher"},
        module : { type : mongoose.Types.ObjectId , ref : "Module"}
    }],
    serverId : { type : String , unique : true, required : true},
    users : [{ type : mongoose.Types.ObjectId , ref : "Student"}],
    Groups : [{ type : mongoose.Types.ObjectId , ref : "Group"}],
    Schedule : { type : mongoose.Types.ObjectId , ref : "Schedule"},
    files : [{ type : mongoose.Types.ObjectId , ref : "file"}],
},{ timestamps : true})

const section = mongoose.model('section',SectionSchema)

module.exports = section