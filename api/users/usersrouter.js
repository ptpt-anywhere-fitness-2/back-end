const router = require("express").Router();
const { authorized } = require("../auth/authmiddleware");
const Users = require("./usersmodel");
 

router.get("/", authorized, (req, res, next) => {
  Users.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:id", authorized, (req, res, next) => {
  res.status(200).json(req.user)
});

router.patch("/:id", authorized, (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;

  Users.updateUser(id, changes)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Unable to find that user." });
      }
    })
    .catch(next);
});

router.delete("/:id", authorized, (req, res, next) => {
  Users.deleteUser(req.params.id)
    .then((user) => {
      if (user > 0) {
        res.status(200).json({ message: "The user has been deleted." });
      } else {
        res.status(404).json({ message: "The user could not be found." });
      }
    })
    .catch(next);
});

module.exports = router;
