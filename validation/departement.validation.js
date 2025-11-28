const { z } = require("zod")

const AddDepartement = z.object({
    name: z.string(),
    description: z.string().optional(),
    location : z.string().optional(),
    establishedYear : z.string().optional(),
    email : z.string(),
    emailUniversity : z.string(),
    phoneNumber : z.string(),
    password : z.string()
})

const AddRoom = z.object({
    name: z.string(),
    BuildingName: z.string().optional(),
    capacity: z.string().optional(),
    type : z.enum(["Lecture Hall", "Laboratory", "Seminar Room", "Auditorium", "Conference Room"]),
    facilities : z.array(z.enum(["Projector", "Whiteboard", "Audio System", "Video Conferencing", "Wi-Fi"])).optional(),
})

module.exports = { AddDepartement, AddRoom }