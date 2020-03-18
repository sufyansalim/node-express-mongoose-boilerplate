const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');

const app = express();

//Connect Database
connectDB();

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./src/middleware/passport')(passport);


//Init Middleware
app.use( express.json({extended:false}) );

//Routes
app.use('/', require('./src/routes/api/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`));