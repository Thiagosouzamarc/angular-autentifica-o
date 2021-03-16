const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const consts = require('../const');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async function(req, res) {
        try {
            let u = await userModel.findOne({email: req.body.email});
            if (!u) {
                const user = new userModel(req.body);
                user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
                await user.save();
                delete user.password;
                res.status(200).json(user);
            }
            else {
                res.status(403).json({message: 'Email already registered', error: {}});
            }
         }
         catch(e) {
            res.status(500).json({message: 'Error while saving the user', error: e});
         }
        },

    login: function(req, res) {
        const password = req.body.password;
        const email = req.body.email;
        userModel.findOne({email: email}).lean().exec(function(err, user) {
            if (err) {
               return res.status(500).json({
                   message: 'Server Error', error: err
               });
            }
            const auth_err = (password == '' || password == null || !user);
            
            if (!auth_err) {
              if (bcrypt.compareSync(password, user.password)) {
                let token = jwt.sign({_id: user._id}, consts.keyJwt, {expiresIn: consts.expiresJWT});
                delete user.password;
                return res.json({...user, token: token});
              }
            }
            return res.status(404).json({
                message: 'Wrong e-mail or password'   
            })
        });

    },

    check_token: function(req, res, next) {
        const token = req.get('Authorization');

        if (!token) {
            return res.status(401).json({message: 'Token not fount'})
        }
        jwt.verify(token, consts.keyJwt, 
            (err, decoded) => { 
                if (err || !decoded) {
                    return res.status(401).json({message: 'Wrong token. Authentication error'});
                }
                next();
            }
        )
    },

    user_data: function(req, res) {
        const token = req.get('Authorization');
        jwt.verify(token, consts.keyJwt,
            (err, decoded) => {
                const id = decoded._id;
                userModel.findById(id).lean().exec(function(err, user) {
                    if (err || !user) {
                        return res.status(500).json({
                            message: 'Error when trying to fetch user data', error: err
                        })
                    }
                    let token = jwt.sign({_id: user._id}, consts.keyJwt, {expiresIn: consts.expiresJWT});
                    delete user.password;
                    return res.json({...user, token: token});
                });
            });
    }
}