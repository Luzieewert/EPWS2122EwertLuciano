const Ride = require("../models/Ride");
const {getHaversineDistanceM} = require("../utils/location");

const getRides = ((req, res) => {
    return res.send("Read To be implemented")
})

const getRide = ((req, res) => {
    Ride.findById(req.params.id, null, null, (err, ride) => {
        if (err) res.send(err)
        else res.status(200).json({result: ride});
    })
})

const getRideByUserId = ((req, res) => {
    const {userId} = req.params
    Ride.findOne({
        ride_status: {$ne: "Completed"},
        $or: [
            {"ride_giver._id": userId},
            {"ride_taker._id": userId},
        ]}, null, { sort: { date: -1 } }, (err, ride) => {
        if (err) res.send(err)
        else res.status(200).json({result: ride});
    })
})

const getRidesByLocation = ((req, res) => {
    const {radius, location} = req.query
    Ride.find({ride_status: "Created"}, (err, rides) =>{
        const result = rides.filter(ride => getHaversineDistanceM(JSON.parse(location),ride.start_station_cords) < radius)

       return res.status(200).json({result: result})
    })
})

const createRide = ((req, res) => {
    const newRide = new Ride({...req.body})
    newRide.save()
        .then((ride) => {
            return res.status(200).json({result: ride});
        })
        .catch(err => {
            return console.log(err)
        });
})

const updateRide = ((req, res) => {
    Ride.findByIdAndUpdate(req.params.id, {...req.body}, {new: true},
        (err, ride) => {
            if (err) res.send(err)
            else res.status(200).json({result: ride})
        })
})

module.exports = {getRides, getRide, createRide, updateRide, getRidesByLocation, getRideByUserId}