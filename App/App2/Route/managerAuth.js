const jwt = require('jsonwebtoken');
const config = require('../configure.js');

//validate authentication

const auth = (req,res,location) =>{

    try{
        const token = req.header('manager_token');
        console.log("Token is in auth : " , token);

        if(!token)
        return res.status(401).json({msg:'Access Denied !'});
        
        const validate = jwt.verify(token,config.JWT_SECRET);


        if(!validate)
        res.status(401).json({msg:"Faild Token Verification. Access Denied!"});

        res.manager = validate.id;

        location();


    }catch(err){
        res.status(500).json({erro : err});

    }

}
module.exports = auth;