import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"], // Name must be provided
    trim: true,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [50, "Name must not exceed 50 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be contain atleast 6 character long"],
    maxLength: [65, "Email must not be longer than 65 charater"],
  },

  password: {
    type: String,
    select: false,
  },
 

});
 

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ email: this.email, name: this.name, id: this._id }, process.env.JWT_SCERET, {
      expiresIn: "24h",
    });
  };
  

const User = mongoose.model("user", userSchema);

export default User;
