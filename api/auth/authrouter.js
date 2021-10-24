const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { checkUserExists, checkUser } = require("./authmiddleware");
const { jwtSecret } = require("../config/secrets"); // use this secret!
const Users = require("../users/usersmodel");
const jwt = require("jsonwebtoken");


router.post("/register", checkUser, (req, res, next) => {
	let user = req.body; 
	//console.log('register req.body',req.body);
	// const rounds = process.env.BCRYPT_ROUNDS || 8;
	const hash = bcrypt.hashSync(user.password, 12); 
	// added token to the return from register
	user.password = hash; 
  
  // const testUser = {
  //   email: "newuser1@t.com",
  //   password: "12345",
  //   name: "Newname1",
  //   role: "Instructor",
  // };
  
	Users.addNewUser(user)
	  .then((newUser) => {
    const {email, password, ...newUserRes} = newUser
		const token = makeToken(newUser)
		res.status(201).json({user:newUserRes, token});
	  })
	  .catch(next);
  });

router.post("/login", checkUserExists, (req, res, next) => {
  let { email, password } = req.body;

  Users.findByUser(email) // it would be nice to have middleware do this
    .then(([user]) => {
      console.log("login user", user);

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({
          id: user.id,
          email: user.email,
          token,
          message: "Welcome back."
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(next);
});

function makeToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: "24h",
  };
  return jwt.sign(payload, jwtSecret, options);
}
module.exports = router;