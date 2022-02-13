const mongoose = require("mongoose");

const RideUsersLocationSchema = new mongoose.Schema(
    {
        rideId: {
            type: String,
            required: true
        },
        ride_giver: {
            type: Object,
        },
        ride_taker: {
            type: Object,
        }
    },
    {strict: true}
);

module.exports = RideUsersLocation = mongoose.model("rideUsersLocations", RideUsersLocationSchema);