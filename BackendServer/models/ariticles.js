const mysql = require("node_modules/mysql2/promise")

// Load configurations
require('dotenv').config()
const host = process.env.DB_HOST
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const db = process.env.DB_NAME

// Connect to Mysql Database
const connection = mysql.createConnection({
    host: host,
    user : user,
    password : pass,
    database : db
})

/**
 * Get All Articles from Database
 * @returns [Js objects, ....]
 */
async function getAllArticles(){
    return await (await connection).query('select * from articles order by date desc;')
}

/**
 * Get one Article by ID
 * @param {number} id 
 * @returns Js object
 */
async function getArticleById(id){
    let article = await (await connection).query(`select * from articles where id = ${id};`)
    return article
}


/**
 * Write Article on Database
 * @param {string} title 
 * @param {string} text 
 * @param {string} tag 
 * @returns 
 */
async function createArticle(title, text, tag){
    let article = await (await connection).query(`insert into articles(title, text, tag) values ("${title}", "${text}", "${tag}");`)
    return
}

/**
 * Delete Article from Database by ID
 * @param {number} id 
 * @returns 
 */
async function deleteArticleById(id){
    return await (await connection).query(`delete from articles where id = ${id};`)
}


/**
 * Update certain Article on Database by ID
 * @param {number} id 
 * @param {Object} data 
 * @returns 
 */
async function updateArticleById(id, data){
    return await (await connection).query(
        `update articles set title = "${data.title}", text = "${data.text}", tag = "${data.tag}"
        where id = ${id};`
        )
}

/**
 * Get Articles by Date or/and Tag
 * @param {Date} date 
 * @param {string} tag 
 * @returns [Object, ...]
 */
async function searchArticle(date, tag) {
    if (!date && !tag) return

    let query = ''
    if (date && tag) 
        query = `select * from articles where date like "${date}%" and tag = "${tag}";`
    else if (date) 
        query = `select * from articles where date like "${date}%";`
    else if (tag)
        query = `select * from articles where tag = "${tag}";`
    
    return await (await connection).query(query)
}

module.exports = {getAllArticles, getArticleById, createArticle, deleteArticleById, updateArticleById, searchArticle}
