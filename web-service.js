let { MongoClient } = require("mongodb")
let uri = "mongodb://0.0.0.0:27017"
let client = new MongoClient(uri)
let express = require("express")
let path = require("path")
let app = express()
let port = 7777
app.use(express.static("www"))
app.use(express.json())
app.listen(port, function() {
console.log(`Full-stack app is listening on port ${port}`)
})
app.get("/helloworld", function (req, res) {
res.send("Hello World: Weston")
})


app.get("/retrieve", function (req, res) {
async function run() {
try {
await client.connect()
database = client.db('App')
table = database.collection('Community Driven Ski Reveiw')
query = {}
rows = await table.find(query)
res.send(JSON.stringify(await rows.toArray()))
} finally {
await client.close()
}
}
run()
})

app.get("/retrieve-one/:SkiAreaName", function(req, res) {
async function run() {
try {
await client.connect()
database = client.db('App')
table = database.collection('Community Driven Ski Reveiw')
const skiAreaName = req.params.SkiAreaName;
query = { SkiAreaName: parseInt(req.body.SkiAreaName) }
row = await table.findOne(query)
res.send(JSON.stringify(row))
} finally {
await client.close()
}
}
run()
})

app.post("/create", function (req, res) {
    async function run() {
      try {
        await client.connect();
        const database = client.db("App");
        const table = database.collection("Community Driven Ski Review");
        const record = {
          SkiAreaName: req.body.SkiAreaName, // string
          HomeResort: req.body.HomeResort, // boolean
          TownName: req.body.TownName, // string
          Slopeside: req.body.Slopeside, // boolean
          MonthVisited: new Date(req.body.MonthVisited), // Date
          SnowQualityRating: parseInt(req.body.SnowQualityRating), // Int32
          CrowdedRating: parseInt(req.body.CrowdedRating), // Int32
          LiftInfrastructureRating: parseInt(req.body.LiftInfrastructureRating), // Int32
          RunRating: parseInt(req.body.RunRating), // Int32
          MountainAestheticRating: parseInt(req.body.MountainAestheticRating), // Int32
          FoodLodgingRating: parseInt(req.body.FoodLodgingRating), // Int32
          EaseOfAccessRating: parseInt(req.body.EaseOfAccessRating), // Int32
          WouldReturn: parseInt(req.body.WouldReturn), // Int32
          Pros: req.body.Pros, // string
          Cons: req.body.Cons, // string
          Extra: req.body.Extra, // string
        };
        const result = await table.insertOne(record);
        res.send(JSON.stringify(req.body)); 
      } finally {
        await client.close();
      }
    }
    run();
  });

app.delete("/delete/:SkiAreaName", async function(req, res) {
    try {
    await client.connect();
    const database = client.db("App");
    const table = database.collection("Community Driven Ski Reveiw");
    const skiAreaName = req.params.SkiAreaName;
    const query = { SkiAreaName: skiAreaName };
    const result = await table.deleteOne(query);
    res.send(JSON.stringify(result));
} finally {
await client.close();
}
});
  

app.put("/update", function(req, res) {
    async function run() {
      try {
        await client.connect();
        const database = client.db("App");
        const table = database.collection("Community Driven Ski Reveiw");
        const where = { SkiAreaName: req.body.SkiAreaName };
        const changes = {
          $set: {
            HomeResort: req.body.HomeResort,
            TownName: req.body.TownName,
            Slopeside: req.body.Slopeside,
            MonthVisited: new Date(req.body.MonthVisited),
            SnowQualityRating: parseInt(req.body.SnowQualityRating),
            CrowdedRating: parseInt(req.body.CrowdedRating),
            LiftInfrastructureRating: parseInt(req.body.LiftInfrastructureRating),
            RunRating: parseInt(req.body.RunRating),
            MountainAestheticRating: parseInt(req.body.MountainAestheticRating),
            FoodLodgingRating: parseInt(req.body.FoodLodgingRating),
            EaseOfAccessRating: parseInt(req.body.EaseOfAccessRating),
            WouldReturn: parseInt(req.body.WouldReturn),
            Pros: req.body.Pros,
            Cons: req.body.Cons,
            Extra: req.body.Extra
          }
        };
        const result = await table.updateOne(where, changes);
        res.send(JSON.stringify(result));
      } finally {
        await client.close();
      }
    }
    run();
  });
  