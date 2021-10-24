const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets");
const Users = require('../users/usersmodel');

const restricted = (req, res, next) => {
	
	const [authType, token] = req.headers.authorization.split(" ");
    console.log(token);
	if (!token) {
	  res.status(401).json({ message: "Token required" });
	} else {
	  jwt.verify(token, jwtSecret, (err, decoded) => {
		if (err) {
		  res.status(401).json({ message: "Token invalid" });
		} else {
		  req.decodedToken = decoded;
		  next();
		}
	  });
	}
  };

const checkUserExists = async (req, res, next) => {
	const { email } = req.body;
	const exists = await Users.findByUser(email);
	console.log(exists)
	if (exists.length>0) {
		
	  next();
	} else {
	  res.status(401).json({ message: "Email  not found" });
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