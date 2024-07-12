import jwt from "jsonwebtoken";
const shouldBeLoggedIn = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "You are not Authenticated " });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid " });
    }
    res.status(200).json({ message: "You are Authenticated " });
  });
};

const shouldBeAdmin = (req, res) => {
  res.send("Hello World!");
};

export { shouldBeLoggedIn, shouldBeAdmin };
