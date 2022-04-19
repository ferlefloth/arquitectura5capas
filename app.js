const express = require('express') ;
const mongoose = require('mongoose') ;
const dotenv = require('dotenv'); 
const userRoutes = require('./routes/user.js') 
const routes = require('./routes/index.js')

const createApp = ()=>{
    const app = express();
    app.use(express.json())
    
    mongoose.connect('mongodb+srv://mello:123@cluster0.r7qsm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true },()=>{
        console.log('DatabaseConnected')
    })

    //routes
    app.use('/api', routes.api) // se puede usar como app.use('/api/', userRoutes) --->localhost:3000/api/home; Se puede usar muchas rutas para distintas funcionalidades
   // app.use('/api/auth', authRoutes);
    
    return app
}
module.exports = createApp;