// This is API Versions router router the request to
// the appropiate API Version


const express = require('C:\\Program Files\\nodejs\\lib\\node\\express')
const apiV1Router = require('./apiVersions/v1.js')
const router = express.Router()


router.use('/v1', apiV1Router)

module.exports = router
