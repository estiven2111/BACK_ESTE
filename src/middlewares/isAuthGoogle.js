const jwt = require("jsonwebtoken");
require("dotenv").config();
const isAuthGoogle = (req, res, next) => {

        console.log(' ---------------- console log de ISAUTHGOOGLE ------------- ' ,req.user)
    if(req.user) {
        next();
    } else {
        res.status(401).json({message: "You are not logged in",user:`el req es ${req.user}`});
    }

    // const autHeader = req.get("Authorization");
   
    // if (autHeader) {
    //   //obtener el token
    //   const token = autHeader.split(" ")[1];
    //   console.log(token);
     
    //   // comprobar el JWT
      
    //   try {
    //     const user = jwt.verify(token, process.env.JWT_SECRET);
  
    //       console.log(user);

    //     //   if(!userById) {
    //     //     res.json('error')
    //     //   } else {
    //     //     req.user = userById

    //     //   }
    //   } catch (error) {
    //     console.log(error)
      
    //   }
    // }
  
    //   return next()
  }

module.exports = isAuthGoogle