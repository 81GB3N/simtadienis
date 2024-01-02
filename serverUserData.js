const { writeDocument, findUser } = require("./db");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const userData = {};

app.get("/api", async (req, res) => {
  const result = await findUser(req.query.name, req.query.surname);
  res.json({ result });
});

app.post("/register", (req, res) => {
  userData.register = req.body;
  // console.log('register', userData.register);
  writeDocument(userData.register);
  // res.json({ message: 'Registration data received successfully' });
});

app.post("/login", (req, res) => {
  userData.login = req.body;
  console.log("login", userData.login);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
