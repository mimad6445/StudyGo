const mongoose = require("mongoose")


const SectionSchema = new mongoose.Schema({
    departement : { type : mongoose.Types.ObjectId , ref : "departement"},
    yearAcadimic : { type : String },
    System : { type: String, enum:["LMD","Classic"] , required: true },
    Niveaux : { type: String , required: true},
    isSpeciality : { type : Boolean , default : false},
    teacher : [{
        data : { type : mongoose.Types.ObjectId , ref : "User"},
        module : { type : mongoose.Types.ObjectId , ref : "Module"}
    }],
    serverId : { type : String , unique : true}
},{ timestamps : true})

const section = mongoose.model('section',SectionSchema)

module.exports = section