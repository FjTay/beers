const { getUserByEmail, postData } = require("../models/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10
const formFields = require("../validators")

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']
    console.log("-- verifyJWT --")
    if(!token) {
        console.log("TOKEN NEEDED")
        res.send({message : "TOKEN NEEDED"})
    } else {
        console.log("lets see the token")
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                console.log("problem with AUTHENTICATION")
                res.json({auth : false, message: 'you failed to authenticate'})
            } else {
                req.userId = decoded.id
                console.log("AUTHENTICATION SUCCESSFUL")
                next()
            }
        })
    }
}

const checkSession = (req, res, next) => {
    if(req.session.user) {
        next()
    } else {
        res.send({loggedIn: false, message: "-- NO USER CONNECTED --"})
    }
}

const setRequestContext = (context) => {
    console.log("-- Set Request Context --")
    return (req, res, next) => {
        req.context = context;
        next();
    }
}

const validateReqDataWithRegex = (req, res, next) => {
    console.log("-- REGEX validation --")
    if (Object.entries(req.body).every(([key, val]) => formFields[req.context.fields][key].regexps.every(reg => new RegExp(reg).test(val.value)))) {
        next()
    } else {
        console.log("Problem with req data REGEX validation")
    }
}

const hashPassWord = (req, res, next) => {
    console.log("-- Hash Password --")
    bcrypt.hash(req.body.password.value, saltRounds, (err, hash) => {
        if(err) {
            console.log(err)
        } else {
            req.body.password =  { isValid: -1, value: hash }
            next()
        }
    })
}

const logIn = async (req, res) => {
    const userEmail = req.body.email.value
    const password = req.body.password.value
    try {
        const user = await getUserByEmail(userEmail);
        bcrypt.compare(password, user.password, (error, response) => {
            if(response) {
                const token = jwt.sign(
                    {userID : user.id, userRole : user.isAdmin},
                    process.env.JWT_SECRET,
                    {expiresIn: 300}
                )
                req.session.user = user
                const {password, id, ...userFrontData} = user
                res.json({ auth: true, token: token, user : userFrontData, message : "User successfully connected !!" })
            } else {
                res.json({ auth: false, message : "Wrong email/password combination" })
            }
        })
    } catch (err) {
        res.json({ auth: false, message: err})
    }
}

const sendUserData = (req, res) => {
    const {password, id, ...userFrontData} = req.session.user
    res.send({loggedIn: true, user: userFrontData, message: "USER ONLINE"})
}

const postNewUser = async (req, res) => {
    console.log("-- postData --")
    try {
        const newUser = await postData(req)
        res.status(201).send({createdID: newUser.insertId})
        console.log(req.context.msg)
    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }
}

const logOut = (req, res) => {
    req.session.destroy()
    res.send({message: "User sucessfully logged out"})
}

module.exports = {
    verifyJWT, 
    checkSession, 
    setRequestContext, 
    validateReqDataWithRegex, 
    hashPassWord, 
    logIn,
    sendUserData,
    postNewUser,
    logOut
};