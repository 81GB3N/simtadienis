const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://simtadienis2024:pBhV5h9KR5kTmuAD@cluster0.gh2uhby.mongodb.net/";

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
    let elements;
    if(registerData.history === undefined){
      elements = database.collection("second");
    }
    else{
      elements = database.collection("history");
    }
    await elements.insertOne(registerData);
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

async function getCurrentMoney(name, surname){
  const user = await findUser(name, surname);
  return Number(user[0].money);
}
const retrieveDocument = async () => {
  try {
    const database = client.db("my-test-db");
    const elements = database.collection("second");
    const query = {};
    const cursor = elements.find(query);
    const documents = await cursor.toArray();
    return documents;
  } catch (error) {
    console.error("Error retrieving documents:", error);
  }
};

const updateUser = async (updateMoney)=>{
    const database = client.db("my-test-db");
    const elements = database.collection("second");
    const currentMoney = await getCurrentMoney(updateMoney.name, updateMoney.surname);
    elements.updateOne(
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

const findUser = async (name, surname) => {
  try {
    const database = client.db("my-test-db");
    const elements = database.collection("second");
    const query = { name: name, surname: surname };
    const cursor = elements.find(query);
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
