import shiftsRepo from "../repository/shifts.repository";
import { AppError } from "../utils/appError";

const shiftsService = {
    async createShift(arg: {
        companyId: string;
        shiftName: string;
        startDateTime: string;
        endDateTime: string;
        location: string;
        media?: string[];
    }) {
        // Validate date and time
        const startTime = new Date(arg.startDateTime);
        const endTime = new Date(arg.endDateTime);

        if (endTime <= startTime) {
            throw new AppError("End time must be after start time", 400);
        }

        const result = await shiftsRepo.createShift(arg);
        return result;
    },

    async getAllShifts(arg?: { filters?: Record<string, any> }) {
        const result = await shiftsRepo.getAllShifts(arg?.filters);
        return result;
    },

    async getShiftsByCompany(arg: { companyId: string }) {
        const result = await shiftsRepo.getShiftsByCompany(arg.companyId);
        return result;
    },

    async getShiftById(arg: { shiftId: string }) {
        const result = await shiftsRepo.getShiftById(arg.shiftId);

        if (!result) {
            throw new AppError("Shift not found", 404);
        }

        return result;
    },

    async updateShift(arg: {
        shiftId: string;
        shiftName?: string;
        startDateTime?: string;
        endDateTime?: string;
        location?: string;
        media?: string[];
    }) {
        // Validate date and time if both are provided
        if (arg.startDateTime && arg.endDateTime) {
            const startTime = new Date(arg.startDateTime);
            const endTime = new Date(arg.endDateTime);

            if (endTime <= startTime) {
                throw new AppError("End time must be after start time", 400);
            }
        }

        const updateData: Partial<{
            shiftName: string;
            startDateTime: string;
            endDateTime: string;
            location: string;
            media: string[];
        }> = {};

        if (arg.shiftName) updateData.shiftName = arg.shiftName;
        if (arg.startDateTime) updateData.startDateTime = arg.startDateTime;
        if (arg.endDateTime) updateData.endDateTime = arg.endDateTime;
        if (arg.location) updateData.location = arg.location;
        if (arg.media) updateData.media = arg.media;

        const result = await shiftsRepo.updateShift(arg.shiftId, updateData);

        if (!result) {
            throw new AppError("Shift not found", 404);
        }

        return result;
    },

    async deleteShift(arg: { shiftId: string }) {
        const result = await shiftsRepo.deleteShift(arg.shiftId);

        if (result.deletedCount === 0) {
            throw new AppError("Shift not found", 404);
        }

        return result;
    },

    async getShiftsByDateRange(arg: { startDate: string; endDate: string }) {
        const startTime = new Date(arg.startDate);
        const endTime = new Date(arg.endDate);

        if (endTime <= startTime) {
            throw new AppError("End date must be after start date", 400);
        }

        const result = await shiftsRepo.getShiftsByDateRange(arg.startDate, arg.endDate);
        return result;
    },

    async getShiftsByLocation(arg: { location: string }) {
        const result = await shiftsRepo.getShiftsByLocation(arg.location);
        return result;
    },
};

export default shiftsService;