import { SECRET_JWT } from "./../../config.js";
import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.send(401);
    }

    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (parts.length !== 2) {
      return res.send(401);
    }

    if (schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(token, SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Invalid token" });
      }
      const user = await userService.findByIdService(decoded.id);

      if (!user || !user._id) {
        return res.status(401).send({ message: "Invalid token" });
      }

      req.userId = user._id;

      return next();
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
