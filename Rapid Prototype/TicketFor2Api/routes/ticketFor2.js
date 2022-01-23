const express = require('express')
const router = express.Router()
const passport = require("passport");
const {getRides, createRide, updateRide, getRide, getRidesByLocation} = require("../controllers/ride");
const {getDeparturesInLocation, getLinePath} = require("../controllers/departure");
const {getChatByRideId, createChat, updateChatByRideId} = require("../controllers/chat");


router.post("/signup", (req, res, next) => {
    passport.authenticate("local-signup", (err, user, info) => {
        if (err) {
            return res.status(400).json({errors: err});
        }

        if (!user) return res.status(400).json({message: "user already taken or some other problem"})

        return res.status(200).json({success: `Registered ${user.id}`});

    })(req, res, next);
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local-login", function (err, user, info) {
        if (err) {
            return res.status(400).json({errors: err});
        }
        if (!user) {
            return res.status(400).json({errors: "No user found"});
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).json({errors: err});
            }
            return res.status(200).json({result: user});
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    return res.status(200).json({success: `logged out`});
});

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    return res.status(400).json({message: "You need to be logged in"})
}

// Rides

router.get('/rides', isLoggedIn, getRides);
router.get('/ride/:id', isLoggedIn, getRide)
router.get('/ridesByLocation', isLoggedIn, getRidesByLocation)
router.post('/ride', isLoggedIn, createRide);
router.put('/ride/:id', isLoggedIn, updateRide);

// Stations/Departures
router.get('/departures', isLoggedIn, getDeparturesInLocation)
router.get('/line-path/:lineName', isLoggedIn, getLinePath)

// Chat
router.get('/chat/:rideId', isLoggedIn, getChatByRideId)
router.post('/chat', isLoggedIn, createChat)
router.put('/chat/:rideId', isLoggedIn, updateChatByRideId)



module.exports = router

