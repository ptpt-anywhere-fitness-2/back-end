const db = require("../../data/db-config");

async function findClassesByUserId(userId) {
  const user = await db("users").where("user_id", userId).first();

  if (user) {
    if (user.role === "Instructor") {
      return db("classes").where("user_id", userId);
    } else {
      return db("classes as c")
        .leftJoin("user_class as uc", "c.class_id", "uc.class_id")
        .where("uc.user_id", userId)
        .select(
          "c.name",
          "c.location",
          "c.max_size",
          "c.duration_mins",
          "c.date",
          "c.start_time",
          "c.intensity",
          "c.user_id as instructor_id",
          "uc.user_id as client_id"
        );
    }
  } else {
    return {
      message: `Something went wrong while searching for the user id ${userId}`,
    };
  }
}

function findClassesByClassId(id) {
  return db("classes").where("class_id", id).first();
}

function searchClassesByFilter(filter) {
  const { location, intensity } = filter;

  if (!location && !intensity) {
    return db("classes");
  } else if (!location) {
    return db("classes").where("intensity", intensity);
  } else if (!intensity) {
    return db("classes").where("location", location);
  } else {
    return db("classes")
      .where("location", location)
      .andWhere("intensity", intensity);
  }
}

async function addNewInstructorClass(aClass) {
  const newClass = await db("classes").insert(aClass); //

  if (newClass.length > 0) {
    return findClassesByClassId(newClass[0])
      .then((aClass) => {
        return aClass;
      })
      .catch((err) => {
        return err;
      });
  } else {
    return null;
  }
}

async function addNewClientClass(user_id, class_id) {
  
const newClass = await db("user_class").insert({ user_id, class_id });

  if (newClass.length > 0) {
    return { class_id: `${class_id}` };
  } else {
    return null;
  }
}

async function updateClass(classId, aClass) {

  const updatedClass = await db("classes").where("class_id", classId).update(aClass);
  
  if (updateClass) {
    return findClassesByClassId(classId)
      .then((aClass) => {
        return aClass;
      })
      .catch((err) => {
        return err;
      });
  } else {
    return null;
  }
}

function deleteInstructorClass(classId) {
  return db("classes").where("class_id", classId).delete();
}

function deleteClientClass(userId, classId) {
  return db("user_class")
    .where("class_id", classId)
    .andWhere("user_id", userId)
    .delete();
}

module.exports = {
  findClassesByUserId,
  findClassesByClassId,
  addNewInstructorClass,
  addNewClientClass,
  updateClass,
  deleteClientClass,
  deleteInstructorClass,
  searchClassesByFilter,
};
