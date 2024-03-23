import express from 'express';
import connectDatabase from './src/database/db.js';
import { PORT } from './config.js';
import cors from 'cors';

import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import articleRoute from './src/routes/article.route.js';

const app = express();
connectDatabase();
app.use(express.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/article', articleRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));