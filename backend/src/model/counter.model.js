import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
    {
        counterName: {
            type: String,
            required: true
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
            index: true
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

const Counter = mongoose.model("Counter", counterSchema)
export default Counter