const departement = require("../models/departement.model");
const room = require("../models/room.model");
const mongoose = require("mongoose");
const { AddRoom } = require("../validation/departement.validation");

const getRoomsByDepartementId = async (_, { departementId , page , limit }, context) => {
    try {
        if (!context.user ) {
            return {
                Errorcode: 403,
                message: "Unauthorized",
            };
        }
        const existingDepartement = await departement.findById(departementId).populate("rooms");
        if (!existingDepartement) {
            return {
                Errorcode: 404,
                message: "Departement Not Found",
            };
        }
        page = Number(page);
        limit = Number(limit);
        const skip = (page - 1) * limit;
        const roomIds = existingDepartement.rooms;
        const rooms = await room.find({ _id: { $in: roomIds } })
            .skip(skip)
            .limit(limit);
        const total = roomIds.length;
        return {
            data: rooms,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            }
        };
    } catch (error) {
        console.error(error);
        return [{
            Errorcode: 500,
            message: "Internal server error",
        }];
    }
};

const CreateRoomByDepartementId = async (_, { departementId, roomInput }, context) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if(!context.user ){
            return {
                Errorcode: 403,
                message: "Unauthorized",
            };
        }
        const existingDepartement = await departement.findById(departementId)
        if(!existingDepartement){
            return {
                Errorcode: 404,
                message: "Departement Not Found",
            };
        }
        const safeParse = AddRoom.safeParse(roomInput)
        if(!safeParse.success){
            return {
                Errorcode : 401,
                message : "Validation error: " + safeParse.error.message
            }
        }
        const { name, BuildingName, capacity, type, facilities } = safeParse.data;
        const newRoom = new room({
            name,
            BuildingName,
            capacity,
            type,
            facilities,
            departementId,
            universityId: existingDepartement.universityId
        });
        await newRoom.save({ session});
        existingDepartement.rooms.push(newRoom._id);
        await existingDepartement.save({ session});
        await session.commitTransaction();
        await session.endSession();
        return newRoom;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        console.error(error);
        return {
            Errorcode: 500,
            message: "Internal server error",
        };
    }
}

module.exports = {
    getRoomsByDepartementId,
    CreateRoomByDepartementId
};