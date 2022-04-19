const  createApp = require('./app.js')

const app = createApp()
//listening server
app.listen('3000', () => {
console.log('Server is running succesfully! :D ')
});


