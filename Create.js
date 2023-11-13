let {MongoClient } = require("mongodb")
uri = "mongodb://127.0.0.1:27017"
client = new MongoClient(uri)
async function run() {
  try {
    await client.connect()
    database = client.db('biz')
    table = database.collection('guestbook')
    record = {
        guestid         : 7,
        guestname       : "Miles",
        guestage        : 26,
        guestcomment    : "Howdy",
        guestdate       : new Date()
    }
    result = await table.insertOne(record)
    console.log(`record _id: ${result.insertedId} inserted!`)
  } finally{
    await client.close();
  }
}
run().catch(console.dir) 