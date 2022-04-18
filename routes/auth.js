const express = require('express');
const router = express.Router();

const UserModel = require('../models/User');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');

router.post('/login', async (req, res)=>{
    //1 - verify email
    //2- pass verifivation -> return response;
    console.log('req.body:' + JSON.stringify(req.body))
    const user = await UserModel.findOne({email: req.body.email}) //buscamos por un campo específico
    if(!user) return res.send("Invalid email!")
    
    console.log('el user password:' + user.password + "y el req.body.password:" + req.body.password)

    const passVerification =await  bcrypt.compare(req.body.password, user.password) //chequeamos si la password que mandas en la req se condice con la pass qeu está en la bdd
    if(!passVerification) return (res.send('invalid password'))
    
    const token = jwt.sign({_id: user._id}, process.env.SECRET);
    res.json({
        body:{
            user: user,
            token:token,
        }
    })


    res.send(passVerification);

})

module.exports = router;