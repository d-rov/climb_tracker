const express = require('express')
const app = express()

require('dotenv').config()

const port = process.env.PORT || 5000

const { MongoClient } = require('mongodb')
const uri = process.env.URI
const client = new MongoClient(uri)

app.use(express.json())

// helper function for GET one by name
// might make sense to merge with the GET call
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

// test get function
// delete later during cleanup
app.get('/express_backend', (req, res) => {
    res.send({ express: "YOUR EXPRESS BACKEND IS UP AND RUNNING" })
})

// climb GET one by name
app.get('/names/', async (req, res) => {
    const climb = req.query.name
    const message = await findClimb(client, climb).catch(console.error)
    console.log(message)
    res.send(message)
})

// climb POST
app.post('/new_climb/', async (req, res) => {
    try {
        const newClimb = req.body
        console.log(newClimb)
        await client.connect()
        await client.db("climbing_tracker").collection("climbs").insertOne(newClimb)
    } finally {
        client.close()
    }
})

// user GET
app.get('/users/', async(req, res) => {
    try {
        // connect
        const user = req.query.username
        await client.connect()
        // findOne
        const profile = await client.db("climbing_tracker").collection("users").findOne({ username: user })
        // return result or lack thereof
        res.send(profile)
    } finally {
        client.close()
    }
})

// user POST
// climbs GET all by user
// climbs GET all in progress by user
// climbs GET all completed by user
// POST climb to users in progress field
// POST climb to users completed field

/*
user = {
    username,
    completed: [],
    inProgress: []
}
*/