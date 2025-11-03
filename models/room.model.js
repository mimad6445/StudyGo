const mongoose = require("mongoose")


const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    BuildingName: { type: String },
    capacity: { type: String },
    type : [{ type: String , enum : ["Lecture Hall", "Laboratory", "Seminar Room", "Auditorium", "Conference Room"] }],
    facilities : [{ type : String , enum : ["Projector", "Whiteboard", "Audio System", "Video Conferencing", "Wi-Fi"] }],
    universityId: { type: mongoose.Types.ObjectId, ref: "University" },
    departementId: { type: mongoose.Types.ObjectId, ref: "departement", required: true },
},{ timestamps : true})

const room = mongoose.model('room',roomSchema)

module.exports = room