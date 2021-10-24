const router = require("express").Router();
const classDb = require("./classmodel");

router.get("/user/:userId", (req, res, next) => {
  const { userId } = req.params;

  classDb
    .findClassesByUserId(userId)
    .then((classes) => {
      res.status(200).json(classes);
    })
    .catch(next);
});

router.get("/search", (req, res, next) => {
  const { location, intensity } = req.query;

  classDb
    .searchClassesByFilter({ location, intensity })
    .then((classes) => {
      res.status(200).json(classes);
    })
    .catch(next);
});

router.get("/:classId", (req, res, next) => {
  const { classId } = req.params;
  // console.log(classId)
  classDb
    .findClassesByClassId(classId)
    .then((aClass) => {
      res.status(200).json(aClass);
    })
    .catch(next);
});

router.post("/instructor", (req, res, next) => {
  const newClass = req.body;

  classDb
    .addNewInstructorClass(newClass)
    .then((aClass) => {
      res.status(201).json(aClass);
    })
    .catch(next);
});

router.post("/client", (req, res, next) => {
  const { user_id, class_id } = req.body;

  classDb
    .addNewClientClass(user_id, class_id)
    .then((aClass) => {
      res.status(201).json(aClass);
    })
    .catch(next);
});

router.put("/instructor/:classId", (req, res, next) => {
  const { classId } = req.params;
  const updatedClass = req.body;

  classDb
    .updateClass(classId, updatedClass)
    .then((aClass) => {
      res.status(200).json(aClass);
    })
    .catch(next);
});

router.delete("/instructor/:classId", (req, res, next) => {
  const { classId } = req.params;
  classDb
    .deleteInstructorClass(classId)
    .then((aClass) => {
      res.status(200).json({ message: `Deleted class id ${classId}` });
    })
    .catch(next);
});

router.delete("/client/:userId/:classId", (req, res, next) => {
  const { classId, userId } = req.params;

  classDb
    .deleteClientClass(userId, classId)
    .then((aClass) => {
      res
        .status(200)
        .json({
          message: `Unsubscribed user id ${userId}'s from class id ${classId}`,
        });
    })
    .catch(next);
});

module.exports = router;
