const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    StudentCard : {type : String , required : true },
    dateOfBirth : { type : String , required : true },
    gender : { type : String , enum : ["Male", "Female"], required : true },
    address : { type : String},
    profileImage : { type : String },
    bloodGroup : { type : String , enum : ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    status : { type : String , enum : ["Active", "SUSPENDED","GRADUATED", "DROPPED"], default : "Active" },
    userId : { type : mongoose.Types.ObjectId , ref : "Account", required : true },
    universityId: { type: mongoose.Types.ObjectId, ref: "University", required : true },
    departementId: { type: mongoose.Types.ObjectId, ref: "departement", required : true },
    section : { type : mongoose.Types.ObjectId , ref : "section"},
    servers : [{ type : mongoose.Types.ObjectId , ref : "section" }]
}, { timestamps: true });

module.exports = mongoose.model("Student", UserSchema);
