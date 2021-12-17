const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema(
    {
        start_station_name: {
            type: String
        },

        start_station_cords: {
            type: Object
        },


        end_station_name: {
            type: String
        },

        end_station_cords: {
            type: Object
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