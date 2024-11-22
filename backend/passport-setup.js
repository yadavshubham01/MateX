const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user"); // Adjust path as necessary
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("./config");

passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID ,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://matex.onrender.com/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists in our db
      let existingUser  = await User.findOne({ googleId: profile.id });
      if (existingUser ) {
        return done(null, existingUser );
      }

      // If not, create a new user in our db
      const newUser  = await new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        profileImage: profile.photos[0].value
      }).save();
      done(null, newUser );
    } catch (err) {
      done(err, null);
    }
  }
));

passport.serializeUser ((user, done) => {
  done(null, user.id);
});

passport.deserializeUser ((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});