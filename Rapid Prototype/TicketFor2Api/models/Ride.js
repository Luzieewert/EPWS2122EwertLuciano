const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema(
    {
        lineName: {
            type: String
        },

        direction: {
            type: String
        },

        name: {
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
            type: String
        },

        ride_end: {
            type: Date
        },

        ride_giver: {
            type: Object
        },

        ride_giver_end_station: {
            type: String
        },
        ride_taker_end_station: {
            type: String
        },

        ride_taker: {
            type: Object
        },

        ride_status: {
            type: String,
            default: "Created"
        },

        date: {
            type: Date,
            default: Date.now
        }
    },
    {strict: true}
);

module.exports = Ride = mongoose.model("rides", RideSchema);