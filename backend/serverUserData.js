const { writeDocument, findUser, updateUser, retrieveDocument } = require("./db");

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

app.get("/api/getallusers", async (req, res) => {
    const result = await retrieveDocument();
    res.json({ result });
  });

app.get("/api/getuser", async (req, res) => {
  const result = await findUser(req.query.name, req.query.surname, req.query.type);
  res.json({ result });
});

app.post("/api/register", (req, res) => {
  userData.register = req.body;
  writeDocument(userData.register);
});

app.post("/api/write-history", (req, res) => {
  userData.history = req.body; 
  writeDocument(userData.history);
});

app.post("/api/addmoney", (req, res) => {
    userData.money = req.body; 
    updateUser(userData.money);
  });

  // app.post("/api/getport", (req, res) => {
  //   userData.money = req.body; 
  //   res.json({port});
  // });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
