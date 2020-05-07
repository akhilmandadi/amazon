"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const admin = require('../db/schema/admin').createModel();
const seller = require('../db/schema/seller').createModel();
const customer = require('../db/schema/customer').createModel();

function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const _id = jwt_payload._id;
            const model = (jwt_payload.persona === "customer" ? customer : seller)
            if (jwt_payload.persona === "admin") return callback(null, { "email": "admin@amazon.com" });
            model.find({ _id }, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
