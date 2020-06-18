const jwt = require('jsonwebtoken');
const config = require('../configure.js');


const loginauth = (req,res,next) =>{

    try{
        const token = req.header("login-auth-token");

        if(!token)
            return res.status(401).json({msg:'"No authentication token. Authorization denied !'});

        const verified = jwt.verify(token,config.JWT_SECRET);
        if(!verified)
            return res
                .status(401)
                .json({msg:"Token verification failed. Authorization denied"});

        res.user = verified.id;

        next();


    }catch(err){
        res.status(500).json({error : err});

    }

};
module.exports = loginauth;
