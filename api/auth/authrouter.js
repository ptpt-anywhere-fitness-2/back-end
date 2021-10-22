const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { checkUserExists, checkUser } = require("./authmiddleware");
const { JWT_SECRET } = require("../config/secrets"); // use this secret!
const Users = require("../users/usersmodel");
const jwt = require("jsonwebtoken");


router.post("/register", checkUser, (req, res, next) => {
	let user = req.body;
	//console.log('register req.body',req.body);
	const rounds = process.env.BCRYPT_ROUNDS || 8;
	const hash = bcrypt.hashSync(user.password, rounds);
	// added token to the return from register
	user.password = hash;
	Users.add(user)
	  .then((newUser) => {
		const token = makeToken(newUser)
		res.status(201).json({user:newUser, token});
	  })
	  .catch(next);
  });

router.post("/login", checkUserExists, (req, res, next) => {
  let { email, password } = req.body;

  Users.findBy({ email }) // it would be nice to have middleware do this
    .then(([user]) => {
      //console.log("login user", user);
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
  return jwt.sign(payload, JWT_SECRET, options);
}
module.exports = router;