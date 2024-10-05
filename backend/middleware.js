const jwt = require("jsonwebtoken");

exports.protect = async(req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded.userId;
    await next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
