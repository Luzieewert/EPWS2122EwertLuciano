const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local-signup',
    new LocalStrategy({ usernameField: "email", passReqToCallback: true }, (req, email, password, done) => {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    return done(null, false);
                } else {
                    const {has_ticket,name, last_name } = req.body
                    const newUser = new User({ email, password, has_ticket, name, last_name });
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    return done(null, false, { message: err });
                                });
                        });
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

passport.use('local-login',
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return done(null, false);
                } else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

    module.exports = passport;