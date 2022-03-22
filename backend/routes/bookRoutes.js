const express = require('express')
const router = express.Router()

const {
    getBooks,
    getGenres,
    getBook,
    search,
    getBookOfTheYear,
} = require('../controllers/bookController')

router.route('/newreleases').get(getBooks)
router.route('/genres/list').get(getGenres)
router.route('/book/:id').get(getBook)
router.route('/search').get(search)
router.route('/bestbook/:year').get(getBookOfTheYear)

module.exports = router