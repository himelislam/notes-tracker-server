const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(cors())
app.use(express.json());


// notestaker
// 4v7IYYSfGcYzc7oT

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ejijw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        const notesCollection = client.db("notesTaker").collection("notes");
        
        // get a note or notes

        app.get('/notes', async (req, res) => {
            const q = req.query;
            console.log(q);
            const cursor = notesCollection.find( q);
            const result = await cursor.toArray();
            console.log(result);
            res.send(result);
        })

        // post a note 
        app.post('/note', async (req, res) => {
            const note = req.body;
            console.log(note);
            const result = await notesCollection.insertOne(note);
            res.send(result)
        })
    }
    finally{

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello from 343')
});

app.listen(port, () => {
    console.log('listening', port);
});