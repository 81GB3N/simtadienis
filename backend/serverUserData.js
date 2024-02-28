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

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = initializeSocket(server);

//gets all user information without password
app.get("/api/getallusers", async (req, res, next) => {
  try{
    const result = await retrieveDocument();
    res.json({ result });
  }catch(err){next(err)}
  });

//gets user information specifies without password
app.post("/api/getuser", async (req, res, next) => {
  try{
    const user = req.body;
    const result = await findUser(user.name, user.surname);
    res.json({ result });
  }catch(err){next(err)}
});

//recieving user data to check for the password
app.post("/api/check-password", async (req, res, next) => {
  try{
    const user = req.body;
    const result = await checkPassword(user.name, user.surname, user.type, user.password);
    res.json({ result });
  }catch(err){next(err)}
});

app.post("/api/check-status", async (req, res, next) => {
  try{
    const user = req.body;
    const result = await findUser(user.name, user.surname);
    result[0] ? res.json(true) : res.json(false);
  }catch(err){next(err)}
});

//writes user data by registering 
app.post("/api/register", async (req, res, next) => {
  try{
  const register = req.body;
  register.password = await encrypt(register.password);
  writeDocument(register);

  io.emit("getusers");

  res.json({ message: "Registration successful" });
  }catch(err){next(err)}
});


//writes user history to history collection
app.post("/api/write-history", (req) => {
  const history = req.body;
  writeDocument(history, "history");
});

app.post("/api/register-admin", async (req) => {
  try{
  const admin = req.body;
  admin.password = await encrypt(admin.password);
  admin.token = generateJWT(admin);
  writeDocument(admin, "admin");
  }catch(err){next(err)}
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

  updateUser(money)
    io.emit('getusers');
});

app.post('/api/update-picture', (req, res, next) => {
  try{
const picture = req.body;
  updateUser(picture);
  }catch(err){next(err)}
});

//error handling function
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

server.listen(port, ()=>{
  console.log(`server is running on port http://localhost:${port}`);
})
