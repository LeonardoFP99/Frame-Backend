import mongoose from 'mongoose';
import { DBURL } from '../../config.js';

const connectDatabase = () => {
  console.log("Trying to connect to the database...");
  mongoose
    .connect(DBURL)
    .then(() => console.log("Successfully connected to the database"))
    .catch((error) =>
      console.log(`Error during connection to the databse: ${error.message}`)
    );
};

export default connectDatabase;
