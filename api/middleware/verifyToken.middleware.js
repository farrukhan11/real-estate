import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "You are not Authenticated" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    req.userID = payload.id;
    req.isAdmin = payload.isAdmin; // Add isAdmin to the request
    next();
  });
};

export default verifyToken;
