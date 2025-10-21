const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    StudentCard : {type : String , required : function(){ this.role === "Student"}},
    email: { type: String, unique: true },
    emailUniversity : { type : String , unique: true, required : function(){ this.role === "Student" || this.role === "Teacher"}},
    contact : { type: String },
    city : { type : String },
    dateOfBirth : { type : String },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: [ "Admin", "Teacher", "Student"], 
        required: true 
    },
    universityId: { type: mongoose.Types.ObjectId, ref: "University" },
    departementId: { type: mongoose.Types.ObjectId, ref: "departement" },
    section : [{ type : mongoose.Types.ObjectId , ref : "section"}],
    Modules : [{ type : mongoose.Types.ObjectId , ref : "Module"}],
    servers : [{ type : String }]
},{ timestamps : true });

module.exports = mongoose.model("Account", UserSchema);
