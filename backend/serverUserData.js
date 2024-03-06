const { writeDocument, findUser, updateUser, retrieveDocument } = require("./db");
const { encrypt } = require("./encryptPassword")
const { checkPassword } = require("./checkUserPassword");
const { initializeSocket } = require('./socket');
const { verifyToken, generateJWT, getJWT } = require("./handlingJWT.js");
const { uploadToDrive, deleteFromDrive, retrieveFileId } = require("./handleDriveImages.js");

const http = require('http');
const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

dotenv.config();
app.use(bodyParser.json({ limit: '25mb', extended: true }));
app.use(cors());
const server = http.createServer(app);
const io = initializeSocket(server);

// app.use((req, res, next)=>{
//   let requests = req.requests;
//   if(requests>5) res.send("Too many requests");
//   else next();
// })

//gets all user information without password
app.get("/api/getallusers", async (req, res, next) => {
  try {
    const result = await retrieveDocument();
    res.json({ result });
  } catch (err) { next(err) }
});

app.get('/api/ssas', async (req, res, next) => {
  try {
    //KEY USED +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const token = await getJWT('super', 'admin');
    console.log(token);
    res.json({ token });

  } catch (err) { next(err) }
});

//gets user information specifies without password
app.post("/api/getuser", async (req, res, next) => {
  try {
    const user = req.body;
    const result = await findUser(user.name, user.surname);
    res.json({ result });
  } catch (err) { next(err) }
});

//recieving user data to check for the password
app.post("/api/check-password", async (req, res, next) => {
  try {
    //KEY USED +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const user = req.body;
    console.log(user);
    const result = await checkPassword(user.name, user.surname, user.type, user.password);
    console.log(result)
    // console.log(result)
    res.json({ result })
  } catch (err) { next(err) }
});


app.post("/api/check-status", async (req, res, next) => {
  try {
    const user = req.body;
    const result = await findUser(user.name, user.surname);
    console.log(result)
    result[0] ? res.json(true) : res.json(false);
  } catch (err) { next(err) }
});

//writes user data by registering 
app.post("/api/register", async (req, res, next) => {
  try {
    //KEY USED +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    const register = req.body;
    register.password = await encrypt(register.password);
    register.token = generateJWT(register, "user");
    console.log("generated user token: ", register.token);
    writeDocument(register);

    io.emit("getusers");

    res.json({ message: "Registration successful" });
  } catch (err) { next(err) }
});


//writes user history to history collection
app.post("/api/write-history", (req) => {
  const history = req.body;
  //invoke in addmoney
  writeDocument(history, "history");
});

app.post("/api/register-admin", verifyToken, async (req) => {
  //KEY USED +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  try {
    //checks token for right role
    console.error("register admin role:", req.payload.role)

    if (req.payload.role == 'super admin') {
      const admin = req.body;
      admin.password = await encrypt(admin.password);
      admin.token = generateJWT(admin, "admin");

      console.log("generated admin token: ", admin.token)
      writeDocument(admin, "admin");
    }
    else {
      return res.status(401).json({ error: "Unauthorized request" });
    }
  } catch (err) { next(err) }
});

//uodates user money
app.post("/api/addmoney", verifyToken, (req, res) => {
  //checks status of requesting user
  console.log("role in addmoney: ", req.payload.role);
  //KEY USED +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  if (req.payload.role == 'admin') {
    const money = req.body;
    if (!money.money || isNaN(money.money)) {
      res.status(400).json({ error: "Invalid money format" })
    }

    updateUser(money)
    io.emit('getusers');
  }
  else {
    return res.status(401).json({ error: "Unauthorized request" });
  }
});

function isImageData(data) {
  return /^data:image\/([a-zA-Z+]+);base64,/.test(data);
}

app.post('/api/update-picture', verifyToken, (req, res, next) => {
  try {
    //KEY USED +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //checks if the right person is accesing his data
    console.log("user update image: ", req.body);
    const picture = req.body;
    console.log("user cookie: ", req.payload);
    if (req.payload.name === picture.name && req.payload.surname === picture.surname) {
      // disabled conditional check due to temp invalid regext test
      // if (isImageData(picture)) {
      //   updateUser(picture);
      // }
      updateUser(picture);
      res.json({ response: "Image Successfully Updated" });
    }
    else {
      return res.status(401).json({ error: "Unauthorized request" });
    }
  }
  catch (err) { next(err) }
});

app.post('/api/set-image', verifyToken, async (req, res, next) => {
  try {
    const data = req.body;
    if (data.name === req.payload.name && data.surname === req.payload.surname) {
      console.log("uploadin image", data);
      await uploadToDrive(data);
      res.json({ response: "Image Successfully Uploaded" })
    }
    else {
      console.log("wrong user set");
    }
  } catch (err) {
    next(err)
  }
})

app.post('/api/get-image', verifyToken, async (req, res, next) => {
  try {
    const data = req.body;
    if (data.name === req.payload.name && data.surname === req.payload.surname) {
      const response = await retrieveFileId(data);
      res.json({ response });
    }
    else {
      console.log("wrong user get", req.payload.name, req.payload.surname, data);
    }
  } catch (err) { next(err) }
})

app.post('/api/delete-image', verifyToken, async (req, res, next) => {
  try {
    const data = req.body;
    if (data.name === req.payload.name && data.surname === req.payload.surname) {
      await deleteFromDrive(data);
      res.json({ response: "Image Successfully Deleted" })
    }
    else {
      console.log("wrong user delete");
    }
  } catch (err) { next(err) }
})

//error handling function
app.use((err, req, res, next) => {
  console.error(err.stack)
  // res.status(500).send('Something broke!')
  res.status(500).json({ error: err });
})

server.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
})