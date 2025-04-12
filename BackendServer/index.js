const express = require('c:/Program Files/nodejs/lib/node/express')
const apiRouter = require('./routes/api.route')
const cors = require("cors")

const app = express()

// Use CORS middleware to allow cross-origin requests
app.use(cors())

// Parsing json body
app.use(express.json())

// Route to our api router
app.use('/api', apiRouter)

app.listen(8000, ()=> console.log('server is running on port 8000'))