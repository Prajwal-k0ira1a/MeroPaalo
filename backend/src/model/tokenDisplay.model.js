import mongoose from "mongoose";

const displaySchema = new mongoose.Schema(
    {
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            index: true
        },

        counter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Counter"
        },

        currentToken: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Token"
        },

        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Display = mongoose.model("Display", displaySchema)

export default Display