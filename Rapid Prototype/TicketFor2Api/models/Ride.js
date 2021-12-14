const mongoose = require("mongoose");
const User = require("../models/Users");

const RideSchema = new mongoose.Schema(
    {
        start_station: {
            type: String
        },

        end_station: {
            type: String
        },

        ride_start: {
            type: Date
        },

        ride_end: {
            type: Date
        },

        ride_giver: {
          type: User
        },

        ride_taker: {
            type: User
        },

        ride_status: {
            type: String,
            default: "0"
        },

        date: {
            type: Date,
            default: Date.now
        }
    },
    { strict: true }
);

module.exports = Ride = mongoose.model("rides", RideSchema);