const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))

app.use(express.json());

//MONGODB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ie64yha.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const databaseCollection = client.db('languageSchoolDb').collection('classAndInstructor')
    // const classCollection = client.db('languageSchoolDb').collection('class')

    //allData
    app.get('/allData', async(req, res)=>{
        const result = await databaseCollection.find().toArray();
        res.send(result)
    })

    //class collection
    app.post('/class', async (req, res)=>{
        const item = req.body;
        console.log(item);
        const result = await classCollection.insertOne(item);
        res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('have fun with your new friend with new language')
})

app.listen(port, () =>{
    console.log(`running port on ${port}`);
})