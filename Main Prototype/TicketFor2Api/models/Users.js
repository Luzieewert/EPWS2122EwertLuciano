const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        last_name: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        email_is_verified: {
            type: Boolean,
            default: false
        },
        password: {
            type: String
        },
        has_ticket: {
            type: Boolean,
            default: false
        },

        date: {
            type: Date,
            default: Date.now
        }
    },
    { strict: false }
);

module.exports = User = mongoose.model("users", UserSchema);