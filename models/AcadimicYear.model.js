const mongoose = require('mongoose');


const AcadimicYearSchema = new mongoose.Schema({
    startYear: { type: Number, required: true },
    endYear: { type: Number, required: true },
    isCurrent: { type: Boolean, default: true },
    semester: { type: Number, enum: [1, 2], required: true },
    departementId: { type: mongoose.Types.ObjectId, ref: "departement", required: true },
}, { timestamps: true });

const AcadimicYear = mongoose.model("AcadimicYear", AcadimicYearSchema);

module.exports = AcadimicYear;