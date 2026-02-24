import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
    {
        institution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },

        counterName: { type: String, required: true },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
            index: true,
        },

        staff: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        status: { type: String, enum: ["open", "closed"], default: "open" },
    },
    { timestamps: true }
);

counterSchema.index({ institution: 1, department: 1, counterName: 1 }, { unique: true });

const Counter = mongoose.model("Counter", counterSchema);
export default Counter;
