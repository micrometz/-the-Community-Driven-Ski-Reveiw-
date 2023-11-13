let {MongoClient } = require("mongodb")
uri = "mongodb://127.0.0.1:27017"
client = new MongoClient(uri)
async function run() {
  try {
    await client.connect()
    database = client.db('biz')
    table = database.collection('guestbook')
    query = { guestid: 2}
    row = await table.findOne(query)
    console.log(row)
  } finally{
    await client.close();
  }
}
run().catch(console.dir) 