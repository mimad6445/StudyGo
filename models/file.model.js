const mongoose = require('mongoose')


const FileSchema = new mongoose.Schema({
    name : { type : String },
    type : { type : String },
    path : { type : String , required : true},
    uploadedBy : { type : mongoose.Types.ObjectId , ref : 'User'},
    moduleId : { type : mongoose.Types.ObjectId , ref : 'Module'}
},{ timestamps : true})

const file = mongoose.model("file",FileSchema)

module.exports = file