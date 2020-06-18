const express = require('express');
const usersRoutes = express.Router();
const session = require('express-session');
const bcrypt = require('bcrypt');
let Users = require('../Models/users.model');
const loginauth = require('../Route/userLoginAuth.router');
const adminAuth = require('./auth.router.js');
const manager_auth = require('./managerAuth.js');

usersRoutes.get('/', adminAuth, (req, res) => {
    Users.find(function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

usersRoutes.get('/managerlist',manager_auth, (req, res) => {
    Users.find(function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});


//view all users
usersRoutes.route('/userlist').get(function (req, res) {
    if (session.user === null || session.user === '' ) {
        return;
    }
    Users.find(function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});



//add a new user - method 1
usersRoutes.post("/register", async(req,res) =>{
    try{
    let {name,address, email,username,password,passwordCheck,phone}
=req.body;

    ///validations
    if( !email || !username || !password || !passwordCheck)
        return res.status(400).json({msg: "Enter all the fields"});
    if(password !== passwordCheck)
        return res
            .status(400)
            .json({msg: "Enter the same password twice"});


    const existingUser = await Users.findOne({username: username});
    if(existingUser)
        return res.status(400)
            .json({msg:" Username already exists." });

    if(!name)
        name=username;

    const salt = await bcrypt.genSalt();
    const passwordHash = await  bcrypt.hash(password,salt);

    const newUser = new Users({
        name,
        address,
        email,
        username,
        password : passwordHash,
        phone
    });
 const savedUser = await newUser.save();
  res.json(savedUser);

    }catch(err){
    res.status(500).json({err: err.message});
}
});


// add a new user - method 2
usersRoutes.route('/add').post(function (req,res) {
    let user = new Users(req.body);
    user.save()
        .then(user =>{
            res.status(200).json({'Message':'successful'});
        }).catch(err =>{
        res.status(400).send('fail');
    });
});




//view user by id
    usersRoutes.get('/:id',(req,res)=>{
        Users.findById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.status(400).json('Error: '+err));
    });


//delete a user
usersRoutes.delete('/delete', loginauth, async (req,res) =>{
    try{
    const deletedUser = await Users.findByIdandDelete(req.user);
    return res.json(deletedUser);
} catch(err){
        res.status(500).json({err: err.message});
    }
});

//update user- method 1
    usersRoutes.route('/update/:id').post(function (req, res) {
        if (session.user === null || session.user === '') {
            return;
        }
        Users.findById({ _id: req.params.id }, function (err, Users) {
            try{
                    console.log(req.body.username);

                    Users.name = req.body.name;
                    Users.address = req.body.address;
                    Users.email = req.body.email;
                    Users.username = req.body.username;
                    //update password if only is set user input
                    if (req.body.password) {
                        Users.password = req.body.password;
                    }
                    Users.phone = req.body.phone;
        
                    Users.save().then(Users => {
                        res.json({ 'message': 'User is updated', 'status': 200 });
                    })
                        .catch(err => {
                            res.json({ 'message': 'Unable to update User', 'status': 200 });
                        });
                }catch(err){
                    res.status(400).json('Error: '+err);
                } 
            });
    
        });

//update user - method 2
usersRoutes.route('/update/:id/:name/:address/:email/:username/:password/:phone').get(function (req, res) {
    console.log("update function called");
    let id = req.params.id;
    let name=req.params.name;
    let address=req.params.address;
    let email=req.params.email;
    let username=req.params.username;
    let password=req.params.password;
    let phone=req.params.phone;

    console.log("**" + id);
    console.log("**" + name);
    console.log("**" + address);
    console.log("**" + email);
    console.log("**" + username);
    console.log("**" +password);
    console.log("**" + phone);

    Users.updateOne({_id : id},{$set: {name :name, address: address,email: email, username:username, password: password, phone: phone }}).then(user=>{
        console.log(" successfully updated user");
        console.log(user);
        res.status(200).json({'userUpdate':'successful'});
    }).catch(err=>{
        console.log("update fail");
        res.status(400).send('fail');
    });
});

//delete user - method 2
usersRoutes.route('/delete/:id').get(function (req, res) {
    let id=req.params.id;
    console.log("Delete called!");
    Users.deleteOne({_id:id}).then(user=>{
        console.log("successful");
        res.status(200).json({'userDelete':'successful'});
    }).catch(err=>{
        console.log("fail");
        res.status(400).send('fail');
    });
});

module.exports = usersRoutes;
