import mongoose from "mongoose";

const displaySchema = new mongoose.Schema(
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

        counter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Counter",
            required: true,
        },

        currentToken: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Token",
            default: null,
        },

        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

displaySchema.index({ institution: 1, department: 1, counter: 1 }, { unique: true });

const Display = mongoose.model("Display", displaySchema);
export default Display;
