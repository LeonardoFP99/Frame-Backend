import express from 'express';
import userRoute from './src/routes/user.route.js';
import connectDatabase from './src/database/db.js';
import { PORT } from './config.js';

const app = express();

connectDatabase();
app.use(express.json());
app.use('/user', userRoute);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));