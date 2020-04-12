var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const { secret } = require('./setting');


// Setup work and export for the JWT passport strategy
function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwtPayload, callback) => {
      console.log(jwtPayload)
      if (jwtPayload.customer_mail) {
        const mail = jwtPayload.customer_mail;
        console.log("In Helpers");
        console.log(jwtPayload);
        customer.findOne({ customer_mail : mail }, (err, results) => {
          if (err) {
            return callback(err, false);
          }
          if (results) {
            callback(null, results);
          } else {
            callback(null, false);
          }
        });
      }
      else if (jwtPayload.seller_mail) {
        const mail = jwtPayload.seller_mail
        seller.findOne({seller_mail : mail }, (err, results) => {
          if (err) {
            return callback(err, false);
          }
          if (results) {
            callback(null, results);
          } else {
            callback(null, false);
          }
        });
      }
      else if (jwtPayload.admin_mail) {
        const mail = jwtPayload.admin_mail
        console.log("In Helpers");
        console.log(jwtPayload);
        admin.findOne({ admin_mail : mail }, (err, results) => {
          if (err) {
            return callback(err, false);
          }
          if (results) {
            callback(null, results);
          } else {
            callback(null, false);
          }
        });
      }
    }),
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
