const mongoose = require("mongoose")


const UniversitySchema = new mongoose.Schema({
    name : { type : String , required: true},
    code: { type: String ,required: [true, 'University code is required'] ,unique: true , uppercase: true ,trim: true},
    address : { type : String },
    logo : { type : String },
    establishedYear : { type : String },
    emailUniversity : { type : String , required : true},
    departements : [{ type : mongoose.Types.ObjectId , ref : 'departement'}],
    userId : { type : mongoose.Types.ObjectId , ref : "Account" }
},{ timestamps : true})

const University = mongoose.model('University',UniversitySchema)

module.exports = University