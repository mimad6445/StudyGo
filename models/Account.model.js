const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName : { type : String },
    email : { type: String , unique : true , sparse: true },
    emailUniversity : { type : String , unique : true , sparse: true, required : function(){ this.role === "Student" || this.role === "Teacher"}},
    phoneNumber : { type: String , unique : true , sparse: true},
    password: { type: String },
    role: {  type: String,  enum: [ "GOAT","SuperAdmin","Admin", "Teacher", "Student"],  required: true },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    lastLogin: [{ type: Date }],
}, { timestamps: true });

module.exports = mongoose.model("Account", UserSchema);
