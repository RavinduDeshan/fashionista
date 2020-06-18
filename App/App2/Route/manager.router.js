// Manager.route.js

const express = require('express');
const ManagerRoutes = express.Router();
const bodyParser = require('body-parser'); //Read body
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const session = require('express-session');
const adminAuth = require('./auth.router.js');
// Require Manager model in our routes module
let login = require('../Models/login.model');



async function hashPassword(pass) {

    try {
        let password = pass
        const round = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, round);
        // let saltRounds = 10;

        // let hashedPassword = await new Promise((resolve, reject) => {
        //     bcrypt.hash(password, 10, function (err, hash) {
        //         if (err) reject(err)
        //         resolve(hash)
        //     });
        // })

        return hashedPassword

    } catch (err) {
        console.log(err)
    }

}

//Send a activation mail
function sendMail(mailOptions) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ptester473@gmail.com',
            pass: 'alpha@123'
        }
    });


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


// //manager login
// ManagerRoutes.route('/login').post(function (req, res) {

//     const postBody = req.body;

//     let user = postBody['username'];
//     let pass = postBody['password'];

//    // console.log(user); return;

//     login.findOne({ username: user }, function (err, login) {


//         if (err) {
//             console.log(err);
//         }
//         else {

//             try {

//                 if (login !== null) {
//                     let db_user = login['username'] !== null ? login['username'] : '';
//                     let db_pass = login['password'] !== null ? login['password'] : ''; //password hash
//                     let db_id   = login['id'] !== null ? login['id'] : '';
//                     let db_role = login['role'] !== null ? login['role'] : '';


//                     bcrypt.compare(pass, db_pass, function (err, response) {
//                         if (err) {
//                             console.log(err);
//                         } else {
//                             if (response === true) {
//                                 session.user = db_user;
//                                 session.role = db_role;
//                                 res.json(true);
//                             } else {
//                                 console.log("Invalid Username");
//                                 res.json(false);
//                             }
//                         }
//                     })

//                 } else {
//                     console.log("Invalid Username");
//                     res.json(false);
//                 }

//             } catch (error) {
//                 console.log(error);
//             }


//         }
//     });

// });




// Add new manager
ManagerRoutes.post('/add',adminAuth,(req, res) => {

    //Validate user input
    function validate(){
        res.status(400).json({ 'message': 'You must fill all fields in form' });
        return;
    }

    req.body['username'] == '' || req.body['password'] == '' ? validate() : null;

    login.find({username : req.body['username']},function (err, managers) {
        if (err) {
            console.log(err);
        } else {

            if (managers.length == 0) {

                login.find({ email: req.body['email'] }, function (err, managers2) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(managers2);
                        if (managers2.length == 0) {
                            hashPassword(req.body.password).then(function (hash) {

                                let _p = req.body.password;

                                req.body.role = 'manager';
                                req.body.password = hash;
                                req.body.is_active = 0;

                                let Manager = new login(req.body);
                                Manager.save()
                                .then(Manager => {
                                    res.status(200).json({ 'message': 'Manager added successfully', 'status': 200 });

                                    mailOptions = {
                                        from: 'ptester473@gmail.com',
                                        to: req.body.email,
                                        subject: 'Activate Your Account',
                                        text: 'http://localhost:4000/managers/activate/'+req.body.email + " username : " + req.body.username + " , password : " + _p,
                                        html: 'Please Activate Your Store Manager Account From Here <a class="btn btn-success" href="http://localhost:4000/managers/activate/'+req.body.email+'">Activate</a><br/> and after that <a class="btn btn-success" href="http://localhost:3000/manager-Sign-In">Log in</a>. Please Bookmark your Log In Page for future refferences', // html body
                                    }


                                    sendMail(mailOptions);
                                })
                                .catch(err => {
                                    res.status(400).json({ 'message': 'Unable to save Manager', 'status': 400 });
                                });
                            });
                        } else {
                            res.json({ 'message': 'This email already in this system', 'status': 400 });
                        }
                    }

                });


            } else {
                res.json({ 'message': 'This username has been taken already', 'status': 400 });
            }
       }
    });


});

// Get all managers to display
ManagerRoutes.route('/').get(function (req, res) {

        //login.find({role:'manager'},function (err, managers) {
            login.find(function(err, managers){
            if (err) {
                console.log(err);
            }
            else {
                res.json(managers);
            }
        });
    });



// Get data for edit
//ManagerRoutes.route('/edit/:id').get(function (req, res) {
ManagerRoutes.get('/edit/:id',adminAuth,(req,res)=>{
    let id = req.param.id;

    login.findById({ _id: req.params.id }, function (err, Manager) {
        if (err) {
            console.log(err)
        } else {
            res.json(Manager);
        }
    });
});

// Update manager info
ManagerRoutes.post('/update/:id',adminAuth,(req, res)=>{

    login.findById({ _id: req.params.id }, function (err, Manager) {

        if (err) {
            console.log(err)
        } else {
            if (!Manager) {
                res.json({'message':'Manager not found','status':400});
            } else {

                console.log(req.body.username);

                Manager.username = req.body.username;
                Manager.is_active = req.body.is_active;
                Manager.email = req.body.email;
                //update password if only is set user input
                if (req.body.password) {
                    Manager.password = req.body.password;
                }

                Manager.save().then(Manager => {
                    res.json({ 'message': 'Manager updated', 'status': 200 });
                })
                    .catch(err => {
                        res.json({ 'message': 'Unable to update Manager', 'status': 200 });
                    });
            }
        }

    });
});

// Delete manager
ManagerRoutes.get('/delete/:id',adminAuth,(req, res)=> {

    login.findByIdAndRemove({ _id: req.params.id }, function (err, Manager) {
        if (err) {
            res.json(err)
        } else {
            res.json({ 'message': 'Manager deleted', 'status': 200 });
        };
    });
});

//Activate account

// Update manager info
ManagerRoutes.route('/activate/:email').get(function (req, res) {
    login.findOne({ email: req.params.email }, function (err, Manager) {
        if (err) {
            console.log(err);
            res.json("Unable to activate this account.");
        } else {
            if (!Manager) {
                res.json("This account not found");
            } else {

                Manager.is_active = 1;

                Manager.save().then(Manager => {
                    res.json("Account activated successfully.");

                }).catch(err => {
                    res.json("Unable to activate this account.");
                    console.log(err);
                });
            }
        }

    });
});

module.exports = ManagerRoutes;
