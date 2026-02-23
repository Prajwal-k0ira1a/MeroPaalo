import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            unique: true,
            sparse: true,
            lowercase: true
        },

        phone: {
            type: String,
            unique: true,
            sparse: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["admin", "staff", "customer"],
            default: "customer",
            index: true
        }

    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema)

export default User