const mongoose = require("mongoose")


const departementSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    location : { type : String },
    establishedYear : { type : String },
    universityId: { type: mongoose.Types.ObjectId, ref: "University"},
    rooms : [{ type : mongoose.Types.ObjectId , ref: "room"}],
    sections : [{ type : mongoose.Types.ObjectId , ref: "Section"}],
    modules : [{ type : mongoose.Types.ObjectId , ref : "Module"}],
    userId : { type : mongoose.Types.ObjectId , ref : "Account", required : true },
    acadimicYear : [{ type : mongoose.Types.ObjectId , ref : "AcadimicYear"}],
    teachers : [{ type : mongoose.Types.ObjectId , ref: "Teacher"}]
},{ timestamps : true})

const departement = mongoose.model('departement',departementSchema)

module.exports = departement