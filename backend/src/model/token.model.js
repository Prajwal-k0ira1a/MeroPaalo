import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
        tokenNumber: {
            type: String,
            required: true
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
            index: true
        },

        queueDay: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QueueDay",
            required: true,
            index: true
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
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
            default: "waiting",
            index: true
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

tokenSchema.index(
    { tokenNumber: 1, queueDay: 1 },
    { unique: true }
);

const Token = mongoose.model("Token", tokenSchema)

export default Token