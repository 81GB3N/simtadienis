const { writeDocument, findUser, updateUser, retrieveDocument } = require("./db");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const userData = {};

app.get("/getallusers", async (req, res) => {
    const result = await retrieveDocument();
    res.json({ result });
  });

app.get("/getuser", async (req, res) => {
  const result = await findUser(req.query.name, req.query.surname);
  res.json({ result });
});

app.post("/register", (req, res) => {
  userData.register = req.body;
  writeDocument(userData.register);
});

app.post("/addmoney", (req, res) => {
    userData.money = req.body; 
    updateUser(userData.money);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
