const mongoose = require("mongoose");

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
          type: Object
        },

        ride_taker: {
            type: Object
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