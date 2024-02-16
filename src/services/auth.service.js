import User from "../models/User.js";

const loginService = async (email) =>
  await User.findOne({ email: email }).select("+password");

export { loginService };
