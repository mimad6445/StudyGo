const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dateOfBirth : { type : String , required : true },
    gender : { type : String , enum : ["Male", "Female"], required : true },
    designation : { type : String ,enum : ["Professor", "Assistant Professor", "Associate Professor"], required : true },
    address : { type : String },
    profileImage : { type : String },
    degree : { type : String },
    status : { type : String , enum : ["Active", "SUSPENDED","RETIRED","TERMINATED"], default : "Active" },
    linkedIn : { type : String },
    researchArea : { type : String },
    bloodGroup : { type : String , enum : ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    userId : { type : mongoose.Types.ObjectId , ref : "Account", required : true },
    Modules : [{ type : mongoose.Types.ObjectId , ref : "Module"}],
    universityId: { type: mongoose.Types.ObjectId, ref: "University", required : true },
    departementId: { type: mongoose.Types.ObjectId, ref: "departement", required : true },
    section : [{ type : mongoose.Types.ObjectId , ref : "section"}],
    files : [{ type : mongoose.Types.ObjectId , ref : "file"}],
}, { timestamps: true });

module.exports = mongoose.model("Teacher", UserSchema);
