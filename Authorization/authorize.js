import { getUserRole } from "../Controllers/User.js";

export const isAuthorized = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userRole = await getUserRole(req.user.id);

      if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).send({ message: "Access denied" });
      }
      next(); // User is authorized, proceed to the next middleware or route handler
    } catch (error) {
      console.error("Error in isAuthorized:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
};
