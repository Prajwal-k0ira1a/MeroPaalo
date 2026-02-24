import mongoose from "mongoose";

const tokenHistorySchema = new mongoose.Schema(
    {
        institution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: true
        },

        token: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Token",
            required: true
        },

        counter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Counter"
        },

        status: {
            type: String,
            required: true
        },

        note: String,

        changedAt: {
            type: Date,
            default: Date.now
        }

    },
    { timestamps: true }
);

const TokenHistory = mongoose.model("TokenHistory", tokenHistorySchema);

export default TokenHistory;