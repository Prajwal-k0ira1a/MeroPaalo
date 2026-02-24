import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
    {
        institution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: true
        },

        name: {
            type: String,
            required: true
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

const Department = mongoose.model("Department", departmentSchema);

export default Department;