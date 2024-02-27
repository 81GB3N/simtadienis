const { writeDocument, findUser, updateUser, retrieveDocument } = require("./db");
const { encrypt } = require("./encryptPassword")
const { checkPassword } = require("./checkUserPassword");
const { generateJWT } = require("./generateJWT.js");
const { initializeSocket } = require('./socket');

const http = require('http');
const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT;
const socketPort = process.env.SOCKETPORT;

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = initializeSocket(server);

//gets all user information without password
app.get("/api/getallusers", async (req, res) => {
  // return res.status(503).json({ error: "Service Temporarily Unavailable" });
    const result = await retrieveDocument();
    res.json({ result });
  });

//gets user information specifies without password
app.post("/api/getuser", async (req, res) => {
  try {
    const user = req.body;
    const result = await findUser(user.name, user.surname);
    res.json({ result });
  } catch (error) {
    console.error("Error in find user route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//recieving user data to check for the password
app.post("/api/check-password", async (req, res) => {
  try {
    const user = req.body;
    const result = await checkPassword(user.name, user.surname, user.type, user.password);
    res.json({ result });
  } catch (error) {
    console.error("Error in check-password route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/check-status", async (req, res) => {
  try {
    const user = req.body;
    const result = await findUser(user.name, user.surname);
    result[0] ? res.json(true) : res.json(false);
  } catch (error) {
    console.error("Error in check-password route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//writes user data by registering 
app.post("/api/register", async (req, res) => {
  const register = req.body;
  register.password = await encrypt(register.password);
  writeDocument(register);

  io.emit("getusers");

  res.json({ message: "Registration successful" });
});


//writes user history to history collection
app.post("/api/write-history", (req, res) => {
  const history = req.body;
  writeDocument(history, "history");
});

app.post("/api/register-admin", async (req, res) => {
  const admin = req.body;
  admin.password = await encrypt(admin.password);
  admin.token = generateJWT(admin);
  writeDocument(admin, "admin");
});

//uodates user money
app.post("/api/addmoney", (req, res) => {
  const money = req.body;

  if (!money.money || isNaN(money.money)) {
    res.status(400).json({
      success: false,
      message: 'Invalid money format'
    })
  }

  // console.log(userData.money, moneyValue);

  updateUser(money).then(() => {

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

app.post('/api/update-picture', (req, res) => {
const picture = req.body;

  updateUser(picture).then(() => {

    res.status(200).json({
      success: true,
      message: 'picture changed'
    }) 
} ).catch(err => {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${err}`
    });
  })
});
//error handling function
// app.use((req, res, next)=>{

// })

server.listen(socketPort, ()=>{
  console.log(`socket server is running on port http://localhost:${socketPort}`);
})

app.listen(port, () => {
  console.log(`express Server is running on http://localhost:${port}`);
});