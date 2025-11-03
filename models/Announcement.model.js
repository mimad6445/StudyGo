const mongoose = require("mongoose")


const AnnouncentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["GENERAL", "ACADEMIC", "EXAM", "EVENT", "URGENT", "HOLIDAY", "ADMINISTRATIVE"], default: "GENERAL" },
    attachments: [{ type: String }],
    expiryDate: { type: Date, default: Date.now() + 7 * 24 * 60 * 60 * 1000 },
    UniversityId: { type: mongoose.Types.ObjectId, ref: "University" },
    departementId: [{ type: mongoose.Types.ObjectId, ref: "departement" }],
    sectionId: [{ type: mongoose.Types.ObjectId, ref: "section" }],
},{ timestamps: true})

const announcement = mongoose.model('announcement',AnnouncentSchema)

module.exports = announcement