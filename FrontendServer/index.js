const express = require("c:/Program Files/nodejs/lib/node/express")
const homeRouter = require('./routes/home.js')

// Loading config file
require("dotenv").config()
const PORT = process.env.FRONTEND_PORT

const app = express()

// Using home router
app.use('/', homeRouter)

app.listen(PORT, ()=> console.log(`Server is listening on port : ${PORT}`))