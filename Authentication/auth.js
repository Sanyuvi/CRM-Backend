import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(400).send({ message: "Invalid Authorization" });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).send({ message: "Invalid token" });
      } else {
        // console.log("Token verified successfully");
        // console.log("Decoded payload:", decoded);
        req.user = decoded; // Attach the user information to req.user
        next();
      }
    });
  } catch (error) {
    console.error("Error in isAuthenticated:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// const decoded = jwt.verify(token, process.env.SECRET_KEY);
// console.log(process.env.SECRET_KEY);
// console.log("Decoded User:", decoded.user);
// req.user = decoded.user; // Attach the user information to req.user
