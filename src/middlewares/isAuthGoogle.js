const isAuthGoogle = (req, res, next) => {
    console.log("este es isAutGoogle",req.user);
    // res.json({isauthdevuelve:req})
    if(req.user) {
        next();
    } else {
        res.status(401).json({message: "You are not logged in",user:`el req es ${req.user}`});
    }
  }

module.exports = isAuthGoogle