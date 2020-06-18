const express = require('express');
const loginRoutes = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const manager_auth = require('./managerAuth');
const config = require('../configure.js');

const jwt = require('jsonwebtoken');



let login = require('../Models/login.model');

// admin user validation

loginRoutes.post("/", async (req, res) => {

    try {

        const { username, password } = req.body;

        const admin = await login.findOne({ username: username });

        if (username == "" || password == "")
            return res.json({ status:403,msg: "Username or Password fields are empty" });

        if (!admin)
            return res.json({ status:403,msg: "Invalid Username" });

        if (username == "" || password == "")
            return res.json({ status:403,msg: "Username or Password fields are empty" });

        if (admin['role'] !== "admin")
            return res.json({ status:403,msg: "Store admin Account is Required to Login !" });

        if (admin['is_active'] === 0)
            return res.json({ status:403,msg: "Account is Not Activated !" });

        const validate = await bcrypt.compare(password, admin.password);

        if (!validate)
            return res.json({ status:403,msg: "Password is Invalid!" });


        //jwt secret
        const token = jwt.sign({ id: admin._id }, config.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role
            },
        });


    } catch (err) {
        res.status(400).json({ msg: "Validation Error" });
        console.log("Error is ", err);
    }

});

//token validate
loginRoutes.post("/admin-token-validate", async (req, res) => {

    try {

        const token = req.body.admin_token;
        if (!token) return res.json(false);

        const validate = jwt.verify(token, config.JWT_SECRET);
        if (!validate) return res.json(false);

        const admin = await login.findById(validate.id);
        if (!admin) return res.json(false);

        return res.json(true);


    } catch (error) {
        res.status(400).json({ msg: "Validation Error" });
        console.log("Error is ", error);

    }

});



//Store Manager User Validation login

loginRoutes.post("/manager-login" ,async (req,res)=>{

    // console.log("Secret is :" , config.JWT_SECRET);

    try{
        const {username, password } = req.body;

        const manager = await login.findOne({username:username});

        if(username=="" ||password=="" )              
        return res.status(200).json({msg:"Username or Password fields are empty"});

        if(!manager)
        return res.status(200).json({msg:"Invalid Username"});

        if(username=="" ||password=="" )
        return res.status(200).json({msg:"Username or Password fields are empty"});

        if(manager['role'] !=="manager")
        return res.status(200).json({msg:"Store Manager Account is Required to Login !"});

        if(manager['is_active'] ===0)
        return res.status(200).json({msg:"Account is Not Activated !"});

        const validate = await bcrypt.compare(password, manager.password);

        if(!validate)
        return res.status(200).json({msg:"Password is Invalid!"});

       
        //jwt secret
        const token = jwt.sign({id : manager._id}, config.JWT_SECRET,{expiresIn: 500});
        res.status(200).json({
            token,
            manager :{
                id: manager._id,
                username: manager.username,
                email : manager.email,
                role : manager.role


            },
        });


    }catch(err){
        res.status(400).json({msg:"Validation Error"});
        console.log("Error is " ,err);
    }

})


//Store Manager User Session Validation by token
loginRoutes.get("/manager-token-validate" ,async (req,res)=>{

    try {

        const token = req.header('manager_token');

        console.log("validation is :" , token);
        if(!token) return res.json(false);

        const validate = jwt.verify(token,config.JWT_SECRET);
        if(!validate) return res.json(false);

        const manager = await login.findById(validate.id);
        if(!manager) return res.json(false);

        return res.json(true);

        
    } catch (error) {
        res.status(400).json({msg:"Validation Error"});
        console.log("Error is " ,error);
        
    }



})



module.exports = loginRoutes;




