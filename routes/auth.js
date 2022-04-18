const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res)=>{
   
    const user = await UserModel.findOne({email: req.body.email}) //buscamos por un campo específico
    if(!user) return res.send("Invalid email!")
    
    const passVerification =await  bcrypt.compare(req.body.password, user.password) //chequeamos si la password que mandas en la req se condice con la pass qeu está en la bdd
   
    if(passVerification) return (res.send('invalid password'))
    
    const token = jwt.sign({_id: user._id}, process.env.SECRET);
   
    res.json({
        body:{
            user: user,
            token:token,
        }
    })
})

module.exports = router;