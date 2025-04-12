const express = require("c:/Program Files/nodejs/lib/node/express")
const path = require('path')


const router = express.Router()

// Load the frontend files to http://hostname/
router.use('/', express.static(path.join(__dirname, '..', 'public', 'home')))

module.exports = router