const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const { send } = require('express/lib/response');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const verifyToken = require('./verifyjwt')



router.get('/home', (req, res) => {
    //res.send('This is home API') // give response to localhost
    res.json({
        body: {
            message: 'bien ahi moño'
        }
    })
})  

//1. Generate a salt -> random text
//2. Hash a password -> hash(123456789, salt)

router.get('/token',(req,res)=>{
    const token = jwt.sign({_id: 123123}, process.env.SECRET);
    res.send(token) // te devuelve el token como tal conocemos
})


router.post('/add', async (req, res) => { // async function 
    // console.log("all req")
    // const schema ={
    //     name :  Joi.string().min(5).required(),
    //     email: Joi.string( ).min(5).required(),
    //     password: Joi.string().min(6).required()
    // }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    //const error= Joi.validate(req.body,schema) ---> no funciona, problemas con la libreria
    //res.send(error);

    const user = new UserModel({
        name : req.body.name,
        email: req.body.email,
        password: hashPassword,
    })

    const save = await user.save(); //como es una llamada async , ponemos el await adentro

    try{
        res.send(save);
    }catch(err){
        res.send(error)
    }

    //con esto guardas lo que recibis de la request dentro del cluster de mongo. (mongo Atlas
})

router.get('/all',verifyToken,async (req,res)=>{

    const users = await UserModel.find(); //get all from myDb

    try{
        res.send(users);
    }catch(err){
        res.send(err)
    }
})


router.get('/user/:id', async (req,res)=>{
    const id = req.params.id;
    
    const user = await UserModel.findById(id);

    try{
        res.send(user);
    }catch(err){
        res.send(err)
    }

    
})

module.exports = router;