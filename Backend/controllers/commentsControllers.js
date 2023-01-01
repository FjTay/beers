const { getCommentsByBeerID } = require("../models/comments.models")

const getComments = async (req, res) => {
    try{
        const comments = await getCommentsByBeerID(parseInt(req.params.beerID, 10))
        res.send({comments : comments})
    } catch (err) {
        console.log(err)
        res.sendStatus(404)
    }
}

module.exports = {
    getComments
}