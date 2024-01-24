const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.URI;
const main = "main";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
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

connect();

const writeDocument = async (registerData) => {
  try {
    const database = client.db("my-test-db");
    let collection;
    if(registerData.history === undefined){
      collection = database.collection(main);
    }
    else{
      collection = database.collection("history");
    }
    await collection.insertOne(registerData);
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

async function getCurrentMoney(name, surname, type){
  const user = await findUser(name, surname, type);
  return Number(user[0].money);
}
const retrieveDocument = async () => {
  try {
    const database = client.db("my-test-db");
    const collection = database.collection(main);
    const query = {};
    const cursor = collection.find(query);
    const documents = await cursor.toArray();
    return documents;
  } catch (error) {
    console.error("Error retrieving documents:", error);
  }
};

const updateUser = async (updateMoney)=>{
    const database = client.db("my-test-db");
    const collection = database.collection(main);
    const currentMoney = await getCurrentMoney(updateMoney.name, updateMoney.surname, main);
    collection.updateOne(
      { "name": updateMoney.name, "surname": updateMoney.surname }, 
      { $set: { "money": currentMoney+Number(updateMoney.money) } }, 
      (err, result) => {
        if (err) {
          console.error('Error updating document', err);
        } else {
          console.log('Document updated successfully', result);
        }
      }
    );
}

const findUser = async (name, surname, type) => {
  try {
    const database = client.db("my-test-db");
    const collection = database.collection(type);
    const query = { name: name, surname: surname };
    const cursor = collection.find(query);
    const documents = await cursor.toArray();
    return documents;
  } catch (error) {
    console.error("Error retrieving documents:", error);
  }
};

module.exports = {
  writeDocument,
  findUser,
  updateUser,
  retrieveDocument,
};
