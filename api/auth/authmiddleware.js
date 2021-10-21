const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/secrets");
const Users = require('../users/usersmodel');

const restricted = (req, res, next) => {
	const token = req.headers.authorization;
  
	if (!token) {
	  res.status(401).json({ message: "Token required" });
	} else {
	  jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
		  res.status(401).json({ message: "Token invalid" });
		} else {
		  req.decodedToken = decoded;
		  next();
		}
	  });
	}
  };

const checkUserExists = (req, res, next) => {
	const { email } = req.body;
	const exists = Users.findBy(email);
	if (exists) {
	  next();
	} else {
	  res.status(401).json({ message: "Invalid Credentials" });
	}
  };

const checkUser = (req, res, next) => {
	const {email, name, password, role} = req.body
   if(!name || !password || !email || !role){
	res.status(400).json({ message: "email, name, password, and role required" });
   }else{
	   next()
   }
  }


module.exports = {
	restricted,
	checkUser,
	checkUserExists,
};