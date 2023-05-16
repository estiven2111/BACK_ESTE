const isAuthGoogle = (req, res, next) => {
    console.log(req.user);
    if(req.user) {
        next();
    } else {
        res.status(401).json({message: "You are not logged in"});
    }
  }

module.exports = isAuthGoogle