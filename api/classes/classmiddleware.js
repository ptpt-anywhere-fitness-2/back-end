const { response } = require("../server");
const classDb = require("./classmodel");

const checkClassBody = (req, res, next) => {
  const {
    name,
    location,
    max_size,
    duration_mins,
    date,
    start_time,
    intensity,
    user_id,
  } = req.body;

  if (
    !name ||
    !location ||
    !max_size ||
    !duration_mins ||
    !date ||
    !start_time ||
    !intensity ||
    !user_id
  ) {
    res.status(400).json({ message: "Missing required field" });
  } else {
    next();
  }
};

const checkClassId = (req, res, next) => {
  const { classId } = req.params;
  
  const decodedUserId = req.decodedToken.user_id;
  
  if (!classId) {
    res.status(400).json({ message: "Missing class id" });
    return;
  }

  classDb
    .findClassesByClassId(classId)
    .then((aClass) => {
      if (aClass) {
        if (aClass.user_id == decodedUserId) {
          req.aClass = aClass;
          next();
        } else {
          res
            .status(401)
            .json({
              message: `Your are not authorized to access class id ${classId}`,
            });
        }
      } else {
        res.status(404).json({ message: `Not found class id ${classId}` });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Something went wrong ${err}` });
    });
};

module.exports = { checkClassBody, checkClassId };
