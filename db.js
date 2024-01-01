const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const uri = "mongodb+srv://jonbal:pBhV5h9KR5kTmuAD@cluster0.4xktczd.mongodb.net/?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("my-test-db").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the run function to connect to MongoDB
run();

async function writeDocument(registerData) {
  try {
    const database = client.db('my-test-db');
    const elements = database.collection('my-first-collection');
    const result = await elements.insertOne(registerData);
    console.log(result);
  } catch (error) {
    console.error('Error writing document:', error);
  }
}

async function retrieveDocument() {
  try {
    const database = client.db('my-test-db');
    const elements = database.collection('my-first-collection');
    const query = {};
    const cursor = elements.find(query);
    const documents = await cursor.toArray();
    console.log(documents);
  } catch (error) {
    console.error('Error retrieving documents:', error);
  }
}
retrieveDocument();

app.post('/register', (req, res) => {
  const registerData = req.body;
  console.log(registerData);
  writeDocument(registerData);
  res.json({ message: 'Registration data received successfully' });
});

app.post('/login', (req, res) => {
  const loginData = req.body;
  console.log('login', loginData);
  res.json({ message: 'Login data received successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

