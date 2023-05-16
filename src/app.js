const express = require("express");
const morgan = require("morgan");
const fileupload = require("express-fileupload")
const cors = require("cors")
const mainRouter = require("./routes/index");
const passport = require("passport");
const session = require('express-session');
const {URL_FRONT} = require("../src/env")


const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan("dev"));
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 
    }
  }));
  //? inicializar el modulo passport
app.use(passport.initialize());
app.use(passport.session());
// const optionCors ={
//   origin:URL_FRONT,
//   methods:'GET, POST, OPTIONS, PUT, DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials:true

// }

//  app.use(cors(optionCors))

 app.use((req, res, next) => {
  //http://localhost:3000 https://pi-web-git-main-estiven2111.vercel.app/   https://pi-lqaa7gh3w-estiven2111.vercel.app  https://pi-dovldixrv-estiven2111.vercel.app/
  res.header('Access-Control-Allow-Origin', `${URL_FRONT}`); // (*)update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// app.use(fileupload({
//     useTempFiles: true,
//     tempFileDir: "./uploads" // crea una carpeta temporal ponemos la que queramos crear
// }))
app.use(mainRouter);

module.exports = app;