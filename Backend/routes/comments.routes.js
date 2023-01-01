const { Router } = require("express");
const { getComments } = require("../controllers/commentsControllers")

const commentsRouter = new Router();
// const beerContext = {
//     fields : "beerFields",
//     db: "beers",
//     msg : "SUCCESS FOR BEER CREATION !!"
// }; 

commentsRouter.get("/:beerID", getComments)
// beersRouter.post("/", verifyJWT, setRequestContext(beerContext), validateReqDataWithRegex, postData)

module.exports = {
    commentsRouter
}