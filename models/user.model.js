const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    StudentCard : {type : String , required : function(){ this.role === "Student"}},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: [ "Admin", "Teacher", "Student"], 
        required: true 
    },
    universityId: { type: mongoose.Types.ObjectId, ref: "University" },
    departementId: { type: mongoose.Types.ObjectId, ref: "departement" },
    section : [{ type : mongoose.Types.ObjectId , ref : "section"}],
    Modules : [{ type : mongoose.Types.ObjectId , ref : "Module"}]
},{ timestamps : true });

module.exports = mongoose.model("User", UserSchema);
