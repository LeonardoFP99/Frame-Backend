import bcrypt from "bcrypt";
import { loginService } from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginService(email);

    if(!user){
        return res.status(401).send({message: "Invalid credentials"});
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if(!passwordIsValid){
        return res.status(401).send({message: "Invalid credentials"});
    }

    res.status(200).send("Login ok");
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export { login };
