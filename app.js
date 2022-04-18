const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv')
app.use(express.json())


const userRoutes = require('./routes/user');
app.use('/api/', userRoutes) // se puede usar como app.use('/api/', userRoutes) --->localhost:3000/api/home; Se puede usar muchas rutas para distintas funcionalidades

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//creating a server 
app.listen('3000', () => {
    console.log('Server is running succesfully! :D ')
});

mongoose.connect('mongodb+srv://mello:123@cluster0.r7qsm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true },()=>{

    console.log('DatabaseConnected')
    
}) //put pass, project: myFirstDatabase
