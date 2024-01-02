const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://jonbal:pBhV5h9KR5kTmuAD@cluster0.4xktczd.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("my-test-db").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the run function to connect to MongoDB
run();

const writeDocument = async (registerData) => {
  try {
    const database = client.db("my-test-db");
    const elements = database.collection("my-first-collection");
    const result = await elements.insertOne(registerData);
    // console.log(result);
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

const retrieveDocument = async () => {
  try {
    const database = client.db("my-test-db");
    const elements = database.collection("my-first-collection");
    const query = {};
    const cursor = elements.find(query);
    const documents = await cursor.toArray();
    console.log(documents);
  } catch (error) {
    console.error("Error retrieving documents:", error);
  }
};

const findUser = async (name, surname) => {
  try {
    const database = client.db("my-test-db");
    const elements = database.collection("my-first-collection");
    const query = { name: name, surname: surname };
    const cursor = elements.find(query);
    const documents = await cursor.toArray();
    // console.log(documents);
    return documents;
  } catch (error) {
    console.error("Error retrieving documents:", error);
  }
};
// retrieveDocument();

module.exports = {
  writeDocument,
  findUser,
};
