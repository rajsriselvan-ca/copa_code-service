const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next)=>{
    req.user = {username:null, verified:false}
    const { JWT_ACCESS_KEY } = process.env
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader!=='undefined') {
      jwt.verify(bearerHeader, JWT_ACCESS_KEY, function (err,data){
        if(! (err && typeof data=== 'undefined')) {
          req.user = {username:data.username, verified:true}
          next()
        } else {
            return res.sendStatus(err)
          }
      })
    }
   }