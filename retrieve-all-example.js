let {MongoClient } = require("mongodb")
uri = "mongodb://127.0.0.1:27017"
client = new MongoClient(uri)
async function run() {
  try {
    await client.connect()
    database = client.db('biz')
    table = database.collection('guestbook')
    query = { }
    rows= await table.find(query)
    await rows.forEach(function(row) { console.log(row) })
  } finally{
    await client.close();
  }
}
run().catch(console.dir) 