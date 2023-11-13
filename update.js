let {MongoClient } = require("mongodb")
uri = "mongodb://127.0.0.1:27017"
client = new MongoClient(uri)
async function run() {
  try {
    await client.connect()
    database = client.db('biz')
    table = database.collection('guestbook')
    where = {guestid:5}
    changes = {$set:{guestage:23,guestname:"Weston metz",guestcomment:"Howdy"}}
    result = await table.updateOne(where, changes)
    console.log(`# record Modified: ${result.modifiedCount}`)
  } finally{
    await client.close();
  }
}
run().catch(console.dir) 