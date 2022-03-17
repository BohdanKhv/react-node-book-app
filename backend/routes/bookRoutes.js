const express = require('express')
const router = express.Router()

const {
    getBooks,
    getGenres
} = require('../controllers/bookController')

router.route('/newreleases').get(getBooks)
router.route('/genres/list').get(getGenres)

module.exports = router