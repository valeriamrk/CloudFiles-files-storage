import jwt from "jsonwebtoken";
import { secret } from "../config/config.js";

const roleMiddleware = (roles) => {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "User is not authorized" });
      }
      const { roles: userRoles } = jwt.verify(token, secret);
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: "Have no access" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "User is not authorized" });
    }
  };
};

export default roleMiddleware;
