const { Router } = require("express");
const { getBeers, getBeersById, verifyJWT, setRequestContext, validateReqDataWithRegex, postData, checkSession, checkRole, deleteBeer } = require("../controllers/beersControllers")

const beersRouter = new Router();
const beerContext = {
    fields : "beerFields",
    db: "beers",
    msg : "SUCCESS FOR BEER CREATION !!"
}; 

beersRouter.get("/", getBeers)
beersRouter.get("/:id", getBeersById)
beersRouter.post("/", verifyJWT, setRequestContext(beerContext), validateReqDataWithRegex, postData)
beersRouter.delete("/:id", verifyJWT, checkSession, checkRole, deleteBeer)

module.exports = {
    beersRouter
}