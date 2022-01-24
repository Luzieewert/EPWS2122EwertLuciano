const RideUsersLocation = require("../models/RideUsersLocation");

const getCurrentRideLocations = (req, res) => {
    const {rideId} = req.params
    RideUsersLocation.findOne({rideId: rideId}, null, null, (err, locations) => {
        if (err) res.send(err)
        else res.status(200).json({result: locations});
    })
}

const createCurrentRideLocations = (req, res) => {
    const newRideLocations = new RideUsersLocation({...req.body})
    newRideLocations.save()
        .then((locations) => {
            console.log(locations)
            return res.status(200).json({result: locations});
        })
        .catch(err => {
            return console.log(err)
        });
}

const updateCurrentRideLocations = (req, res) => {
    const {rideId} = req.params
    RideUsersLocation.findOneAndUpdate({rideId: rideId},{...req.body}, {new: true}, (err, locations) => {
        if (err) res.send(err)
        else res.status(200).json({result: locations});
    })

}

module.exports = {getCurrentRideLocations, createCurrentRideLocations, updateCurrentRideLocations}