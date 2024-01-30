const { writeDocument, findUser, updateUser, retrieveDocument } = require("./db");
const { encrypt } = require("./encryptPassword")
const { checkPassword } = require("./checkUserPassword");

const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const userData = {};

//gets all user information without password
app.get("/api/getallusers", async (req, res) => {
    const result = await retrieveDocument();
    res.json({ result });
  });

  //gets user information specifies without password
app.get("/api/getuser", async (req, res) => {
  const result = await findUser(req.query.name, req.query.surname, req.query.type);
  res.json({ result });
});

//recieving user data to check for the password
app.get("/api/check-password", async (req, res) => {
  //accesing function in checkUserPassword.js 
  const result = await checkPassword(req.query.name, req.query.surname, req.query.type, req.query.password);
  res.json({ result });
});

//writes user data by registering 
app.post("/api/register", async (req, res) => {
  userData.register = req.body;
  userData.register.password = await encrypt(userData.register.password);
  writeDocument(userData.register);
});

//writes user history to history collection
app.post("/api/write-history", (req, res) => {
  userData.history = req.body; 
  writeDocument(userData.history);
});

//uodates user money
app.post("/api/addmoney", (req, res) => {
    userData.money = req.body; 
    updateUser(userData.money);
  });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
