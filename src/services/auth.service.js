import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { SECRET_JWT } from "../../config.js";

const loginService = async (email) =>
  await User.findOne({ email: email }).select("+password");

const generateToken = (id) =>
  jwt.sign({ id: id }, SECRET_JWT, { expiresIn: 86400 });

export { loginService, generateToken };
