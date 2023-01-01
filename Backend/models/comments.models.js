const database = require("../database")

const getCommentsByBeerID = async (beerID) => {
    const [comments] = await database.query("SELECT c.id, c.content, c.date, c.beer_id, c.user_id, users.lastName FROM COMMENTS c join users on users.id = user_id WHERE beer_id = ?", [beerID]);
    if(comments.length) return comments[0];
    else throw new Error("Error getting the comments");
}

module.exports = {
    getCommentsByBeerID
}