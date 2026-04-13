import mongoose from "mongoose";
import Shift from "../models/shifts.model";

const shiftsRepo = {
    async createShift(arg: {
        companyId: string;
        shiftName: string;
        startDateTime: string;
        endDateTime: string;
        location: string;
        media?: string[];
    }) {
        const shift = await Shift.create({
            companyId: new mongoose.Types.ObjectId(arg.companyId),
            shiftName: arg.shiftName,
            startDateTime: arg.startDateTime,
            endDateTime: arg.endDateTime,
            location: arg.location,
            media: arg.media || null,
        });

        return shift;
    },

    async getAllShifts(filters?: Record<string, any>) {
        const shifts = await Shift.find(filters || {})
            .populate("companyId", "name email")
            .sort({ createdAt: -1 });

        return shifts;
    },

    async getShiftsByCompany(companyId: string) {
        const shifts = await Shift.find({
            companyId: new mongoose.Types.ObjectId(companyId),
        })
            .populate("companyId", "name email")
            .sort({ startDateTime: 1 });

        return shifts;
    },

    async getShiftById(shiftId: string) {
        const shift = await Shift.findById(new mongoose.Types.ObjectId(shiftId)).populate(
            "companyId",
            "name email"
        );

        return shift;
    },

    async updateShift(shiftId: string, updateData: Partial<{
        shiftName: string;
        startDateTime: string;
        endDateTime: string;
        location: string;
        media: string[];
    }>) {
        const shift = await Shift.findByIdAndUpdate(
            new mongoose.Types.ObjectId(shiftId),
            updateData,
            { new: true }
        ).populate("companyId", "name email");

        return shift;
    },

    async deleteShift(shiftId: string) {
        const result = await Shift.deleteOne({
            _id: new mongoose.Types.ObjectId(shiftId),
        });

        return result;
    },

    async getShiftsByDateRange(startDate: string, endDate: string) {
        const shifts = await Shift.find({
            startDateTime: { $gte: startDate },
            endDateTime: { $lte: endDate },
        })
            .populate("companyId", "name email")
            .sort({ startDateTime: 1 });

        return shifts;
    },

    async getShiftsByLocation(location: string) {
        const shifts = await Shift.find({ location })
            .populate("companyId", "name email")
            .sort({ startDateTime: 1 });

        return shifts;
    },
};

export default shiftsRepo;
