const jwt = require('jsonwebtoken')
const database = require("../database")
const formFields = require("../validators")

const getBeers = (req, res) => {
    let sql  = "select * from beers "
    let sqlParams = []
    
    database
    .query(sql, sqlParams)
    .then(([beers]) => {
        res.json(beers)
    })
    .catch((err) => {
        console.error(err)
        res.status(500).send("Error retrieving data from database")
    })
}

const getBeersById = (req, res) => {
    const id = parseInt(req.params.id, 10)
    database
    .query("select * from beers where id = ?", [id])
    .then(([beers]) => {
        if (beers[0] !== null) {
            res.json(beers[0])
        } else {
            res.status(404).send("Not Found");
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).send("Error retrieving data from database")
    })
}

const validateReqDataWithRegex = (req, res, next) => {
    console.log("-- REGEX validation --")
    console.log(req.context)
    if (Object.entries(req.body).every(([key, val]) => formFields[req.context.fields][key].regexps.every(reg => new RegExp(reg).test(val.value)))) {
        next()
    } else {
        console.log("Problem with req data REGEX validation")
    }
}

const setRequestContext = (context) => {
    console.log("-- Set Request Context --")
    return (req, res, next) => {
        req.context = context;
        next();
    }
}

const postData = (req, res) => {
    console.log("-- postData --")
    database
    .query(
        `INSERT INTO ${req.context.db} (${Object.keys(req.body).reduce((acc, req) => [...acc ,req], []).join(', ')}) VALUES(${Object.keys(req.body).map(_ => '?').join(', ')})`,
        Object.values(req.body).map(field => field.value)
    )
    .then(([result]) => {
        res.status(201).send({createdID: result.insertId})
        console.log(req.context.msg)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
}

const deleteBeer = (req, res) => {
    console.log("-- DELETE BEER --")
    database
    .query("delete from beers where id = ?", [parseInt(req.params.id)])
    .then(([result]) => {
        if (result.affectedRows === 0) {
            res.status(404).send("Beeer not found in database");
        } else {
            res.status(201).send("Beeer deleted from database")
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the beer")
    });
}

const checkSession = (req, res, next) => {
    console.log("-- check Session --")
    if(req.session.user) {
        next()
    } else {
        console.log("session error")
        res.sendStatus(500).send({loggedIn: false, message: "-- NO USER CONNECTED --"})
    }
}

const checkRole = (req, res, next) => {
    console.log("-- check Role --")
    const token = req.headers['x-access-token']
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            console.log("problem with AUTHENTICATION")
            res.sendStatus(500).send({message :"You made the request with a wrong token"})
        } else {
            console.log("AUTHENTICATION SUCCESSFUL")
            console.log(decoded.userRole)
            if (decoded.userRole === 1) next()
            else res.sendStatus(500).send({message : "You are note authorized to perform this task"})
        }
    })
}

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
                res.sendStatus(500).json({auth : false, message: 'you failed to authenticate'})
            } else {
                req.userId = decoded.id
                console.log("AUTHENTICATION SUCCESSFUL")
                next()
            }
        })
    }
}

module.exports = {
    verifyJWT, 
    checkRole, 
    checkSession, 
    deleteBeer, 
    postData, 
    setRequestContext, 
    validateReqDataWithRegex, 
    getBeersById, 
    getBeers
}


// INSERT INTO comments (id, content, date, beer_id, user_id)
// VALUES (1, "value1", "1984-01-01", 117, 19);

// CREATE TABLE comments (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     content VARCHAR(200) NOT NULL,
//     date DATE NOT NULL,
//     beer_id INT NOT NULL,
//     CONSTRAINT fk_comments_beers     
//         FOREIGN KEY (beer_id)             
//         REFERENCES beers(id)
//         ON DELETE CASCADE,
//     user_id INT NOT NULL,
//         CONSTRAINT fk_comments_users     
//         FOREIGN KEY (user_id)             
//         REFERENCES users(id)
//         ON DELETE CASCADE      
// );