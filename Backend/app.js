const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { userRouter } = require("./routes/users.routes");
const { beersRouter } = require("./routes/beers.routes")
const { commentsRouter } = require("./routes/comments.routes")
const port = process.env.APP_PORT ?? 5000
const formFields = require("./validators")


//////// for video ///////
const fs = require("fs")

//////////////////////////

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"],
  methods : ["GET", "POST", "PUT", "DELETE"],
  credentials : true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended : true}))
app.use(session({
  key: "userID",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24
  }
}))
app.use("/users", userRouter);
app.use("/beers", beersRouter);
app.use("/comments", commentsRouter);

const welcome = (req, res) => {
    res.send(formFields.beerFields)
}

const getLoginFields = (req, res) => {
  res.send(formFields.userFields);
}

app.get("/", welcome)

app.get('/loginFields', getLoginFields)

app.get("/video", (req, res) => {
  const range = req.headers.range
  const videoPath = "./videos/video-1.mp4"
  const videoSize = fs.statSync(videoPath).size
  const chunkSize = 1 * 1e+6
  const start = Number(range.replace(/\D/g, ""))
  const end = Math.min(start + chunkSize, videoSize - 1)
  const contentLength = end - start + 1
  const headers = {
    "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
    "Accept-Range" : "bytes",
    "Content-Length" : contentLength,
    "Content-Type" : "video/mp4"
  }
  res.writeHead(206, headers)
  const stream = fs.createReadStream(videoPath, {start, end})
  stream.pipe(res)
})

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened")
  } else {
    console.log(`Server is listening on ${port}`)
  }
})