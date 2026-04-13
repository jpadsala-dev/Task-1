import mongoose from "mongoose";
import GuardShift from "../models/guard-shift.model";

const guardShiftRepo = {
    async assignGuardToShift(guardId: string, shiftId: string) {
        const guardShift = await GuardShift.create({
            guardId: new mongoose.Types.ObjectId(guardId),
            shiftId: new mongoose.Types.ObjectId(shiftId),
            status: "assigned",
        });

        return guardShift;
    },

    async removeGuardFromShift(guardId: string, shiftId: string) {
        const result = await GuardShift.deleteOne({
            guardId: new mongoose.Types.ObjectId(guardId),
            shiftId: new mongoose.Types.ObjectId(shiftId),
        });

        return result;
    },

    async getGuardShifts(guardId: string) {
        const guardShifts = await GuardShift.find({
            guardId: new mongoose.Types.ObjectId(guardId),
        })
            .populate("shiftId")
            .sort({ assignedAt: -1 });

        return guardShifts;
    },

    async getShiftGuards(shiftId: string) {
        const shiftGuards = await GuardShift.find({
            shiftId: new mongoose.Types.ObjectId(shiftId),
        })
            .populate("guardId")
            .sort({ assignedAt: -1 });

        return shiftGuards;
    },

    async updateAssignmentStatus(guardId: string, shiftId: string, status: string) {
        const guardShift = await GuardShift.findOneAndUpdate(
            {
                guardId: new mongoose.Types.ObjectId(guardId),
                shiftId: new mongoose.Types.ObjectId(shiftId),
            },
            { status },
            { new: true }
        );

        return guardShift;
    },

    async isGuardAssignedToShift(guardId: string, shiftId: string) {
        const assignment = await GuardShift.findOne({
            guardId: new mongoose.Types.ObjectId(guardId),
            shiftId: new mongoose.Types.ObjectId(shiftId),
        });

        return !!assignment;
    },

    async getAllAssignments(filters?: Record<string, any>) {
        const assignments = await GuardShift.find(filters || {})
            .populate("guardId")
            .populate("shiftId")
            .sort({ assignedAt: -1 });

        return assignments;
    },
};

export default guardShiftRepo;
