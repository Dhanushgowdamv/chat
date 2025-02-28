import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

function connect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected to mongo");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connect;



// username :dhanushvenu199
// Passwprd : CzryncYT8hgfHYpM