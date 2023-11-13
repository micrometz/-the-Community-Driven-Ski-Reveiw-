let {MongoClient } = require("mongodb")
uri = "mongodb://127.0.0.1:27017"
client = new MongoClient(uri)
async function run() {
  try {
    await client.connect()
    database = client.db('biz')
    table = database.collection('guestbook')
    query = { guestid: 7}
    result = await table.deleteOne(query)
    console.log(`# Record deleted: ${result.deletedCount}`)
  } finally{
    await client.close();
  }
}
run().catch(console.dir) 