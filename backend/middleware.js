const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

exports.protect = async(req, res, next) => {
 const authHeader = req.headers['authorization']; // Correct way to get the header
  
 // Check if there is an Authorization header
 if (!authHeader) {
   return res.status(401).json({ error: "No token, authorization denied" });
 }
 const token = authHeader.split(' ')[1]; // Extract the token part
 if (!token) {
   return res.status(401).json({ error: "Token missing" });
 }

 try {
   const decoded = jwt.verify(token, JWT_SECRET);   
   console.log("Decoded Token:", decoded);
   req.user = decoded.userId;
   next();
 } catch (err) {
   console.log(err)
   res.status(401).json({ error: "Token is not valid" });
 }
};
