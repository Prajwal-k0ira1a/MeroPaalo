import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        description: String,

        avgServiceTime: {
            type: Number,
            default: 5
        },

        isActive: {
            type: Boolean,
            default: true
        }

    },
    { timestamps: true }
);
const Department = mongoose.model("Department", departmentSchema)

export default Department