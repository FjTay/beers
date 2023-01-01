const database = require("../database");

const getUserByEmail = async (userEmail) => {
    const [users] = await database.query("SELECT * FROM USERS WHERE email = ?", [userEmail]);
    if(users.length) return users[0];
    else throw new Error("Unknown email");
}

const postData = async (req) => {
    const [result] = await database.query(`INSERT INTO ${req.context.db} (${Object.keys(req.body).reduce((acc, req) => [...acc ,req], []).join(', ')}) VALUES(${Object.keys(req.body).map(_ => '?').join(', ')})`,
        Object.values(req.body).map(field => field.value))
    if(result.affectedRows) return result;
    else throw new Error("Error creating new user");
}

module.exports = {
    getUserByEmail,
    postData
}