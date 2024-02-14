const express = require("express");
const userRoute = require('./src/routes/user.route');
const app = express();
const connectDatabase = require('./src/database/db');

require('dotenv').config()
connectDatabase();
app.use(express.json());
app.use('/user', userRoute);
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}...`));