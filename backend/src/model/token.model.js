import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
        institution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: true
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true
        },

        queueDay: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QueueDay",
            required: true
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        tokenNumber: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: [
                "waiting",
                "called",
                "serving",
                "completed",
                "missed",
                "cancelled"
            ],
            default: "waiting"
        },

        issuedAt: {
            type: Date,
            default: Date.now
        },

        calledAt: Date,

        completedAt: Date
    },
    { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);

export default Token;