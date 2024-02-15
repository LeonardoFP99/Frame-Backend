import mongoose from 'mongoose';
import 'dotenv/config'

const connectDatabase = () => {
  console.log("Trying to connect to the database...");
  mongoose
    .connect(process.env.DBURL)
    .then(() => console.log("Successfully connected to the database"))
    .catch((error) =>
      console.log(`Error during connection to the databse: ${error.message}`)
    );
};

export default connectDatabase;
