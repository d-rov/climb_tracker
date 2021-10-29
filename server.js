/*
TODO:
- create a POST call to add a climb to the database
*/

const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://dbUser:admin@cluster0.idgrr.mongodb.net/climbing_tracker?retryWrites=true&w=majority"
const client = new MongoClient(uri)

async function findClimb(client, nameOfClimb) {
    try {
        await client.connect()
        const result = await client.db("climbing_tracker").collection("climbs").findOne({ name: nameOfClimb })

        if (result) {
            return result
        } else {
            console.log("no results")
        }

    } finally {
        client.close()
    }
}

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.get('/express_backend', (req, res) => {
    res.send({ express: "YOUR EXPRESS BACKEND IS UP AND RUNNING" })
})

app.get('/names/', async (req, res) => {
    const climb = req.query.name
    const message = await findClimb(client, climb).catch(console.error)
    console.log(message)
    res.send(message)
})

// create a POST call