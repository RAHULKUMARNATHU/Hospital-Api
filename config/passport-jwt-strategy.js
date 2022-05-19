const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

const ExtractJWT = require("passport-jwt").ExtractJwt;

const Doctor = require("../models/doctor");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "hospital",
};
passport.use(
  new JWTStrategy(opts, async (jwtPayload, done) => {
    try {
      const doctor = await Doctor.findById(jwtPayload._id);
      if (doctor) {
        return done(null, doctor);
      }
      return done(null, false);
    } catch (error) {
      console.log("error ", error);
      return res.status(500).json({
        message: "internal server error",
        error,
      });
    }
  })
);

passport.serializeUser((doctor, done) => {
  return done(null, doctor.id);
});

passport.deserializeUser((id, done) => {
  Doctor.findById(id, (err, doctor) => {
    if (err) {
      console.log("Error in finding user in passport");
      return done(err);
    }
    return done(null, doctor);
  });
});

passport.checkAuthenticated = (req, res, next) => {
  // if user is signed in, then pass on the req to next action
  if (req.isAuthenticated()) {
    return next();
  }

  // if user is not signed in
  return res.status(401).json({
    message: "Unauthorized",
  });
};

module.exports = passport;
