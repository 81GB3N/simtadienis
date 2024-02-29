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
const cookieParser = require('cookie-parser'); 

const app = express();
const port = process.env.PORT;

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = initializeSocket(server);


//------------------------
// app.use(cookieParser());

// const user = {
//   cookies: 0
// }

// app.use((req, res, next) => {
//   // Check if the request has cookies
//   if (req.cookies && req.cookies.user) {
//     const cookieValue = req.cookies.user;

//     // Check if the cookie value is an object and has a specific field with a value of 5
//     if (cookieValue.field === 5) {
//       // Block the request
//       return res.status(403).send('Forbidden: Request blocked due to cookie value.');
//     }
//   }
//   // If cookie does not meet blocking criteria, proceed to the next middleware
//   next();
// });
//-------------------------------

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
    console.log(user);
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
  // findUser(admin.name, admin.surname, "admin", admin.password);
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

function isImageData(data) {
  return /^data:image\/([a-zA-Z+]+);base64,/.test(data);
}

app.post('/api/update-picture', (req, res, next) => {
  try{
    const picture = req.body;
    if(isImageData(picture)){
      updateUser(picture);
    }
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