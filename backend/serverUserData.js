const { writeDocument, findUser, updateUser, retrieveDocument } = require("./db");
const { encrypt } = require("./encryptPassword")
const { checkPassword } = require("./checkUserPassword");
const {limiter} = require('./rateLimiter');
const http = require('http');


const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT;
const socketPort = process.env.SOCKETPORT;

const { initializeSocket } = require('./socket');

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = initializeSocket(server);

const userData = {};

//gets all user information without password
app.get("/api/getallusers", async (req, res) => {
  // return res.status(503).json({ error: "Service Temporarily Unavailable" });
    const result = await retrieveDocument();
    res.json({ result });
  });

//gets user information specifies without password
app.post("/api/getuser", async (req, res) => {
  try {
    const body = req.body;
    const result = await findUser(body.name, body.surname, body.type);
    res.json({ result });
  } catch (error) {
    console.error("Error in find user route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//recieving user data to check for the password
app.post("/api/check-password", async (req, res) => {
  try {
    const body = req.body;
    const result = await checkPassword(body.name, body.surname, body.type, body.password);
    res.json({ result });
  } catch (error) {
    console.error("Error in check-password route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/check-status", async (req, res) => {
  try {
    const body = req.body;
    const result = await findUser(body.name, body.surname, body.type);
    result[0] ? res.json(true) : res.json(false);
  } catch (error) {
    console.error("Error in check-password route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//writes user data by registering 
app.post("/api/register", async (req, res) => {
  userData.register = req.body;
  userData.register.password = await encrypt(userData.register.password);
  writeDocument(userData.register);

  io.emit("getusers");

  res.json({ message: "Registration successful" });
});


//writes user history to history collection
app.post("/api/write-history", (req, res) => {
  userData.history = req.body;
  writeDocument(userData.history);
});

//uodates user money
app.post("/api/addmoney", (req, res) => {
  const moneyValue = req.body.money;

  if (!moneyValue || isNaN(moneyValue)) {
    res.status(400).json({
      success: false,
      message: 'Invalid money format'
    })
  }

  userData.money = req.body;

  updateUser(userData.money).then(() => {

    res.status(200).json({
      success: true,
      message: 'Money added successfully!'
    }) 
    io.emit('getusers');
} ).catch(err => {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${err}`
    });
  })
});

//use rate limiter
// app.use("/api/getallusers", limiter);

server.listen(socketPort, ()=>{
  console.log(`socket server is running on port http://localhost:${socketPort}`);
})

app.listen(port, () => {
  console.log(`express Server is running on http://localhost:${port}`);
});