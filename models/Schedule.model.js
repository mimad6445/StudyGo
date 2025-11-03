const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    sectionId: { type: mongoose.Types.ObjectId, ref: "Section", required: true },
    files: [{ type: mongoose.Types.ObjectId, ref: "file" }],
}, { timestamps: true });

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;
