const { Artist } = require("../db")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { artistById } = require("../Controllers/artistControllers/artistById")
const generateJWT = require("../../utils/generateJWT")
const { URL_BACK } = require("../env")
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${URL_BACK}/artist/auth/google/callback`,
      // callbackURL: "https://pruebaback-production-0050.up.railway.app/artist/auth/google/callback",

      scope: ['profile', 'email'],
      authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
      tokenURL: 'https://accounts.google.com/o/oauth2/token',
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log("tokengoogle", req.query.code)
      console.log("req.user", req.user)
      console.log("profile", profile)
      const newArtist = await Artist.findOne({
        where: {
          email: profile._json.email,
        }
      })

      if (newArtist) {
        const artist = await artistById(newArtist.id)
        // artist.token =  generateJWT(artist.id, artist.name)
        req.user = artist
        done(null, req.user)
      } else {

        const artistByGoogle = await Artist.create({

          name: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile._json.email,
          nickName: profile.name.familyName.substring(0, 3) + profile.name.givenName.substring(0, 3) + Math.floor(Math.random() * 1000),
          password: '',
          profilePhoto: profile._json.picture
        })

        // artistByGoogle.token = generateJWT(artistByGoogle.id, artistByGoogle.name);
        req.user = artistByGoogle
        await artistByGoogle.save();
        console.log("req.user", req.user)
        done(null, req.user)

      }
    }
  ));


passport.serializeUser((artist, done) => {
  done(null, artist.id);
});

passport.deserializeUser(async (id, done) => {
  const artist = await Artist.findByPk(id).catch((err) => {
    done(err, null)
  });
  if (artist) done(null, artist);
});


module.exports = passport

// passport.use("google", new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: `${process.env.BACKEND_URL}/user/auth/google/callback`,
//   scope: ["profile", "email"],
//   authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
//   tokenURL: 'https://accounts.google.com/o/oauth2/token',
//   passReqToCallback: true
// }, async function (req, accesToken, refreshToken, profile, done) {




//   const newUser = await User.findOne({
//     where: {
//       email: profile._json.email,

//     },
//     paranoid: false
//   })
//   // console.log("arreglando con colsole log ", newUser)


//   if (newUser?.dataValues?.deletedAt) {
//     done("Esta cuenta esta baneada")
//     return
//   }

//   if (newUser) {
//     const user = await userByID(newUser.id)
//     user.token = generateJWT(user.id, user.user_name)
//     done(null, user)
//   } else {

//     const userByGoogle = await User.create({

//       name: profile.name.givenName,
//       last_name: profile.name.familyName,
//       user_name: profile.name.familyName.substring(0, 3) + profile.name.givenName.substring(0, 3) + Math.floor(Math.random() * 1000),
//       email: profile._json.email,
//       profile_img: profile._json.picture,
//       confirmed: true,
//       password: ''
//     })
//     userByGoogle.token = generateJWT(userByGoogle.id, userByGoogle.user_name)
//     done(null, userByGoogle)

//   }

// }))



// module.exports = { passport }
