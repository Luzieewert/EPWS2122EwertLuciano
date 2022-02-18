const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
    {
        rideId: {
            type: String,
            required: true,
            unique: true
        },

        messages: {
            type: Array,
            default: []
        }
    },
    { strict: false }
);

module.exports = Chat = mongoose.model("chats", ChatSchema);