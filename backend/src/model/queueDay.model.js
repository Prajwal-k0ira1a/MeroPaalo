import mongoose from "mongoose";

const queueDaySchema = new mongoose.Schema(
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

        date: {
            type: Date,
            required: true
        },

        startTime: String,

        endTime: String,

        status: {
            type: String,
            enum: ["active", "closed"],
            default: "active"
        }

    },
    { timestamps: true }
);

const QueueDay = mongoose.model("QueueDay", queueDaySchema);

export default QueueDay;