const jwt = require('jsonwebtoken');
const dotenv = require('dotenv/config')

const verifyToken = (req,res,next)=>{
    const token = req.headers['acces-token'];
    if(!token) return res.send('Access denied')
    
    try{
        const verify = jwt.verify(token,process.env.SECRET)
        req.user = verify;
        next() // el next da la posibilidad de seguir la ejecución

    }catch(err){
        res.status(401).send('Invalid Access Token')
    }
}

module.exports = verifyToken;