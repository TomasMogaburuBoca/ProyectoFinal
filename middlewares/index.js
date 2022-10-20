require('dotenv').config();

const authMiddleware = (req, res, next) =>{
    if(req.headers.rol == 'admin'){
        next();
    }else res.send("It's no authorized");
}

module.exports = { authMiddleware }