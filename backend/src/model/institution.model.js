import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String
        },

        phone: {
            type: String,
            unique: true,
            sparse: true,
            match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
        },

        email: {
            type: String,
            lowercase: true,
            unique: true,
            sparse: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"],
        },

        planType: {
            type: String,
            enum: ["basic", "pro"],
            default: "basic"
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },
    },
    { timestamps: true }
);

const Institution = mongoose.model("Institution", institutionSchema);
export default Institution;
