const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets");
const Users = require('../users/usersmodel');

const restricted = (req, res, next) => {
	
	if(!req.headers.authorization){
		res.status(400).json({message: "Missing auth token"})
		return;
	}

	const [authType, token] = req.headers.authorization.split(" ");
  
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

const authorized = (req, res, next) => {
	console.log(req.decodedToken);
	const {userId} = req.params;
    console.log("userId",userId);
	Users.findById(userId)
	.then(user => {
		const{user_id, email, role, name} = user
        
		const tokenEmail = req.decodedToken.email
        
		if( tokenEmail === email){
			req.user = {user_id, name, role}
			next()
		}else{
			res.status(401).json({message: "you aren't authorized"})
		}
	})
	.catch(err => res.status(500).json({ error: `Something went wrong while authrizing user ${err}` }))
}

const checkUserExists = async (req, res, next) => {
	const { email } = req.body;
	const exists = await Users.findByUser(email);
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
	authorized
};