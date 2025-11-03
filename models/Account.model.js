const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email : { type: String, required: true },
    emailUniversity : { type : String , unique: true, required : function(){ this.role === "Student" || this.role === "Teacher"}},
    phoneNumber : { type: String , unique : true , sparse: true},
    password: { type: String, required: true },
    role: {  type: String,  enum: [ "SuperAdmin","Admin", "Teacher", "Student"],  required: true },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    lastLogin: [{ type: Date }],
}, { timestamps: true });

module.exports = mongoose.model("Account", UserSchema);
