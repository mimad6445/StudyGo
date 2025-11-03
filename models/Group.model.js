const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose.Types.ObjectId, ref: "Student" }],
    sectionId: { type: mongoose.Types.ObjectId, ref: "Section" },
    Schedule : { type : mongoose.Types.ObjectId , ref : "Schedule"},
    files : [{ type : mongoose.Types.ObjectId , ref : "file"}],
},{ timestamps: true})

const group = mongoose.model('group',GroupSchema)

module.exports = group