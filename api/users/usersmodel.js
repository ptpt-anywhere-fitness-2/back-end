const db = require("../../data/db-config");

//GET ALL USERS INFO
function findAll() {
	return db("users");
}

//GET USER INFO BY ID
function findById(id) {
	return db("users as u").where("u.id", id);
}
//GET USER INFO BY name
function findByUser(email) {
	return db("users as u").where("u.email", email);
}
// ADD USER
function addNewUser(user) {
	const newUser = db("users").insert(user).returning("*");
	return newUser;
}
//UPDATE USER
function updateUser(user, id) {
	return db("users as u").update(user).where("u.id", id).returning("*");
}
//DELETE USER BY ID
async function deleteUser(id) {
	const user = await findById(id);
	const errorMessage = {
		status: 404,
		delete: "Failed",
		message: `User's Data not found in database`,
	};
	const successMessage = {
		status: 200,
		delete: "Success",
		message: `User's Data has been deleted successfully`,
	};
	const numberOfUsersByGivenId = user.length;
	if (numberOfUsersByGivenId === 0) {
		return errorMessage;
	} else {
		await db("users as u").where("u.id", id).del();
		return successMessage;
	}
}

module.exports = {
	findAll,
	findById,
	findByUser,
	addNewUser,
	updateUser,
	deleteUser,
};