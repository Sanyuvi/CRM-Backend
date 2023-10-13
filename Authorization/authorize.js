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
// export const isAdmin = (req, res, next) => {
//   if (req.user.role === "Admin") {
//     next(); // User is Admin, proceed
//   } else {
//     res.status(403).json({ message: "Access denied" });
//   }
// };

// export const isManager = (req, res, next) => {
//   if (req.user.role === "Manager") {
//     next(); // User is Manager, proceed
//   } else {
//     res.status(403).json({ message: "Access denied" });
//   }
// };

// export const isEmployee = (req, res, next) => {
//   if (req.user.role === "Employee") {
//     next(); // User is Employee, proceed
//   } else {
//     res.status(403).json({ message: "Access denied" });
//   }
// };
