const Ride = require("../models/Ride");

const getRides = ((req,res) => {
    return res.send("Read To be implemented")
})

const createRide = ((req,res) => {
    const newRide = new Ride({...req.body})
    newRide.save()
        .then((ride) => {
            return res.status(200).json({ success: `Ride Created ${ride}` });
        })
        .catch(err => {
            return console.log(err)
        });
})

const updateRide = ((req,res) => {
    Ride.findByIdAndUpdate(req.params.id, {...req.body},{new: true},
        (err,result) => {
        if(err) res.send(err)
        else res.send(result)
    })
})

module.exports = {getRides,createRide,updateRide}