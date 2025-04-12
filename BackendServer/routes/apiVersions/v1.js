// Api Version 1.0

const express = require('C:\\Program Files\\nodejs\\lib\\node\\express')
const articlesController = require('../../controllers/articles.js')


const router = express.Router()

// GET /api/v1/articles  => Send all articles
router.get('/articles', articlesController.getArticles)

// POST /api/v1/articles  => Create new article
router.post('/articles', articlesController.postArticles)

// GET /api/v1/articles/:id  => Send one article
router.get('/articles/:id', articlesController.getArticle)

// DELETE /api/v1/articles/:id  => Delete one article
router.delete('/articles/:id', articlesController.deleteArticle)

// PUT /api/v1/articles/:id  => Update one article
router.put('/articles/:id', articlesController.updateArticle)

module.exports = router