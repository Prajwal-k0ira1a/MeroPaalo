import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
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

        counterName: {
            type: String,
            required: true
        },

        staff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        status: {
            type: String,
            enum: ["open", "closed"],
            default: "open"
        }

    },
    { timestamps: true }
);

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;