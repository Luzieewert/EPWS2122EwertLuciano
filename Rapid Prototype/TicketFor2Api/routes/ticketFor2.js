const express = require('express')
const router = express.Router()
const passport = require("passport");


router.post("/signup", (req, res, next) => {
    passport.authenticate("local-signup", (err, user, info) => {
        if (err) {
            return res.status(400).json({ errors: err });
        }

        if(!user) return res.status(400).json({message: "user already taken or some other problem"})

        return res.status(200).json({ success: `Registered ${user.id}` });

    })(req, res, next);
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local-login", function(err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ user: user });
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn ,(req, res) => {
    req.logOut();
    return res.status(200).json({ success: `logged out` });
});

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    return res.status(400).json({message: "You need to be logged in"})
}





module.exports = router

