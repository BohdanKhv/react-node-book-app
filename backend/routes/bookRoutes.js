const express = require('express')
const router = express.Router()

const {
    getBooks,
    getGenres,
    getBook
} = require('../controllers/bookController')

router.route('/newreleases').get(getBooks)
router.route('/genres/list').get(getGenres)
router.route('/book/:id').get(getBook)

module.exports = router