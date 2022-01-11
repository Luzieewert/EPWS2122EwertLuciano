const Ride = require("../models/Ride");

const getRides = ((req,res) => {
    return res.send("Read To be implemented")
})

const getRide = ((req,res) => {
    Ride.findById(req.params.id, null,null,(err,ride) => {
            if(err) res.send(err)
            else res.status(200).json({ ride: ride });
        })
})

const getRideByStation = ((req,res) => {
    Ride.findOne({start_station_name: req.params.station},null,{sort: {date: -1}},(err,result) => {
        if(err) res.send(err)
        else res.send(result)
    })
})

const createRide = ((req,res) => {
    const newRide = new Ride({...req.body})
    newRide.save()
        .then((ride) => {
            return res.status(200).json({ ride: ride });
        })
        .catch(err => {
            return console.log(err)
        });
})

const updateRide = ((req,res) => {
    Ride.findByIdAndUpdate(req.params.id, {...req.body},{new: true},
        (err,ride) => {
        if(err) res.send(err)
        else res.status(200).json({ride: ride })
    })
})

module.exports = {getRides,getRide,createRide,updateRide, getRideByStation}