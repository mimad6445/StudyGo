const mongoose = require("mongoose")


const AnnouncentSchema = new mongoose.Schema({
    UniversityId : { type: mongoose.Types.ObjectId , ref : "University" },
    departementId : [{ type : mongoose.Types.ObjectId , ref : "departement"}],
    sectionId : [{ type : mongoose.Types.ObjectId , ref : "section"}],
    
},{ timestamps : true})

const announcement = mongoose.model('announcement',AnnouncentSchema)

module.exports = announcement