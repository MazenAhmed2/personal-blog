const {getAllArticles, getArticleById, createArticle, deleteArticleById, updateArticleById, searchArticle} = require('../models/ariticles')


/**
 * Get all Articles Or Get Articles by certain Queries
 * 
 * @param {*} req 
 * @param {*} res
 * @returns {*} res with list of JSON objects  
 */
exports.getArticles = async (req, res)=>{
    try {
        let articles = '{}'

        // Fetch queries from URL
        let query = req.query

        // Fetch data from database
        if (!query.date && !query.tag) 
            ariticles = (await getAllArticles())[0]
        else 
            ariticles = (await searchArticle(query.date, query.tag))[0]

        // Send Json response
        res.json(ariticles)

    } catch(err) {
        console.log(err)
        res.status(400).json({message : err})
    }
}


/**
 * Fetch ID from URL and
 * Get Article By ID
 * @param {*} req 
 * @param {*} res with one JSON object
 */
exports.getArticle = async (req, res)=>{
    try {

        // Get the id from url
        let id = req.params.id
        // Fetch data from database
        let article = (await getArticleById(id))[0][0]
        // Send Json response
        res.json(article)
    } catch(err) {
        console.log(err)
        res.status(400).json({message : err})
    }
}


/**
 * Fetch the body from the request and
 * Post Article to Database
 * @param {*} req 
 * @param {*} res 
 */
exports.postArticles = async (req, res)=>{
    try {
        // Get the id from url
        let data = req.body

        // Fetch data from database
        await createArticle(data.title, data.text, data.tag)

        // Send Json response
        res.status(200).json({success: true})

    } catch(err) {
        console.log(err)
        res.status(400).json({message : err})
    }
}


/**
 * Fetch Id from request URL and 
 * Delete Articles from Database
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteArticle = async (req, res)=>{
    try {
        // Get the id from url
        let id = req.params.id
        // Fetch data from database
        await deleteArticleById(id)
        // Send Json response
        res.status(200).send('done')

    } catch(err) {
        console.log(err)
        res.status(400).json({message : err})
    }
}


/**
 * Fetch the ID from URL and
 * Fetch the body from the request and
 * Update Article in Database
 * @param {*} req 
 * @param {*} res 
 */
exports.updateArticle = async (req, res)=>{
    try {
        
        // Get the id from url
        let id = req.params.id

        // Get data from body
        let data = req.body

        // Fetch data from database
        await updateArticleById(id, data)
        // Send Json response
        res.status(200).send('done')

    } catch(err) {
        console.log(err)
        res.status(400).json({message : err})
    }
}
