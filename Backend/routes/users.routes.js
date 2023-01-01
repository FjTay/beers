const { Router } = require("express");
const { verifyJWT, checkSession, setRequestContext, validateReqDataWithRegex, hashPassWord, logIn, sendUserData, postNewUser, logOut } = require("../controllers/userControllers");

const userRouter = new Router();
const userContext = {
    fields : "userFields",
    db: "users",
    msg : "SUCCESS FOR USER CREATION !!"
};

userRouter.get("/auth", verifyJWT, (req, res) => {
    res.send({ message : "you are authenticated"})
});
userRouter.get("/logIn", checkSession, sendUserData);
userRouter.post("/signUp", setRequestContext(userContext), validateReqDataWithRegex, hashPassWord, postNewUser);
userRouter.post('/logIn', logIn);
userRouter.get("/logOut", logOut);

module.exports = {
    userRouter
};