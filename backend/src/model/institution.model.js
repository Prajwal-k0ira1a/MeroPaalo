import mongoose from 'mongoose'

const institutionSchema = await mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
    },

    phone: {
        type: String,
        unique: true,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
    },

    email: {
        type: String,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please use a valid email address"
        ]
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true })

const Institution = mongoose.model('Institution', institutionSchema)

export default Institution