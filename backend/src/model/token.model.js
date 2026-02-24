import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
        institution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
            index: true,
        },

        queueDay: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QueueDay",
            required: true,
            index: true,
        },

        customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        tokenNumber: { type: String, required: true },

        status: {
            type: String,
            enum: ["waiting", "called", "serving", "completed", "missed", "cancelled"],
            default: "waiting",
            index: true,
        },

        issuedAt: { type: Date, default: Date.now },
        calledAt: Date,
        servingAt: Date,
        completedAt: Date,
    },
    { timestamps: true }
);

tokenSchema.index({ institution: 1, queueDay: 1, tokenNumber: 1 }, { unique: true });

const Token = mongoose.model("Token", tokenSchema);
export default Token;
