import jwt from "jsonwebtoken";

const shouldBeLoggedIn = (req, res) => {
  console.log(req.userID);
  res.status(200).json({ message: "You are Authenticated " });
};
const shouldBeAdmin = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "You are not Authenticated " });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid " });
    }
    if (!payload.isAdmin) {
      return res.status(401).json({ message: "You are not Admin " });
    }
    res.status(200).json({ message: "You are Authenticated " });
  });
};

export { shouldBeLoggedIn, shouldBeAdmin };
