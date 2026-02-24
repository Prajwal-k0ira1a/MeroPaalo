import mongoose from "mongoose";

const displaySchema = new mongoose.Schema(
    {
        institution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: true
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        },

        counter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Counter"
        },

        currentToken: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Token"
        }
    },
    { timestamps: true }
);

const Display = mongoose.model("Display", displaySchema);

export default Display;