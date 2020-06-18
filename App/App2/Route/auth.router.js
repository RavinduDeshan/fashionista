const jwt = require('jsonwebtoken');
const config = require('../configure.js');

const adminAuth = (req, res, location) => {

    try {
        const token = req.header('admin_token');
        //console.log("Admin Token : ", token);
        if (!token) {
            return res.status(401).json({ msg: 'Access Denied !' });
        }

        const validate = jwt.verify(token, config.JWT_SECRET);

        if (!validate) {
            res.status(401).json({ msg: "Faild Token Verification. Access Denied!" });
        }

        res.admin = validate.id;

        location();


    } catch (err) {
        res.status(500).json({ erro: err });

    }

}
module.exports = adminAuth;