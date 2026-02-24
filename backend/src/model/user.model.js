import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        institution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: function () {
                return this.role !== "customer";
            }
        },

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
            unique: true,
            required:true
        },

        phone: {
            type: String,
            match: [/^\d{10}$/, "Phone must be 10 digits"]
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["admin", "staff", "customer"],
            default: "customer"
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;